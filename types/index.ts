export interface Store {
  name: string;
  boothNumber: string;
  description: string;
  image: string;
  instagram: string;
  days: string[];
  genre: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type EventDate = (typeof import("@/data/events").EVENT_DATES)[number];
