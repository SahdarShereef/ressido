
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building, MapPin, Users, Phone, Calendar } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { Property, RoomType, Floor, Caretaker, Inmate } from '@/types/property';
import { toast } from 'sonner';

const PropertyOnboarding = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  
  // Basic property details
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState<'boys_pg' | 'girls_pg' | 'co_living' | 'hostel'>('boys_pg');
  
  // Structure details
  const [floors, setFloors] = useState<Floor[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  
  // Caretaker details
  const [caretaker, setCaretaker] = useState<Partial<Caretaker>>({
    name: '',
    contact: ''
  });
  
  // Sample inmates data
  const [inmates, setInmates] = useState<Partial<Inmate>[]>([]);

  const handleAddFloor = () => {
    const newFloor: Floor = {
      id: Date.now().toString(),
      number: floors.length + 1,
      name: `Floor ${floors.length + 1}`,
      roomIds: []
    };
    setFloors([...floors, newFloor]);
  };

  const handleAddRoomType = () => {
    const newRoomType: RoomType = {
      id: Date.now().toString(),
      name: '',
      sharing: 'single',
      facilities: [],
      rent: 0
    };
    setRoomTypes([...roomTypes, newRoomType]);
  };

  const handleAddInmate = () => {
    const newInmate: Partial<Inmate> = {
      name: '',
      age: 18,
      gender: 'male',
      contact: '',
      moveInDate: new Date().toISOString().split('T')[0]
    };
    setInmates([...inmates, newInmate]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!propertyName || !address) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProperty: Omit<Property, 'id'> = {
      name: propertyName,
      address,
      type: propertyType,
      roomCount: floors.reduce((acc, floor) => acc + floor.roomIds.length, 0),
      tenantCount: inmates.length,
      floors,
      roomTypes,
      caretakers: caretaker.name ? [{ ...caretaker, id: Date.now().toString(), propertyId: '' } as Caretaker] : [],
      inmates: inmates.filter(i => i.name) as Inmate[]
    };

    addProperty(newProperty);
    toast.success('Property onboarded successfully!');
    navigate('/properties');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/properties')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Property Onboarding</h1>
            <p className="text-slate-600">Set up your new property with Ressido</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyName">Property Name *</Label>
                  <Input
                    id="propertyName"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="e.g., Sunshine PG"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select value={propertyType} onValueChange={(value) => setPropertyType(value as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boys_pg">Boys PG</SelectItem>
                      <SelectItem value="girls_pg">Girls PG</SelectItem>
                      <SelectItem value="co_living">Co-Living</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Complete Address *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g., Koramangala, Bangalore"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Structure Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Property Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Floors</h3>
                  <Button type="button" onClick={handleAddFloor} variant="outline" size="sm">
                    Add Floor
                  </Button>
                </div>
                <div className="space-y-2">
                  {floors.map((floor, index) => (
                    <div key={floor.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">Floor {floor.number}</span>
                      <Input
                        value={floor.name}
                        onChange={(e) => {
                          const updatedFloors = [...floors];
                          updatedFloors[index].name = e.target.value;
                          setFloors(updatedFloors);
                        }}
                        placeholder="Floor name"
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Room Types</h3>
                  <Button type="button" onClick={handleAddRoomType} variant="outline" size="sm">
                    Add Room Type
                  </Button>
                </div>
                <div className="space-y-4">
                  {roomTypes.map((roomType, index) => (
                    <div key={roomType.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          value={roomType.name}
                          onChange={(e) => {
                            const updatedTypes = [...roomTypes];
                            updatedTypes[index].name = e.target.value;
                            setRoomTypes(updatedTypes);
                          }}
                          placeholder="Room type name"
                        />
                        <Select 
                          value={roomType.sharing} 
                          onValueChange={(value) => {
                            const updatedTypes = [...roomTypes];
                            updatedTypes[index].sharing = value as any;
                            setRoomTypes(updatedTypes);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single Sharing</SelectItem>
                            <SelectItem value="double">Double Sharing</SelectItem>
                            <SelectItem value="triple">Triple Sharing</SelectItem>
                            <SelectItem value="dormitory">Dormitory</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={roomType.rent || ''}
                          onChange={(e) => {
                            const updatedTypes = [...roomTypes];
                            updatedTypes[index].rent = parseInt(e.target.value) || 0;
                            setRoomTypes(updatedTypes);
                          }}
                          placeholder="Monthly rent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Caretaker Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Caretaker Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caretakerName">Caretaker Name</Label>
                  <Input
                    id="caretakerName"
                    value={caretaker.name}
                    onChange={(e) => setCaretaker({ ...caretaker, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="caretakerContact">Contact Number</Label>
                  <Input
                    id="caretakerContact"
                    value={caretaker.contact}
                    onChange={(e) => setCaretaker({ ...caretaker, contact: e.target.value })}
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Initial Inmates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Initial Inmates (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button type="button" onClick={handleAddInmate} variant="outline" size="sm">
                Add Inmate
              </Button>
              <div className="space-y-4">
                {inmates.map((inmate, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input
                        value={inmate.name}
                        onChange={(e) => {
                          const updatedInmates = [...inmates];
                          updatedInmates[index].name = e.target.value;
                          setInmates(updatedInmates);
                        }}
                        placeholder="Name"
                      />
                      <Input
                        type="number"
                        value={inmate.age}
                        onChange={(e) => {
                          const updatedInmates = [...inmates];
                          updatedInmates[index].age = parseInt(e.target.value) || 18;
                          setInmates(updatedInmates);
                        }}
                        placeholder="Age"
                      />
                      <Select 
                        value={inmate.gender} 
                        onValueChange={(value) => {
                          const updatedInmates = [...inmates];
                          updatedInmates[index].gender = value as any;
                          setInmates(updatedInmates);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={inmate.contact}
                        onChange={(e) => {
                          const updatedInmates = [...inmates];
                          updatedInmates[index].contact = e.target.value;
                          setInmates(updatedInmates);
                        }}
                        placeholder="Contact"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/properties')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Onboard Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyOnboarding;
