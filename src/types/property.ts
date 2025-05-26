
export interface RoomFacility {
  id: string;
  name: string;
  icon?: string;
}

export interface Bed {
  id: string;
  label: string;
  occupied: boolean;
}

export interface Room {
  id: string;
  number: string;
  floorId: string;
  isOccupied: boolean;
  tenantIds: string[];
  // New structure for onboarding
  label?: string;
  type?: 'single' | 'double' | 'triple';
  attachedWashroom?: boolean;
  beds?: Bed[];
}

export interface Floor {
  id: string;
  number: number;
  name: string;
  roomIds: string[];
  // New structure for onboarding
  label?: string;
  rooms?: Room[];
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
