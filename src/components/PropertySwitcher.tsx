
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building, ChevronDown, Users, Bed } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';

const PropertySwitcher = () => {
  const { properties, selectedProperty, selectProperty } = useProperty();
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedProperty) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-3 flex items-center gap-3 hover:bg-slate-50 min-w-0"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building className="h-4 w-4 text-white" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-800 truncate">
              {selectedProperty.name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {selectedProperty.address}
            </p>
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="start" 
        className="w-80 p-2 bg-white border border-slate-200 shadow-lg"
      >
        {properties.map((property) => (
          <DropdownMenuItem
            key={property.id}
            onClick={() => {
              if (property.id !== selectedProperty.id) {
                selectProperty(property);
              }
              setIsOpen(false);
            }}
            className={`p-3 cursor-pointer rounded-lg transition-colors ${
              property.id === selectedProperty.id 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate">{property.name}</p>
                <p className="text-sm text-slate-500 truncate">{property.address}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Bed className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{property.roomCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{property.tenantCount}</span>
                  </div>
                </div>
              </div>
              {property.id === selectedProperty.id && (
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertySwitcher;
