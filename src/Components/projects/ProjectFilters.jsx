import React from "react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function ProjectFilters({ filters, setFilters, projects }) {
  const uniquePeripheries = [
    ...new Set(projects.map((p) => p.periphery)),
  ].filter(Boolean);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getFilterCount = () => {
    return Object.values(filters).filter((value) => value !== "all").length;
  };

  return (
    <Card className="mb-12 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-slate-800">Filter Projects</h3>
            {getFilterCount() > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {getFilterCount()} filter{getFilterCount() > 1 ? "s" : ""}{" "}
                active
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <Select
              value={filters.periphery}
              onValueChange={(value) => handleFilterChange("periphery", value)}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="All Areas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {uniquePeripheries.map((periphery) => (
                  <SelectItem key={periphery} value={periphery}>
                    {periphery}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* New Select for Target Cost Range */}
            <Select
              value={filters.targetCostRange}
              onValueChange={(value) =>
                handleFilterChange("targetCostRange", value)
              }
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="All Target Costs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Target Costs</SelectItem>
                <SelectItem value="0-250000">Up to €250,000</SelectItem>
                <SelectItem value="250000-500000">
                  €250,000 - €500,000
                </SelectItem>
                <SelectItem value="500000-1000000">
                  €500,000 - €1,000,000
                </SelectItem>
                <SelectItem value="1000000">€1,000,000+</SelectItem>
              </SelectContent>
            </Select>

            {/* New Select for Target Selling Price Range */}
            <Select
              value={filters.targetSellingPriceRange}
              onValueChange={(value) =>
                handleFilterChange("targetSellingPriceRange", value)
              }
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="All Selling Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Selling Prices</SelectItem>
                <SelectItem value="0-250000">Up to €250,000</SelectItem>
                <SelectItem value="250000-500000">
                  €250,000 - €500,000
                </SelectItem>
                <SelectItem value="500000-1000000">
                  €500,000 - €1,000,000
                </SelectItem>
                <SelectItem value="1000000">€1,000,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.goldenVisa}
              onValueChange={(value) => handleFilterChange("goldenVisa", value)}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Golden Visa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="eligible">Golden Visa Eligible</SelectItem>
                <SelectItem value="not-eligible">Not Eligible</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
