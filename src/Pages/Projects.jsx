import React, { useState, useEffect, useCallback } from "react";
import { RealEstateProject } from "@/Entities/RealEstateProject.js";
import ProjectCard from "@/Components/projects/ProjectCard.jsx";
import ProjectFilters from "@/Components/projects/ProjectFilters.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    periphery: "all",
    targetCostRange: "all",
    targetSellingPriceRange: "all",
    goldenVisa: "all",
    status: "all",
  });

  const loadProjects = useCallback(async () => {
    try {
      const fetchedProjects = await RealEstateProject.list("-created_date");
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setIsLoading(false);
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...projects];

    if (filters.periphery !== "all") {
      filtered = filtered.filter(
        (project) => project.periphery === filters.periphery
      );
    }

    if (filters.targetCostRange !== "all") {
      const [min, max] = filters.targetCostRange.split("-").map(Number);
      filtered = filtered.filter((project) => {
        const cost = project.target_cost || 0; // Default to 0 if null/undefined
        if (max) {
          return cost >= min && cost <= max;
        } else {
          return cost >= min;
        }
      });
    }

    if (filters.targetSellingPriceRange !== "all") {
      const [min, max] = filters.targetSellingPriceRange.split("-").map(Number);
      filtered = filtered.filter((project) => {
        const price = project.target_selling_price || 0; // Default to 0 if null/undefined
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    if (filters.goldenVisa !== "all") {
      filtered = filtered.filter((project) =>
        filters.goldenVisa === "eligible"
          ? project.golden_visa_eligible
          : !project.golden_visa_eligible
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(
        (project) => project.status === filters.status
      );
    }

    setFilteredProjects(filtered);
  }, [projects, filters]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          Rigel Projects in Athens Area
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Discover exclusive real estate opportunities in Athens' most desirable
          neighborhoods. Many properties eligible for Greece's Golden Visa
          program.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Filters */}
      <ProjectFilters
        filters={filters}
        setFilters={setFilters}
        projects={projects}
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {isLoading ? (
          Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <Skeleton className="h-64 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </div>
              </div>
            ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No Projects Found
              </h3>
              <p className="text-slate-600">
                Try adjusting your filters to see more properties.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      {!isLoading && filteredProjects.length > 0 && (
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact our premium advisory team for personalized consultation and
            exclusive access to upcoming projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+306972250118"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              📞 Schedule Consultation
            </a>
            <a
              href="mailto:rigelhospitalitygr@gmail.com"
              className="bg-blue-500 border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-400 transition-colors"
            >
              📧 Email Inquiry
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
