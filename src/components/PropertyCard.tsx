
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Bed } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

const PropertyCard = ({ property, onSelect }: PropertyCardProps) => {
  const getPropertyTypeLabel = (type: string) => {
    const typeMap = {
      'boys_pg': 'Boys PG',
      'girls_pg': 'Girls PG', 
      'co_living': 'Co-Living',
      'hostel': 'Hostel'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {property.name}
                </h3>
                <p className="text-sm text-slate-500">{property.address}</p>
                <p className="text-xs text-slate-400 mt-1">{getPropertyTypeLabel(property.type)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">{property.roomCount} rooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-600">{property.tenantCount} tenants</span>
          </div>
        </div>

        <Button 
          onClick={() => onSelect(property)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-lg h-11 font-medium transition-all duration-200 group-hover:scale-[1.02]"
        >
          Enter Property
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
