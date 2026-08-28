import type { PortableTextBlock } from '@portabletext/types';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  content?: PortableTextBlock[] | string; 
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalPage {
  _id: string;
  title: string;
  slug: string;
  updated: string;
  sections: LegalSection[];
}

