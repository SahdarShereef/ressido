
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface PropertyContextType {
  properties: Property[];
  selectedProperty: Property | null;
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (property: Property) => void;
  selectProperty: (property: Property) => void;
  isLoading: boolean;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: React.ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      name: 'Sunshine PG',
      address: 'Koramangala, Bangalore',
      type: 'boys_pg',
      roomCount: 30,
      tenantCount: 24,
    },
    {
      id: '2',
      name: 'Elite Hostel',
      address: 'HSR Layout, Bangalore',
      type: 'co_living',
      roomCount: 45,
      tenantCount: 38,
    },
  ]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has a previously selected property
    const savedPropertyId = localStorage.getItem('selectedPropertyId');
    if (savedPropertyId && properties.length > 0) {
      const property = properties.find(p => p.id === savedPropertyId);
      if (property) {
        setSelectedProperty(property);
      }
    }
  }, [properties]);

  const addProperty = (propertyData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
    };
    setProperties(prev => [...prev, newProperty]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
    if (selectedProperty?.id === updatedProperty.id) {
      setSelectedProperty(updatedProperty);
    }
  };

  const selectProperty = (property: Property) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProperty(property);
      localStorage.setItem('selectedPropertyId', property.id);
      setIsLoading(false);
    }, 500); // Simulate loading time for smooth transition
  };

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      selectedProperty, 
      addProperty,
      updateProperty,
      selectProperty,
      isLoading
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
