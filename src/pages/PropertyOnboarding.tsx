
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Building, Plus, Trash2, Users, Bed } from 'lucide-react';
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

  const [step, setStep] = useState(1); // 1: Property Details, 2: Structure

  // Property Details validation
  const isPropertyDetailsValid = () => {
    return (
      formData.name.trim() &&
      formData.address.trim() &&
      formData.city.trim() &&
      formData.caretakerName.trim() &&
      formData.caretakerContact.trim()
    );
  };

  // Final form validation
  const isFormValid = () => {
    return (
      isPropertyDetailsValid() &&
      formData.floors.length > 0 &&
      formData.floors.some(floor => 
        floor.rooms.length > 0 && 
        floor.rooms.some(room => room.beds.length > 0)
      )
    );
  };

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

  const handleNextStep = () => {
    if (!isPropertyDetailsValid()) {
      toast.error('Please complete all property details');
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please complete all required fields and add at least one floor, room, and bed');
      return;
    }

    // Transform data to match Property interface
    const transformedFloors = formData.floors.map((floor, floorIndex) => {
      const transformedRooms = floor.rooms.map(room => ({
        id: room.id,
        number: room.label,
        floorId: floor.id,
        isOccupied: room.beds.some(bed => bed.occupied),
        tenantIds: [],
        label: room.label,
        type: room.type,
        attachedWashroom: room.attachedWashroom,
        beds: room.beds.map(bed => ({
          id: bed.id,
          label: bed.label,
          occupied: bed.occupied
        }))
      }));

      return {
        id: floor.id,
        number: floorIndex + 1,
        name: floor.label,
        roomIds: transformedRooms.map(room => room.id),
        label: floor.label,
        rooms: transformedRooms
      };
    });

    const totalRooms = formData.floors.reduce((total, floor) => total + floor.rooms.length, 0);

    const newProperty = {
      name: formData.name,
      address: formData.address,
      type: formData.type,
      roomCount: totalRooms,
      tenantCount: 0,
      floors: transformedFloors,
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
    <div className="mt-6 px-6 py-8 max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100">
    <div className="flex items-center gap-4 mb-6">
      
      <div>
        <h1 className="pl-1 text-2xl font-semibold text-foreground">Onboard a New Property</h1>
        <p className="pl-1 mt-4 text-sm text-muted-foreground">Create a comprehensive property profile</p>
      </div>
      <div className="flex justify-end flex-1">
  <Button
    variant="outline"
    size="sm"
    onClick={() => navigate('/dashboard')}
  >
    Back to Dashboard
  </Button>
</div>
    </div>

    {step === 1 && (
      <Card className="border shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Building className="h-5 w-5 text-primary" />
            Property Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boys_pg">Boys PG</SelectItem>
                <SelectItem value="girls_pg">Girls PG</SelectItem>
                <SelectItem value="co_living">Co-Living</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Enter caretaker contact"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleNextStep} className="w-full md:w-auto flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-6001">Continue to Structure</Button>
          </div>
        </CardContent>
      </Card>
    )}


      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="pl-1 text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Property Structure
              </h2>
              <p className="pl-1 mt-1 text-slate-600 text-sm">Add floors, rooms, and beds to complete your property setup</p>
            </div>
            <Button type="button" onClick={addFloor} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Floor
            </Button>
          </div>

          {formData.floors.length === 0 ? (
            <Card className="border-dashed border-2 border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building className="h-12 w-12 text-slate-400 mb-4" />
                <p className="text-slate-500 mb-2">No floors added yet</p>
                <p className="text-sm text-slate-400 mb-4">Click "Add Floor" to start building your property structure</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {formData.floors.map((floor, floorIndex) => (
                <Card key={floor.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="space-y-2">
                          <Label>Floor {floorIndex + 1} Name</Label>
                          <Input
                            value={floor.label}
                            onChange={(e) => updateFloor(floor.id, e.target.value)}
                            placeholder={`Floor ${floorIndex + 1} name`}
                            className="w-48"
                          />
                        </div>
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
                  
                  <CardContent className="pt-0">
                    {floor.rooms.length === 0 ? (
                      <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 mb-2">No rooms added to this floor yet</p>
                        <p className="text-sm text-slate-400">Click "Add Room" to add rooms to this floor</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {floor.rooms.map((room) => (
                          <Card key={room.id} className="bg-slate-50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="space-y-2">
                                    <Label>Room Name/Number</Label>
                                    <Input
                                      value={room.label}
                                      onChange={(e) => updateRoom(floor.id, room.id, { label: e.target.value })}
                                      placeholder="Room name/number"
                                      className="w-32"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Room Type</Label>
                                    <Select value={room.type} onValueChange={(value) => updateRoom(floor.id, room.id, { type: value as any })}>
                                      <SelectTrigger className="w-32">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="single">Single</SelectItem>
                                        <SelectItem value="double">Double</SelectItem>
                                        <SelectItem value="triple">Triple</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
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

                              {room.beds.length === 0 ? (
                                <div className="text-center py-6 bg-white rounded border-2 border-dashed border-slate-200">
                                  <p className="text-slate-500 text-sm mb-1">No beds added to this room yet</p>
                                  <p className="text-xs text-slate-400">Click "Add Bed" to add beds to this room</p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {room.beds.map((bed) => (
                                    <div key={bed.id} className="flex items-center justify-between p-3 bg-white rounded border">
                                      <div className="flex items-center gap-3">
                                        <div className="space-y-1">
                                          <Label className="text-xs">Bed Label</Label>
                                          <Input
                                            value={bed.label}
                                            onChange={(e) => updateBed(floor.id, room.id, bed.id, { label: e.target.value })}
                                            placeholder="Bed label"
                                            className="w-20 h-8 text-sm"
                                          />
                                        </div>
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
              ))}
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back to Property Details
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" onClick={handleSubmit} disabled={!isFormValid()}>
                Create Property
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyOnboarding;
