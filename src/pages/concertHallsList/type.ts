export interface Result {
  concertHallThumbnails: ConcertHalls[];
  searchAfter: SearchAfter;
}

export interface ConcertHalls {
  id: string;
  name: string;
  address: string;
  seatScale: number;
  convenienceInfo: ConvenienceInfo;
}

interface SearchAfter {
  0: string;
  1: string;
  2?: string;
}

interface ConvenienceInfo {
  hasParkingLot: boolean;
  hasRestaurant: boolean;
  hasCafe: boolean;
  hasStore: boolean;
  hasDisabledParking: boolean;
  hasDisabledToilet: boolean;
  hasElevator: boolean;
  hasRunway: boolean;
}

export interface FiltersActive {
  addressFilter: boolean;
  seatScaleFilter: boolean;
}
