export interface ProgramShow {
  id: string;
  title: string;
  host: string;
  timeSlot: string;
  startHour: number;
  endHour: number;
  days: string;
  description: string;
  image: string;
  tags: string[];
  borderColor?: string;
  iconClass?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  statusCategory?: string;
  highlightText?: string;
  isWeekend?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  source: string;
  badgeColor: string;
  date: string;
  image: string;
  url: string;
  isExternal: boolean;
}

export interface StreamOption {
  id: string;
  name: string;
  url: string;
  bitrate: string;
  format: string;
  description: string;
  isCustom?: boolean;
}

export interface RadioStationConfig {
  name: string;
  slogan: string;
  description: string;
  city: string;
  country: string;
  website: string;
  casterUrl: string;
  phone: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  email?: string;
  social: {
    facebook: string;
    instagram: string;
    tiktok?: string;
    whatsapp: string;
    website: string;
  };
  apkDownloadUrl?: string;
  defaultStreamUrl: string;
  backupStreams: StreamOption[];
  programs: ProgramShow[];
  news: NewsItem[];
}

export type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'reconnecting' | 'error';
