import React, { useState, useEffect } from "react";
import { RealEstateProject } from "@/entities/RealEstateProject";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUploadManager from "./ImageUploadManager";
import { Loader2 } from "lucide-react";

const emptyProject = {
  title: "",
  periphery: "",
  target_cost: 0,
  target_selling_price: 0,
  size: 0,
  bedrooms: 0,
  bathrooms: 0,
  photos_before: [],
  photos_3d_render: [],
  photos_after: [],
  golden_visa_eligible: false,
  description: "",
  features: [],
  completion_date: "",
  status: "available",
};

export default function ProjectForm({ project, onFormSubmit }) {
  const [formData, setFormData] = useState(project || emptyProject);
  const [newFiles, setNewFiles] = useState({
    photos_before: [],
    photos_3d_render: [],
    photos_after: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ensure features is always an array and new price fields are initialized
    const initialData = project
      ? {
          ...emptyProject, // Start with defaults from emptyProject
          ...project, // Override with actual project data
          features: project.features || [], // Ensure features is an array
          // Explicitly set new price fields to 0 if not present in existing project data
          target_cost: project.target_cost ?? 0,
          target_selling_price: project.target_selling_price ?? 0,
        }
      : emptyProject;

    // If an old 'price' field exists from legacy data, remove it from formData
    if (initialData.price !== undefined) {
      delete initialData.price;
    }

    setFormData(initialData);
  }, [project]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeaturesChange = (e) => {
    const featuresArray = e.target.value
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);
    setFormData((prev) => ({ ...prev, features: featuresArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const uploadedUrls = {
      photos_before: [],
      photos_3d_render: [],
      photos_after: [],
    };

    for (const category in newFiles) {
      for (const file of newFiles[category]) {
        try {
          const { file_url } = await UploadFile({ file });
          uploadedUrls[category].push(file_url);
        } catch (error) {
          console.error(`Error uploading file for ${category}:`, error);
          alert(`Failed to upload one of the files. Please try again.`);
          setIsSubmitting(false);
          return;
        }
      }
    }

    const finalData = {
      ...formData,
      photos_before: [...formData.photos_before, ...uploadedUrls.photos_before],
      photos_3d_render: [
        ...formData.photos_3d_render,
        ...uploadedUrls.photos_3d_render,
      ],
      photos_after: [...formData.photos_after, ...uploadedUrls.photos_after],
    };

    try {
      if (formData.id) {
        await RealEstateProject.update(formData.id, finalData);
      } else {
        await RealEstateProject.create(finalData);
      }
      onFormSubmit();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="periphery">Periphery</Label>
          <Input
            id="periphery"
            value={formData.periphery}
            onChange={(e) => handleInputChange("periphery", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="target_cost">Target Cost (€)</Label>
          <Input
            id="target_cost"
            type="number"
            value={formData.target_cost}
            onChange={(e) =>
              handleInputChange("target_cost", Number(e.target.value))
            }
          />
        </div>
        <div>
          <Label htmlFor="target_selling_price">Target Selling Price (€)</Label>
          <Input
            id="target_selling_price"
            type="number"
            value={formData.target_selling_price}
            onChange={(e) =>
              handleInputChange("target_selling_price", Number(e.target.value))
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="size">Size (m²)</Label>
          <Input
            id="size"
            type="number"
            value={formData.size}
            onChange={(e) => handleInputChange("size", Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) =>
              handleInputChange("bedrooms", Number(e.target.value))
            }
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) =>
              handleInputChange("bathrooms", Number(e.target.value))
            }
          />
        </div>
        <div>
          <Label htmlFor="completion_date">Completion Date</Label>
          <Input
            id="completion_date"
            type="date"
            value={formData.completion_date}
            onChange={(e) =>
              handleInputChange("completion_date", e.target.value)
            }
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleInputChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="features">Features (comma-separated)</Label>
          <Input
            id="features"
            value={(formData.features || []).join(", ")}
            onChange={handleFeaturesChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="golden_visa"
            checked={formData.golden_visa_eligible}
            onCheckedChange={(checked) =>
              handleInputChange("golden_visa_eligible", checked)
            }
          />
          <Label htmlFor="golden_visa">Eligible for Golden Visa</Label>
        </div>
      </div>

      <ImageUploadManager
        title="Before Renovation Photos"
        existingImages={formData.photos_before}
        onExistingImagesChange={(urls) =>
          setFormData((p) => ({ ...p, photos_before: urls }))
        }
        onNewFilesChange={(files) =>
          setNewFiles((p) => ({ ...p, photos_before: files }))
        }
      />

      <ImageUploadManager
        title="3D Render Photos"
        existingImages={formData.photos_3d_render}
        onExistingImagesChange={(urls) =>
          setFormData((p) => ({ ...p, photos_3d_render: urls }))
        }
        onNewFilesChange={(files) =>
          setNewFiles((p) => ({ ...p, photos_3d_render: files }))
        }
      />

      <ImageUploadManager
        title="After Renovation Photos"
        existingImages={formData.photos_after}
        onExistingImagesChange={(urls) =>
          setFormData((p) => ({ ...p, photos_after: urls }))
        }
        onNewFilesChange={(files) =>
          setNewFiles((p) => ({ ...p, photos_after: files }))
        }
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Project"
          )}
        </Button>
      </div>
    </form>
  );
}
