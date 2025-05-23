
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  categories: string[];
  locations: string[];
  selectedCategory: string;
  selectedLocation: string;
  onCategoryChange: (category: string) => void;
  onLocationChange: (location: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  locations,
  selectedCategory,
  selectedLocation,
  onCategoryChange,
  onLocationChange,
}) => {
  const clearFilters = () => {
    onCategoryChange('all');
    onLocationChange('all');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <Button 
          variant="outline" 
          onClick={clearFilters}
          disabled={selectedCategory === 'all' && selectedLocation === 'all'}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
