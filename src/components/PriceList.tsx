
import React from 'react';
import { MapPin, User, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PriceEntry } from '@/types/PriceEntry';

interface PriceListProps {
  entries: PriceEntry[];
}

const PriceList: React.FC<PriceListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No price entries found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or add a new price entry</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{entry.itemName}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {entry.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {entry.price.toFixed(2)} {entry.currency}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{entry.location}</span>
                </div>
                
                {entry.comment && (
                  <p className="text-sm text-gray-700 mb-3 italic">"{entry.comment}"</p>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>by {entry.submittedBy}</span>
                  </div>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{entry.submittedAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PriceList;
