
export interface RoomFacility {
  id: string;
  name: string;
  icon?: string;
}

export interface Room {
  id: string;
  number: string;
  typeId: string; // Keep for backward compatibility but no longer used
  floorId: string;
  isOccupied: boolean;
  tenantIds: string[];
}

export interface Floor {
  id: string;
  number: number;
  name: string;
  roomIds: string[];
}

export interface Caretaker {
  id: string;
  name: string;
  contact: string;
  propertyId: string;
}

export interface Inmate {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  roomId?: string;
  moveInDate: string;
  propertyId: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'boys_pg' | 'girls_pg' | 'co_living' | 'hostel';
  roomCount: number;
  tenantCount: number;
  photo?: string;
  // Extended structure
  floors?: Floor[];
  rooms?: Room[];
  caretakers?: Caretaker[];
  inmates?: Inmate[];
  // Geo-tagging
  coordinates?: {
    lat: number;
    lng: number;
  };
}
