import React, { useState, useEffect, useCallback } from "react";
import { RealEstateProject } from "@/entities/RealEstateProject";
import ProjectCard from "../Components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="bg-[#F5F8FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center py-10 bg-white rounded-lg shadow-sm mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A3D62] mb-4">
            Rigel Projects in Athens Area
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover exclusive real estate opportunities in Athens’ most desirable
            neighborhoods. Many properties eligible for Greece’s Golden Visa program.
          </p>
          <div className="w-24 h-0.5 bg-blue-500 mx-auto mt-6"></div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-12">
          <ProjectFilters
            filters={filters}
            setFilters={setFilters}
            projects={projects}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {isLoading ? (
            Array(9)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-2/4 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-8 w-1/3" />
                      <Skeleton className="h-8 w-1/4" />
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
              <div className="bg-white rounded-lg shadow-md p-12 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more properties.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        {!isLoading && (
          <div className="mt-20 bg-gradient-to-r from-[#1E88E5] to-[#1565C0] rounded-lg p-12 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-3">Ready to Invest?</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Contact our premium advisory team for personalized consultation and
              exclusive access to upcoming projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                Schedule Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Email Inquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
