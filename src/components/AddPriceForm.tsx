
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PriceEntry } from '@/types/PriceEntry';
import LocationInput from './LocationInput';

interface AddPriceFormProps {
  onSubmit: (entry: Omit<PriceEntry, 'id' | 'submittedAt'>) => void;
  onClose: () => void;
}

const categories = [
  'Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Services', 'Other'
];

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'THB', 'TRY', 'MAD', 'ARS', 'INR', 'BRL', 'AED', 'SGD', 'HKD', 'KRW', 'CZK', 'HUF'
];

const AddPriceForm: React.FC<AddPriceFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    location: '',
    category: '',
    itemName: '',
    price: '',
    currency: 'USD',
    comment: '',
    submittedBy: 'Anonymous'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.category || !formData.itemName || !formData.price) {
      return;
    }

    onSubmit({
      location: formData.location,
      category: formData.category,
      itemName: formData.itemName,
      price: parseFloat(formData.price),
      currency: formData.currency,
      comment: formData.comment,
      submittedBy: formData.submittedBy
    });
  };

  const handleLocationChange = (location: string, currency?: string) => {
    setFormData(prev => ({
      ...prev,
      location,
      ...(currency && { currency })
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">Add New Price</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <LocationInput
              value={formData.location}
              onChange={handleLocationChange}
              placeholder="e.g., Bangkok, Thailand"
            />

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="itemName">Item Name *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                placeholder="e.g., Coffee, Taxi ride, Hotel night"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="submittedBy">Your Name</Label>
              <Input
                id="submittedBy"
                value={formData.submittedBy}
                onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                placeholder="Anonymous"
              />
            </div>

            <div>
              <Label htmlFor="comment">Comment (Optional)</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Additional details about your experience..."
                rows={3}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                Add Price
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPriceForm;
