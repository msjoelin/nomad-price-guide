
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationInputProps {
  value: string;
  onChange: (location: string, currency?: string) => void;
  placeholder?: string;
}

// Popular travel destinations with their currencies
const locations = [
  { name: 'Mexico City, Mexico', currency: 'MXN' },
  { name: 'Bangkok, Thailand', currency: 'THB' },
  { name: 'Lisbon, Portugal', currency: 'EUR' },
  { name: 'Tokyo, Japan', currency: 'JPY' },
  { name: 'Berlin, Germany', currency: 'EUR' },
  { name: 'Barcelona, Spain', currency: 'EUR' },
  { name: 'Istanbul, Turkey', currency: 'TRY' },
  { name: 'Marrakech, Morocco', currency: 'MAD' },
  { name: 'Buenos Aires, Argentina', currency: 'ARS' },
  { name: 'New York, USA', currency: 'USD' },
  { name: 'London, UK', currency: 'GBP' },
  { name: 'Sydney, Australia', currency: 'AUD' },
  { name: 'Mumbai, India', currency: 'INR' },
  { name: 'São Paulo, Brazil', currency: 'BRL' },
  { name: 'Dubai, UAE', currency: 'AED' },
  { name: 'Singapore', currency: 'SGD' },
  { name: 'Hong Kong', currency: 'HKD' },
  { name: 'Seoul, South Korea', currency: 'KRW' },
  { name: 'Prague, Czech Republic', currency: 'CZK' },
  { name: 'Budapest, Hungary', currency: 'HUF' },
];

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, placeholder = "Search location..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLocations(filtered);
    setIsOpen(true);
  };

  const handleLocationSelect = (location: { name: string; currency: string }) => {
    onChange(location.name, location.currency);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setFilteredLocations(locations);
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor="location">Location *</Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          id="location"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      
      {isOpen && filteredLocations.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-900">{location.name}</span>
                <span className="text-xs text-gray-500">{location.currency}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
