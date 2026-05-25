export interface DemoWebsite {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  accentClass: string;
  tagline: string;
  features: string[];
  url?: string;
  mockPages: {
    [key: string]: {
      title: string;
      content: any;
    };
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
