
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, MapPin, Users, Phone, Calendar, Trash2, Plus } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { Property, Floor, Caretaker, Inmate, Room } from '@/types/property';
import { toast } from 'sonner';

const PropertyOnboarding = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  
  // Basic property details
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState<'boys_pg' | 'girls_pg' | 'co_living' | 'hostel'>('boys_pg');
  
  // Structure details
  const [floors, setFloors] = useState<(Floor & { rooms: Room[] })[]>([]);
  
  // Caretaker details
  const [caretaker, setCaretaker] = useState<Partial<Caretaker>>({
    name: '',
    contact: ''
  });
  
  // Sample inmates data
  const [inmates, setInmates] = useState<Partial<Inmate>[]>([]);

  const handleAddFloor = () => {
    const newFloor = {
      id: Date.now().toString(),
      number: floors.length + 1,
      name: `Floor ${floors.length + 1}`,
      roomIds: [],
      rooms: []
    };
    setFloors([...floors, newFloor]);
  };

  const handleDeleteFloor = (floorId: string) => {
    setFloors(floors.filter(floor => floor.id !== floorId));
  };

  const handleAddRoom = (floorId: string) => {
    const floor = floors.find(f => f.id === floorId);
    if (!floor) return;

    const newRoom: Room = {
      id: Date.now().toString(),
      number: `R${floor.rooms.length + 1}`,
      typeId: '', // No longer using room types
      floorId: floorId,
      isOccupied: false,
      tenantIds: []
    };

    setFloors(floors.map(f => 
      f.id === floorId 
        ? { ...f, rooms: [...f.rooms, newRoom], roomIds: [...f.roomIds, newRoom.id] }
        : f
    ));
  };

  const handleDeleteRoom = (floorId: string, roomId: string) => {
    setFloors(floors.map(f => 
      f.id === floorId 
        ? { 
            ...f, 
            rooms: f.rooms.filter(r => r.id !== roomId),
            roomIds: f.roomIds.filter(id => id !== roomId)
          }
        : f
    ));
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

  const handleDeleteInmate = (index: number) => {
    setInmates(inmates.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!propertyName || !address) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Get the logged-in user ID (in a real app, this would come from auth context)
    const userId = localStorage.getItem('userId') || 'current-user';

    const allRooms = floors.flatMap(floor => floor.rooms);
    
    const newProperty: Omit<Property, 'id'> = {
      name: propertyName,
      address,
      type: propertyType,
      roomCount: allRooms.length,
      tenantCount: inmates.filter(i => i.name).length,
      floors: floors.map(({ rooms, ...floor }) => floor),
      rooms: allRooms,
      caretakers: caretaker.name ? [{ 
        ...caretaker, 
        id: Date.now().toString(), 
        propertyId: '' 
      } as Caretaker] : [],
      inmates: inmates.filter(i => i.name).map(inmate => ({
        ...inmate,
        id: Date.now().toString(),
        propertyId: ''
      })) as Inmate[]
    };

    addProperty(newProperty);
    toast.success('Property onboarded successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Property Onboarding</h1>
          <p className="text-slate-600">Set up your new property with Ressido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Property Details */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Building className="h-5 w-5 text-blue-600" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyName" className="text-sm font-medium text-slate-700">Property Name *</Label>
                  <Input
                    id="propertyName"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="e.g., Sunshine PG"
                    className="h-12 border-slate-200 focus:border-blue-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-sm font-medium text-slate-700">Property Type *</Label>
                  <Select value={propertyType} onValueChange={(value) => setPropertyType(value as any)}>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-300">
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
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-slate-700">Complete Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g., Koramangala, Bangalore"
                    className="h-12 pl-10 border-slate-200 focus:border-blue-300"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Structure Definition */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Property Structure
                </div>
                <Button type="button" onClick={handleAddFloor} variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Floor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {floors.map((floor, floorIndex) => (
                <div key={floor.id} className="bg-slate-50 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-slate-800">Floor {floor.number}</span>
                      <Input
                        value={floor.name}
                        onChange={(e) => {
                          const updatedFloors = [...floors];
                          updatedFloors[floorIndex].name = e.target.value;
                          setFloors(updatedFloors);
                        }}
                        placeholder="Floor name"
                        className="max-w-xs h-10 border-slate-200 focus:border-blue-300"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddRoom(floor.id)}
                        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Room
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFloor(floor.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {floor.rooms.length > 0 && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-sm text-slate-700">Rooms on this floor:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {floor.rooms.map((room, roomIndex) => (
                          <div key={room.id} className="flex items-center justify-between p-3 bg-white rounded border border-slate-200">
                            <Input
                              value={room.number}
                              onChange={(e) => {
                                const updatedFloors = [...floors];
                                updatedFloors[floorIndex].rooms[roomIndex].number = e.target.value;
                                setFloors(updatedFloors);
                              }}
                              className="flex-1 h-8 mr-2 border-slate-200 focus:border-blue-300"
                              placeholder="Room #"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRoom(floor.id, room.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Caretaker Information */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Users className="h-5 w-5 text-blue-600" />
                Caretaker Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caretakerName" className="text-sm font-medium text-slate-700">Caretaker Name</Label>
                  <Input
                    id="caretakerName"
                    value={caretaker.name}
                    onChange={(e) => setCaretaker({ ...caretaker, name: e.target.value })}
                    placeholder="Full name"
                    className="h-12 border-slate-200 focus:border-blue-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caretakerContact" className="text-sm font-medium text-slate-700">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="caretakerContact"
                      value={caretaker.contact}
                      onChange={(e) => setCaretaker({ ...caretaker, contact: e.target.value })}
                      placeholder="Phone number"
                      className="h-12 pl-10 border-slate-200 focus:border-blue-300"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Initial Inmates */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Initial Inmates (Optional)
                </div>
                <Button type="button" onClick={handleAddInmate} variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Inmate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inmates.map((inmate, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-800">Inmate {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteInmate(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      value={inmate.name}
                      onChange={(e) => {
                        const updatedInmates = [...inmates];
                        updatedInmates[index].name = e.target.value;
                        setInmates(updatedInmates);
                      }}
                      placeholder="Name"
                      className="h-10 border-slate-200 focus:border-blue-300"
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
                      className="h-10 border-slate-200 focus:border-blue-300"
                    />
                    <Select 
                      value={inmate.gender} 
                      onValueChange={(value) => {
                        const updatedInmates = [...inmates];
                        updatedInmates[index].gender = value as any;
                        setInmates(updatedInmates);
                      }}
                    >
                      <SelectTrigger className="h-10 border-slate-200 focus:border-blue-300">
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
                      className="h-10 border-slate-200 focus:border-blue-300"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={() => navigate('/')} className="h-12 px-6 border-slate-200 text-slate-600 hover:bg-slate-50">
              Cancel
            </Button>
            <Button type="submit" className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
              Onboard Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyOnboarding;
