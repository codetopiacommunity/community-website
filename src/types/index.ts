export interface ImpactStory {
  id: number;
  title: string;
  impact: string;
  imageUrl: string;
  logoUrl: string;
  date: string;
  location: string;
  link?: string | null;
  galleryLink?: string | null;
}

export interface GalleryAlbumWithPhotos {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  photos: { id: number }[];
}

export interface GalleryAlbum {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  _count?: { photos: number };
}

export interface TeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  statement: string;
  expertise: string[];
  tier: string;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

export interface Newsletter {
  id: number;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
