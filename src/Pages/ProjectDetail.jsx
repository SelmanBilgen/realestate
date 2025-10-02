import React, { useState, useEffect, useCallback } from "react";
import { RealEstateProject } from "@/Entities/RealEstateProject.js";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils.js";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Bed,
  Bath,
  Calendar,
  Crown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import ImageGallery from "@/Components/project-detail/ImageGallery.jsx";
import ProjectFeatures from "@/Components/project-detail/ProjectFeatures.jsx";
import ContactForm from "@/Components/project-detail/ContactForm.jsx";

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  const loadProject = useCallback(async (id) => {
    try {
      const projects = await RealEstateProject.list();
      const foundProject = projects.find((p) => p.id === id);
      setProject(foundProject);
    } catch (error) {
      console.error("Error loading project:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 bg-slate-200 rounded"></div>
          <div className="h-96 bg-slate-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-6 w-1/2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Project Not Found
        </h1>
        <Button onClick={() => navigate(createPageUrl("Projects"))}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(createPageUrl("Projects"))}
        className="mb-8 text-slate-600 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Button>

      {/* Project Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                className={`${
                  project.status === "available"
                    ? "bg-green-100 text-green-800"
                    : project.status === "reserved"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                } border-0 font-semibold`}
              >
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </Badge>
              {project.golden_visa_eligible && (
                <Badge className="bg-amber-100 text-amber-800 border border-amber-300">
                  <Crown className="w-3 h-3 mr-1" />
                  Golden Visa Eligible
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              {project.title}
            </h1>

            <div className="flex items-center text-slate-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="font-medium">{project.periphery}, Athens</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Ruler className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {project.size}m²
                </p>
                <p className="text-sm text-slate-500">Size</p>
              </div>

              {project.bedrooms && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Bed className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    {project.bedrooms}
                  </p>
                  <p className="text-sm text-slate-500">Bedrooms</p>
                </div>
              )}

              {project.bathrooms && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Bath className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    {project.bathrooms}
                  </p>
                  <p className="text-sm text-slate-500">Bathrooms</p>
                </div>
              )}

              {project.completion_date && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-800">
                    {new Date(project.completion_date).getFullYear()}
                  </p>
                  <p className="text-sm text-slate-500">Completion</p>
                </div>
              )}
            </div>
          </div>

          <Card className="lg:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Target Selling Price
                </p>
                <p className="text-4xl font-bold text-slate-800 mb-6">
                  €{project.target_selling_price?.toLocaleString()}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Golden Visa Eligible</span>
                    {project.golden_visa_eligible ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Price per m²</span>
                    <span className="font-semibold">
                      €
                      {Math.round(
                        project.target_selling_price / project.size
                      ).toLocaleString()}
                    </span>
                  </div>
                  {project.target_cost && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Target Cost</span>
                      <span className="font-semibold">
                        €{project.target_cost?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {project.target_cost &&
                    project.target_selling_price &&
                    project.target_cost > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Profit Ratio</span>
                        <span className="font-semibold text-green-600">
                          {Math.round(
                            ((project.target_selling_price -
                              project.target_cost) /
                              project.target_cost) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    )}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 mb-4">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Download Brochure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery project={project} />

      {/* Project Description & Features */}
      <div className="grid lg:grid-cols-3 gap-12 mt-16">
        <div className="lg:col-span-2 space-y-8">
          {project.description && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  About This Project
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          )}

          <ProjectFeatures features={project.features || []} />
        </div>

        <div>
          <ContactForm project={project} />
        </div>
      </div>
    </div>
  );
}
