export interface iMedia {
  id: string;
  alt: string;
  caption?: {
    [k: string]: unknown;
  }[];
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}

export default iMedia;
