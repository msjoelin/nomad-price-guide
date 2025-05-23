
import React, { useState } from 'react';
import { PlusCircle, MapPin, Filter, DollarSign, Globe, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddPriceForm from '@/components/AddPriceForm';
import PriceList from '@/components/PriceList';
import FilterBar from '@/components/FilterBar';
import AveragesPView from '@/components/AveragesPView';
import MapView from '@/components/MapView';
import { PriceEntry } from '@/types/PriceEntry';

const Index = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'averages' | 'map'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [priceEntries, setPriceEntries] = useState<PriceEntry[]>([
    {
      id: '1',
      category: 'Food',
      itemName: 'Street Tacos',
      price: 2.50,
      currency: 'USD',
      location: 'Mexico City, Mexico',
      comment: 'Amazing al pastor tacos from street vendor',
      submittedAt: new Date('2024-01-15'),
      submittedBy: 'Alex'
    },
    {
      id: '2',
      category: 'Transport',
      itemName: 'Taxi (10km)',
      price: 8.00,
      currency: 'USD',
      location: 'Bangkok, Thailand',
      comment: 'Meter taxi, no traffic',
      submittedAt: new Date('2024-01-10'),
      submittedBy: 'Sarah'
    },
    {
      id: '3',
      category: 'Food',
      itemName: 'Coffee',
      price: 1.20,
      currency: 'USD',
      location: 'Lisbon, Portugal',
      comment: 'Espresso at local cafe',
      submittedAt: new Date('2024-01-12'),
      submittedBy: 'Marco'
    }
  ]);

  const handleAddPrice = (newEntry: Omit<PriceEntry, 'id' | 'submittedAt'>) => {
    const entry: PriceEntry = {
      ...newEntry,
      id: Date.now().toString(),
      submittedAt: new Date()
    };
    setPriceEntries([entry, ...priceEntries]);
    setShowAddForm(false);
  };

  const categories = [...new Set(priceEntries.map(entry => entry.category))];
  const locations = [...new Set(priceEntries.map(entry => entry.location))];

  const filteredEntries = priceEntries.filter(entry => {
    if (selectedCategory !== 'all' && entry.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && entry.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Nomad Price Guide</h1>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Price
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Entries</p>
                  <p className="text-2xl font-bold text-gray-900">{priceEntries.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Locations Covered</p>
                  <p className="text-2xl font-bold text-gray-900">{locations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Filter className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('list')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Entries
          </button>
          <button
            onClick={() => setActiveView('averages')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'averages' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Price Averages
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeView === 'map' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Map className="h-4 w-4 mr-1 inline" />
            Map View
          </button>
        </div>

        {/* Filters */}
        {activeView !== 'map' && (
          <FilterBar
            categories={categories}
            locations={locations}
            selectedCategory={selectedCategory}
            selectedLocation={selectedLocation}
            onCategoryChange={setSelectedCategory}
            onLocationChange={setSelectedLocation}
          />
        )}

        {/* Content */}
        {activeView === 'list' && <PriceList entries={filteredEntries} />}
        {activeView === 'averages' && <AveragesPView entries={priceEntries} />}
        {activeView === 'map' && <MapView entries={priceEntries} />}

        {/* Add Price Modal */}
        {showAddForm && (
          <AddPriceForm
            onSubmit={handleAddPrice}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
