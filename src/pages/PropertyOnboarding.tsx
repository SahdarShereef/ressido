
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building, MapPin, Users, Phone, Calendar, Trash2, Plus } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { Property, RoomType, Floor, Caretaker, Inmate, Room } from '@/types/property';
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
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  
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
      typeId: roomTypes[0]?.id || '',
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

  const handleDeleteRoomType = (roomTypeId: string) => {
    setRoomTypes(roomTypes.filter(rt => rt.id !== roomTypeId));
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
      roomTypes,
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Property Onboarding</h1>
            <p className="text-muted-foreground">Set up your new property with Ressido</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Room Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Room Types
                </div>
                <Button type="button" onClick={handleAddRoomType} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room Type
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roomTypes.map((roomType, index) => (
                <div key={roomType.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Room Type {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRoomType(roomType.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
            </CardContent>
          </Card>

          {/* Structure Definition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Property Structure
                </div>
                <Button type="button" onClick={handleAddFloor} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Floor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {floors.map((floor, floorIndex) => (
                <div key={floor.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Floor {floor.number}</span>
                      <Input
                        value={floor.name}
                        onChange={(e) => {
                          const updatedFloors = [...floors];
                          updatedFloors[floorIndex].name = e.target.value;
                          setFloors(updatedFloors);
                        }}
                        placeholder="Floor name"
                        className="max-w-xs"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddRoom(floor.id)}
                        disabled={roomTypes.length === 0}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Room
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFloor(floor.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {roomTypes.length === 0 && (
                    <p className="text-sm text-muted-foreground">Please add room types first before adding rooms.</p>
                  )}

                  {floor.rooms.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Rooms on this floor:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {floor.rooms.map((room, roomIndex) => (
                          <div key={room.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <Input
                                value={room.number}
                                onChange={(e) => {
                                  const updatedFloors = [...floors];
                                  updatedFloors[floorIndex].rooms[roomIndex].number = e.target.value;
                                  setFloors(updatedFloors);
                                }}
                                className="w-20 h-8"
                                placeholder="Room #"
                              />
                              <Select
                                value={room.typeId}
                                onValueChange={(value) => {
                                  const updatedFloors = [...floors];
                                  updatedFloors[floorIndex].rooms[roomIndex].typeId = value;
                                  setFloors(updatedFloors);
                                }}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {roomTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name || 'Unnamed'}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRoom(floor.id, room.id)}
                              className="text-destructive hover:text-destructive h-8 w-8 p-0"
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
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Initial Inmates (Optional)
                </div>
                <Button type="button" onClick={handleAddInmate} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Inmate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inmates.map((inmate, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Inmate {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteInmate(index)}
                      className="text-destructive hover:text-destructive"
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
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit">
              Onboard Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyOnboarding;
