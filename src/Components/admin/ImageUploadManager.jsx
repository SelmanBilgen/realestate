import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, UploadCloud } from "lucide-react";

export default function ImageUploadManager({
  title,
  existingImages,
  onExistingImagesChange,
  onNewFilesChange,
}) {
  const [newlySelectedFiles, setNewlySelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewlySelectedFiles(files);
    onNewFilesChange(files);
  };

  const handleRemoveExisting = (index) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    onExistingImagesChange(updatedImages);
  };

  const handleRemoveNew = (index) => {
    const updatedFiles = newlySelectedFiles.filter((_, i) => i !== index);
    setNewlySelectedFiles(updatedFiles);
    onNewFilesChange(updatedFiles);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold">{title}</h3>

      {/* Display Existing Images */}
      {existingImages && existingImages.length > 0 && (
        <div>
          <Label>Current Images</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
            {existingImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Existing ${index}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveExisting(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload New Images */}
      <div>
        <Label htmlFor={`upload-${title.replace(/\s+/g, "-")}`}>
          Upload New Images
        </Label>
        <div className="mt-2 flex items-center justify-center w-full">
          <label
            htmlFor={`upload-${title.replace(/\s+/g, "-")}`}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, etc.</p>
            </div>
            <Input
              id={`upload-${title.replace(/\s+/g, "-")}`}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {/* Display Newly Selected Files */}
      {newlySelectedFiles.length > 0 && (
        <div>
          <Label>New Images to Upload</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
            {newlySelectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New ${index}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveNew(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
