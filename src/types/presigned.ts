import type { ApiResponse } from './api';

export type FileType = 'PROFILE' | 'CHAT' | 'REVIEW' | 'SURVEY' | 'RENT';

export interface PresignedUrlData {
  fileName: string;
  fileType: FileType;
}

export type PresignedUrlResponse = ApiResponse<string>;
