
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Users, Plus, Eye } from 'lucide-react';

interface BedStatus {
  id: string;
  tenant?: string;
  status: 'available' | 'occupied' | 'reserved';
}

interface Room {
  id: string;
  number: string;
  floor: number;
  capacity: number;
  beds: BedStatus[];
  type: 'single' | 'double' | 'shared';
}

const RoomBlueprint = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  
  // Mock data
  const floors = [1, 2, 3];
  const rooms: Room[] = [
    {
      id: '101',
      number: '101',
      floor: 1,
      capacity: 2,
      type: 'double',
      beds: [
        { id: '101-1', tenant: 'Rahul Kumar', status: 'occupied' },
        { id: '101-2', status: 'available' }
      ]
    },
    {
      id: '102',
      number: '102',
      floor: 1,
      capacity: 4,
      type: 'shared',
      beds: [
        { id: '102-1', tenant: 'Priya Sharma', status: 'occupied' },
        { id: '102-2', tenant: 'Amit Singh', status: 'occupied' },
        { id: '102-3', status: 'reserved' },
        { id: '102-4', status: 'available' }
      ]
    },
    {
      id: '103',
      number: '103',
      floor: 1,
      capacity: 1,
      type: 'single',
      beds: [
        { id: '103-1', status: 'available' }
      ]
    },
    {
      id: '201',
      number: '201',
      floor: 2,
      capacity: 2,
      type: 'double',
      beds: [
        { id: '201-1', tenant: 'Sneha Patel', status: 'occupied' },
        { id: '201-2', tenant: 'Rohan Gupta', status: 'occupied' }
      ]
    },
    {
      id: '202',
      number: '202',
      floor: 2,
      capacity: 4,
      type: 'shared',
      beds: [
        { id: '202-1', status: 'available' },
        { id: '202-2', status: 'available' },
        { id: '202-3', status: 'available' },
        { id: '202-4', status: 'available' }
      ]
    }
  ];

  const currentFloorRooms = rooms.filter(room => room.floor === selectedFloor);

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 border-green-300 hover:bg-green-200';
      case 'occupied': return 'bg-red-100 border-red-300';
      case 'reserved': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getBedStatusBadge = (status: string) => {
    switch (status) {
      case 'available': return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>;
      case 'occupied': return <Badge className="bg-red-500 hover:bg-red-600">Occupied</Badge>;
      case 'reserved': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Reserved</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Room Management</h2>
          <p className="text-slate-600">Interactive floor plan and bed allocation</p>
        </div>
        
        {/* Floor Switcher */}
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          {floors.map((floor) => (
            <Button
              key={floor}
              variant={selectedFloor === floor ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedFloor(floor)}
              className={`transition-all duration-200 ${
                selectedFloor === floor 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Floor {floor}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-medium text-slate-700">Status Legend:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-sm text-slate-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-sm text-slate-600">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-sm text-slate-600">Reserved</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFloorRooms.map((room) => {
          const occupiedBeds = room.beds.filter(bed => bed.status === 'occupied').length;
          const availableBeds = room.beds.filter(bed => bed.status === 'available').length;
          
          return (
            <Card key={room.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-800">
                    Room {room.number}
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{occupiedBeds}/{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{availableBeds} available</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Bed Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {room.beds.map((bed, index) => (
                    <div
                      key={bed.id}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${getBedStatusColor(bed.status)}`}
                      title={bed.tenant || `Bed ${index + 1} - ${bed.status}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-slate-600" />
                          <span className="text-sm font-medium text-slate-700">
                            Bed {index + 1}
                          </span>
                        </div>
                        {getBedStatusBadge(bed.status)}
                      </div>
                      {bed.tenant && (
                        <p className="text-xs text-slate-600 mt-1 truncate">{bed.tenant}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Room Actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  {availableBeds > 0 && (
                    <Button size="sm" className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
                      <Plus className="h-4 w-4" />
                      Book Bed
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {currentFloorRooms.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="text-center py-12">
            <Bed className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No rooms on this floor</h3>
            <p className="text-slate-500">Switch to a different floor to view available rooms.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomBlueprint;
