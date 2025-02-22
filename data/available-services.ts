export interface Service {
  value: string;
  label: string;
  category: string;
}

export const availableServices: Service[] = [
  {
    value: "netflix",
    label: "Netflix",
    category: "Streaming",
  },
  {
    value: "spotify",
    label: "Spotify",
    category: "Music",
  },
  {
    value: "patreon",
    label: "Patreon",
    category: "Subscription",
  },
  {
    value: "amazon-prime",
    label: "Amazon Prime",
    category: "Streaming",
  },
  {
    value: "hbo-max",
    label: "HBO Max",
    category: "Streaming",
  },
  {
    value: "apple-tv+",
    label: "Apple TV+",
    category: "Streaming",
  },
  {
    value: "youtube-premium",
    label: "YouTube Premium",
    category: "Streaming",
  },
  {
    value: "apple-music",
    label: "Apple Music",
    category: "Music",
  },
  {
    value: "youtube-music",
    label: "YouTube Music",
    category: "Music",
  },
  {
    value: "tidal",
    label: "Tidal",
    category: "Music",
  },
  {
    value: "dropbox",
    label: "Dropbox",
    category: "Storage",
  },
  {
    value: "google-one",
    label: "Google One",
    category: "Storage",
  },
  {
    value: "icloud+",
    label: "iCloud+",
    category: "Storage",
  },
  {
    value: "playstation-plus",
    label: "PlayStation Plus",
    category: "Gaming",
  },
  {
    value: "medium",
    label: "Medium",
    category: "Content",
  },
  {
    value: "substack",
    label: "substack",
    category: "Content",
  },
  {
    value: "notion",
    label: "Notion",
    category: "Productivity",
  },
  {
    value: "canva-pro",
    label: "Canva Pro",
    category: "Productivity",
  },
  {
    value: "grammarly",
    label: "Grammarly",
    category: "Productivity",
  },
];

export const billingCycles = [
  { value: "Monthly", label: "Monthly", days: 30 },
  { value: "Quarterly", label: "Quarterly", days: 90 },
  { value: "Yearly", label: "Yearly", days: 365 },
];
