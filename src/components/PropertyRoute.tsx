
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProperty } from '@/contexts/PropertyContext';

interface PropertyRouteProps {
  children: React.ReactNode;
}

const PropertyRoute = ({ children }: PropertyRouteProps) => {
  const { properties, selectedProperty } = useProperty();

  // If user has properties but none selected, redirect to property selection
  if (properties.length > 0 && !selectedProperty) {
    return <Navigate to="/properties" replace />;
  }

  // If no properties at all, redirect to property selection to add first property
  if (properties.length === 0) {
    return <Navigate to="/properties" replace />;
  }

  return <>{children}</>;
};

export default PropertyRoute;
