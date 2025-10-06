import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, Ruler, Crown, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectCard({ project }) {
  const featuredImage =
    project.photos_after?.[0] ||
    project.photos_3d_render?.[0] ||
    project.photos_before?.[0] ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop";

  return (
    <Card className="group overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={featuredImage}
          alt={project.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge
            className={`
              ${project.status === "available" ? "bg-green-500" : ""}
              ${project.status === "reserved" ? "bg-red-500" : ""}
              ${project.status === "sold" ? "bg-red-500" : ""}
              text-white
            `}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          {project.golden_visa_eligible && (
            <Badge className="bg-orange-400 text-white">
              Golden Visa
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-5">
        <p className="text-sm text-gray-500 mb-2">
          📍 {project.periphery}, Athens
        </p>
        <h3 className="text-lg font-bold text-gray-800 mb-3 truncate">
          {project.title}
        </h3>
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <p className="text-xl font-bold text-gray-900">
              €{project.target_selling_price?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              €{Math.round(project.target_selling_price / project.size).toLocaleString()}/m²
            </p>
          </div>
          <p className="text-gray-600">{project.size}m²</p>
        </div>
        <Link to={createPageUrl("ProjectDetail") + "?id=" + project.id} className="w-full">
          <Button className="w-full bg-[#0A3D62] text-white hover:bg-blue-800 transition-colors">
            View Details →
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
