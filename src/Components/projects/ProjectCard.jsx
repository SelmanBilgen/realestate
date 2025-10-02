import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils.js";
import { MapPin, Ruler, Crown, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function ProjectCard({ project }) {
  const featuredImage =
    project.photos_after?.[0] ||
    project.photos_3d_render?.[0] ||
    project.photos_before?.[0] ||
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop";

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl">
      <div className="relative overflow-hidden">
        <img
          src={featuredImage}
          alt={project.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            className={`${
              project.status === "available"
                ? "bg-green-500"
                : project.status === "reserved"
                ? "bg-orange-500"
                : "bg-red-500"
            } text-white border-0 shadow-lg`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          {project.golden_visa_eligible && (
            <Badge className="bg-amber-500 text-white border-0 shadow-lg">
              <Crown className="w-3 h-3 mr-1" />
              Golden Visa
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center text-sm text-slate-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {project.periphery}, Athens
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
          {project.title}
        </h3>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-slate-600">
            <Ruler className="w-4 h-4 mr-2" />
            <span className="font-medium">{project.size}m²</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-800">
              €{project.target_selling_price?.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500">
              €
              {Math.round(
                project.target_selling_price / project.size
              ).toLocaleString()}
              /m²
            </p>
          </div>
        </div>

        <Link to={createPageUrl("ProjectDetail") + "?id=" + project.id}>
          <Button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white group-hover:shadow-lg transition-all duration-300">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
