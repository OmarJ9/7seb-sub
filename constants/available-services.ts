export interface Service {
  value: string;
  category: string;
  image: string;
}

export const availableServices: Service[] = [
  { value: "Netflix", category: "Streaming", image: "/netflix.svg" },
  { value: "Spotify", category: "Music", image: "/spotify.svg" },
  { value: "Dropbox", category: "Storage", image: "/dropbox.svg" },
  { value: "Google Drive", category: "Storage", image: "/drive.svg" },
  { value: "iCloud+", category: "Storage", image: "/icloud.svg" },
  { value: "Mega", category: "Storage", image: "/mega.svg" },
  { value: "Xbox Game Pass", category: "Gaming", image: "/xbox.svg" },
  { value: "PlayStation Plus", category: "Gaming", image: "/playstation.svg" },
  { value: "Notion", category: "Productivity", image: "/notion.svg" },
  { value: "ChatGPT", category: "AI", image: "/chatgpt.svg" },
];

export const billingCycles = [
  { value: "Monthly", label: "Monthly", days: 30 },
  { value: "Quarterly", label: "Quarterly", days: 90 },
  { value: "Yearly", label: "Yearly", days: 365 },
];
