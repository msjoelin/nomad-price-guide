
import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PriceEntry } from '@/types/PriceEntry';

interface MapViewProps {
  entries: PriceEntry[];
}

const MapView: React.FC<MapViewProps> = ({ entries }) => {
  // Group entries by location
  const locationGroups = entries.reduce((acc, entry) => {
    if (!acc[entry.location]) {
      acc[entry.location] = [];
    }
    acc[entry.location].push(entry);
    return acc;
  }, {} as Record<string, PriceEntry[]>);

  if (Object.keys(locationGroups).length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No locations to display</p>
        <p className="text-gray-400 text-sm mt-2">Add some price entries to see them on the map</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Interactive Map Coming Soon</p>
              <p className="text-gray-500 text-sm">Location pins will show price data</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(locationGroups).map(([location, locationEntries]) => {
          const avgPrice = locationEntries.reduce((sum, entry) => sum + entry.price, 0) / locationEntries.length;
          const currency = locationEntries[0].currency;
          
          return (
            <Card key={location} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">{location}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Entries:</span>
                    <Badge variant="secondary">{locationEntries.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg Price:</span>
                    <span className="font-semibold text-green-600">
                      {avgPrice.toFixed(2)} {currency}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {[...new Set(locationEntries.map(e => e.category))].map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MapView;
