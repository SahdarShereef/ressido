
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Building, MapPin, Plus, Trash2, Users, Bed } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { toast } from 'sonner';

interface Bed {
  id: string;
  label: string;
  occupied: boolean;
}

interface Room {
  id: string;
  label: string;
  type: 'single' | 'double' | 'triple';
  attachedWashroom: boolean;
  beds: Bed[];
}

interface Floor {
  id: string;
  label: string;
  rooms: Room[];
}

interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  type: 'boys_pg' | 'girls_pg' | 'co_living' | 'hostel';
  caretakerName: string;
  caretakerContact: string;
  floors: Floor[];
}

const PropertyOnboarding = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '',
    address: '',
    city: '',
    type: 'boys_pg',
    caretakerName: '',
    caretakerContact: '',
    floors: []
  });

  const addFloor = () => {
    const newFloor: Floor = {
      id: Date.now().toString(),
      label: '',
      rooms: []
    };
    setFormData(prev => ({
      ...prev,
      floors: [...prev.floors, newFloor]
    }));
  };

  const removeFloor = (floorId: string) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.filter(floor => floor.id !== floorId)
    }));
  };

  const updateFloor = (floorId: string, label: string) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId ? { ...floor, label } : floor
      )
    }));
  };

  const addRoom = (floorId: string) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      label: '',
      type: 'single',
      attachedWashroom: false,
      beds: []
    };
    
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId 
          ? { ...floor, rooms: [...floor.rooms, newRoom] }
          : floor
      )
    }));
  };

  const removeRoom = (floorId: string, roomId: string) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId
          ? { ...floor, rooms: floor.rooms.filter(room => room.id !== roomId) }
          : floor
      )
    }));
  };

  const updateRoom = (floorId: string, roomId: string, updates: Partial<Room>) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId
          ? {
              ...floor,
              rooms: floor.rooms.map(room =>
                room.id === roomId ? { ...room, ...updates } : room
              )
            }
          : floor
      )
    }));
  };

  const addBed = (floorId: string, roomId: string) => {
    const newBed: Bed = {
      id: Date.now().toString(),
      label: '',
      occupied: false
    };

    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId
          ? {
              ...floor,
              rooms: floor.rooms.map(room =>
                room.id === roomId
                  ? { ...room, beds: [...room.beds, newBed] }
                  : room
              )
            }
          : floor
      )
    }));
  };

  const removeBed = (floorId: string, roomId: string, bedId: string) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId
          ? {
              ...floor,
              rooms: floor.rooms.map(room =>
                room.id === roomId
                  ? { ...room, beds: room.beds.filter(bed => bed.id !== bedId) }
                  : room
              )
            }
          : floor
      )
    }));
  };

  const updateBed = (floorId: string, roomId: string, bedId: string, updates: Partial<Bed>) => {
    setFormData(prev => ({
      ...prev,
      floors: prev.floors.map(floor =>
        floor.id === floorId
          ? {
              ...floor,
              rooms: floor.rooms.map(room =>
                room.id === roomId
                  ? {
                      ...room,
                      beds: room.beds.map(bed =>
                        bed.id === bedId ? { ...bed, ...updates } : bed
                      )
                    }
                  : room
              )
            }
          : floor
      )
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.address.trim() &&
      formData.city.trim() &&
      formData.caretakerName.trim() &&
      formData.caretakerContact.trim() &&
      formData.floors.length > 0 &&
      formData.floors.some(floor => 
        floor.rooms.length > 0 && 
        floor.rooms.some(room => room.beds.length > 0)
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please complete all required fields and add at least one floor, room, and bed');
      return;
    }

    // Calculate totals
    const totalRooms = formData.floors.reduce((total, floor) => total + floor.rooms.length, 0);
    const totalBeds = formData.floors.reduce((total, floor) => 
      total + floor.rooms.reduce((roomTotal, room) => roomTotal + room.beds.length, 0), 0
    );

    const newProperty = {
      name: formData.name,
      address: formData.address,
      type: formData.type,
      roomCount: totalRooms,
      tenantCount: 0, // Will be updated when tenants are added
      // Store the structured data for future use
      floors: formData.floors,
      caretakers: [{
        id: Date.now().toString(),
        name: formData.caretakerName,
        contact: formData.caretakerContact,
        propertyId: ''
      }]
    };

    addProperty(newProperty);
    toast.success('Property onboarded successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Property Onboarding</h1>
            <p className="text-sm text-muted-foreground">Add a new property to your portfolio</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter property name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter complete address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Property Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caretakerName">Caretaker Name *</Label>
                  <Input
                    id="caretakerName"
                    value={formData.caretakerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, caretakerName: e.target.value }))}
                    placeholder="Enter caretaker name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caretakerContact">Caretaker Contact *</Label>
                  <Input
                    id="caretakerContact"
                    value={formData.caretakerContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, caretakerContact: e.target.value }))}
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Floors Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Floors
                </div>
                <Button type="button" onClick={addFloor} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Floor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.floors.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No floors added yet. Click "Add Floor" to get started.
                </p>
              ) : (
                formData.floors.map((floor, floorIndex) => (
                  <Card key={floor.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Input
                            value={floor.label}
                            onChange={(e) => updateFloor(floor.id, e.target.value)}
                            placeholder={`Floor ${floorIndex + 1} name`}
                            className="max-w-xs"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => addRoom(floor.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Room
                          </Button>
                          <Button
                            type="button"
                            onClick={() => removeFloor(floor.id)}
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {/* Rooms Section - Only show if floor exists */}
                    <CardContent className="pt-0">
                      {floor.rooms.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-2 bg-muted rounded">
                          No rooms added to this floor yet.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {floor.rooms.map((room) => (
                            <Card key={room.id} className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <Input
                                      value={room.label}
                                      onChange={(e) => updateRoom(floor.id, room.id, { label: e.target.value })}
                                      placeholder="Room name/number"
                                      className="w-32"
                                    />
                                    <Select
                                      value={room.type}
                                      onValueChange={(value) => updateRoom(floor.id, room.id, { type: value as any })}
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="single">Single</SelectItem>
                                        <SelectItem value="double">Double</SelectItem>
                                        <SelectItem value="triple">Triple</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        checked={room.attachedWashroom}
                                        onCheckedChange={(checked) => updateRoom(floor.id, room.id, { attachedWashroom: checked })}
                                      />
                                      <Label className="text-sm">Attached Washroom</Label>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      onClick={() => addBed(floor.id, room.id)}
                                      variant="outline"
                                      size="sm"
                                    >
                                      <Bed className="h-4 w-4 mr-2" />
                                      Add Bed
                                    </Button>
                                    <Button
                                      type="button"
                                      onClick={() => removeRoom(floor.id, room.id)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Beds Section - Only show if room exists */}
                                {room.beds.length === 0 ? (
                                  <p className="text-xs text-muted-foreground text-center py-2 bg-background rounded">
                                    No beds added to this room yet.
                                  </p>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {room.beds.map((bed) => (
                                      <div key={bed.id} className="flex items-center justify-between p-2 bg-background rounded border">
                                        <div className="flex items-center gap-2">
                                          <Input
                                            value={bed.label}
                                            onChange={(e) => updateBed(floor.id, room.id, bed.id, { label: e.target.value })}
                                            placeholder="Bed label"
                                            className="w-20 h-8"
                                          />
                                          <div className="flex items-center space-x-2">
                                            <Switch
                                              checked={bed.occupied}
                                              onCheckedChange={(checked) => updateBed(floor.id, room.id, bed.id, { occupied: checked })}
                                            />
                                            <Label className="text-xs">Occupied</Label>
                                          </div>
                                        </div>
                                        <Button
                                          type="button"
                                          onClick={() => removeBed(floor.id, room.id, bed.id)}
                                          variant="ghost"
                                          size="sm"
                                          className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid()}>
              Submit Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyOnboarding;
