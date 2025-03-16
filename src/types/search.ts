import type { ApiResponse } from './api';

export interface ConcertData {
  id: number;
  poster: string;
  title: string;
  concertHallName: string;
  hallId: string;
  stdate: string;
  eddate: string;
  episodes: string[];
}

export type SearchAfter = (string | number)[] | null;

export interface SearchConcert {
  concertThumbnails: ConcertData[];
  searchAfter: SearchAfter;
}

interface SearchArtistImages {
  url: string;
  width: number;
  height: number;
}

export interface SearchArtist {
  id: string;
  name: string;
  images: SearchArtistImages[];
}

export interface ArtistInfo {
  id: string;
  name: string;
  image: string;
}

export type SearchConcertResponse = ApiResponse<SearchConcert>;
export type SearchArtistResponse = ApiResponse<SearchArtist[]>;
