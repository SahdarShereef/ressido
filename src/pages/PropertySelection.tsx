
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Settings } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import AddPropertyModal from '@/components/AddPropertyModal';
import { useProperty } from '@/contexts/PropertyContext';
import { useNavigate } from 'react-router-dom';

const PropertySelection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { properties, selectProperty } = useProperty();
  const navigate = useNavigate();

  const handlePropertySelect = (property: any) => {
    selectProperty(property);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Select Your Property
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose a property to manage or add a new one to get started with Ressido
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={handlePropertySelect}
            />
          ))}
          
          {/* Add Property Card - Quick Setup */}
          <div 
            onClick={() => setIsAddModalOpen(true)}
            className="group cursor-pointer"
          >
            <div className="h-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 min-h-[200px]">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Quick Add Property</h3>
              <p className="text-sm text-slate-500 text-center">
                Add a basic property quickly
              </p>
            </div>
          </div>

          {/* Full Onboarding Card */}
          <div 
            onClick={() => navigate('/onboard-property')}
            className="group cursor-pointer"
          >
            <div className="h-full border-2 border-dashed border-green-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 min-h-[200px]">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Full Property Setup</h3>
              <p className="text-sm text-slate-500 text-center">
                Complete onboarding with floors, rooms, and tenants
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Welcome to Ressido
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Get started by adding your first property. You can manage multiple properties from one dashboard.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="outline"
                className="px-8 py-3 h-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Quick Add
              </Button>
              <Button
                onClick={() => navigate('/onboard-property')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 h-auto text-lg"
              >
                <Settings className="h-5 w-5 mr-2" />
                Full Setup
              </Button>
            </div>
          </div>
        )}
      </div>

      <AddPropertyModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};

export default PropertySelection;
