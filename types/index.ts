export interface Service {
  id: string;
  title: string;
  icon: string;
  subServices: string[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  before?: string;
  after?: string;
}
