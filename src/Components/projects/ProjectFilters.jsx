import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProjectFilters({ filters, setFilters, projects }) {
  const uniquePeripheries = [
    ...new Set(projects.map((p) => p.periphery)),
  ].filter(Boolean);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const commonSelectTriggerClass = "w-full bg-gray-50 border-gray-200 rounded-lg shadow-sm";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <h3 className="font-semibold text-gray-800 shrink-0">Filter Projects</h3>
      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Select
          value={filters.periphery}
          onValueChange={(value) => handleFilterChange("periphery", value)}
        >
          <SelectTrigger className={commonSelectTriggerClass}>
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

        <Select
          value={filters.targetCostRange}
          onValueChange={(value) =>
            handleFilterChange("targetCostRange", value)
          }
        >
          <SelectTrigger className={commonSelectTriggerClass}>
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

        <Select
          value={filters.targetSellingPriceRange}
          onValueChange={(value) =>
            handleFilterChange("targetSellingPriceRange", value)
          }
        >
          <SelectTrigger className={commonSelectTriggerClass}>
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
          <SelectTrigger className={commonSelectTriggerClass}>
            <SelectValue placeholder="All Properties" />
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
          <SelectTrigger className={commonSelectTriggerClass}>
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
  );
}
