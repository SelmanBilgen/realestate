import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ImageGallery({ project }) {
  const [activeTab, setActiveTab] = useState("after");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageCategories = {
    before: {
      images: project.photos_before || [],
      label: "Before Renovation",
      color: "bg-red-100 text-red-800",
    },
    render: {
      images: project.photos_3d_render || [],
      label: "3D Renders",
      color: "bg-purple-100 text-purple-800",
    },
    after: {
      images: project.photos_after || [],
      label: "After Renovation",
      color: "bg-green-100 text-green-800",
    },
  };

  const currentImages = imageCategories[activeTab].images;
  const fallbackImage =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop";

  const nextImage = () => {
    if (currentImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    }
  };

  const prevImage = () => {
    if (currentImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + currentImages.length) % currentImages.length
      );
    }
  };

  const displayImage =
    currentImages.length > 0 ? currentImages[currentImageIndex] : fallbackImage;

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex flex-wrap gap-3">
          {Object.entries(imageCategories).map(([key, category]) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              onClick={() => {
                setActiveTab(key);
                setCurrentImageIndex(0);
              }}
              className={`${
                activeTab === key ? "bg-slate-800" : ""
              } flex items-center gap-2`}
              disabled={category.images.length === 0}
            >
              <Badge variant="secondary" className={category.color}>
                {category.images.length || 0}
              </Badge>
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={displayImage}
            alt={`${project.title} - ${imageCategories[activeTab].label}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image Counter & Fullscreen Button */}
        <div className="absolute top-4 right-4 flex gap-2">
          {currentImages.length > 0 && (
            <Badge className="bg-black/70 text-white border-0">
              {currentImageIndex + 1} / {currentImages.length}
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="bg-black/70 text-white hover:bg-black/80 border-0"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation Arrows */}
        {currentImages.length > 1 && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white hover:bg-black/80 border-0"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white hover:bg-black/80 border-0"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {currentImages.length > 1 && (
        <div className="p-4 bg-slate-50">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {currentImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-slate-800 shadow-lg"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-full h-full max-h-screen p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={displayImage}
              alt={`${project.title} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
            />
            {currentImages.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white hover:bg-black/80 border-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white hover:bg-black/80 border-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
