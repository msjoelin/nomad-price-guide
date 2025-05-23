
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PriceEntry } from '@/types/PriceEntry';

interface AveragesPViewProps {
  entries: PriceEntry[];
}

const AveragesPView: React.FC<AveragesPViewProps> = ({ entries }) => {
  const calculateAverages = () => {
    const groupedData: Record<string, Record<string, PriceEntry[]>> = {};
    
    entries.forEach(entry => {
      if (!groupedData[entry.location]) {
        groupedData[entry.location] = {};
      }
      if (!groupedData[entry.location][entry.category]) {
        groupedData[entry.location][entry.category] = [];
      }
      groupedData[entry.location][entry.category].push(entry);
    });

    const averages: Array<{
      location: string;
      country: string;
      category: string;
      averagePrice: number;
      currency: string;
      entryCount: number;
    }> = [];

    Object.entries(groupedData).forEach(([location, categories]) => {
      Object.entries(categories).forEach(([category, categoryEntries]) => {
        const totalPrice = categoryEntries.reduce((sum, entry) => sum + entry.price, 0);
        const averagePrice = totalPrice / categoryEntries.length;
        const currency = categoryEntries[0].currency; // Assume same currency for simplicity
        const country = categoryEntries[0].country;
        
        averages.push({
          location,
          country,
          category,
          averagePrice,
          currency,
          entryCount: categoryEntries.length
        });
      });
    });

    return averages.sort((a, b) => a.location.localeCompare(b.location));
  };

  const averages = calculateAverages();

  if (averages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No data available for averages</p>
        <p className="text-gray-400 text-sm mt-2">Add some price entries to see average prices by category and location</p>
      </div>
    );
  }

  const groupedByLocation = averages.reduce((acc, avg) => {
    if (!acc[avg.location]) {
      acc[avg.location] = [];
    }
    acc[avg.location].push(avg);
    return acc;
  }, {} as Record<string, typeof averages>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedByLocation).map(([location, locationAverages]) => (
        <Card key={location}>
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {location}, {locationAverages[0].country}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locationAverages.map((avg, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{avg.category}</Badge>
                    <span className="text-xs text-gray-500">{avg.entryCount} entries</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {avg.averagePrice.toFixed(2)} {avg.currency}
                  </p>
                  <p className="text-sm text-gray-600">Average price</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AveragesPView;
