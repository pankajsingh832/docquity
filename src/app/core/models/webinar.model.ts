export interface Webinar {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  date: Date;
  duration: string;
  isLive: boolean;
  credits: number;
  participants: number;
  thumbnailUrl: string;
  category: WebinarCategory;
  tags: string[];
  price?: number;
  isUpcoming?: boolean;
  isNotificationEnabled?: boolean;
  cardType?: 'blue-medical' | 'green-medical' | 'live-video' | 'default';
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatarUrl: string;
  bio?: string;
}

export enum WebinarCategory {
  GENERAL = 'general',
  CARDIOLOGY = 'cardiology',
  RESPIRATORY = 'respiratory',
  PEDIATRICS = 'pediatrics',
  INTERNAL_MEDICINE = 'internal_medicine'
}

export interface WebinarFilter {
  category?: WebinarCategory;
  isLive?: boolean;
  isUpcoming?: boolean;
  searchTerm?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
