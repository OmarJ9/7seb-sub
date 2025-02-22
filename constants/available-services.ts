export interface Service {
  value: string;
  category: string;
  initials: string;
}

export const brandColors: Record<string, string> = {
  // Streaming
  netflix: "bg-[#E50914]",
  "disney+": "bg-[#113CCF]", // Assigned a blue tone for Disney+
  "prime video": "bg-[#00A8E1]", // Using Amazon Prime’s blue for Prime Video
  "hbo max": "bg-[#A615DE]",
  "apple tv+": "bg-black",

  // Music
  spotify: "bg-[#1DB954]",
  "apple music": "bg-[#FA243C]",

  // Storage
  dropbox: "bg-[#0061FF]",
  "google drive": "bg-[#4285F4]",
  "icloud+": "bg-[#3693F3]",
  mega: "bg-[#FF4500]", // Custom color for Mega

  // Gaming
  "xbox game pass": "bg-[#107C10]",
  "playstation plus": "bg-[#0070D1]",
  "google stadia": "bg-[#8E24AA]", // Custom purple for Stadia

  // Productivity
  notion: "bg-black",
  canva: "bg-[#00C4CC]",

  // AI
  chatgpt: "bg-[#10A37F]", // Custom teal for ChatGPT
  claude: "bg-[#FF7F50]", // Custom coral for Claude
  gemini: "bg-[#6C63FF]", // Custom violet for Gemini
};

export const availableServices: Service[] = [
  { value: "Netflix", category: "Streaming", initials: "N" },
  { value: "Disney+", category: "Streaming", initials: "D+" },
  { value: "Prime Video", category: "Streaming", initials: "P" },
  { value: "HBO Max", category: "Streaming", initials: "HM" },
  { value: "Apple TV+", category: "Streaming", initials: "TV+" },
  { value: "Spotify", category: "Music", initials: "S" },
  { value: "Apple Music", category: "Music", initials: "M" },
  { value: "Dropbox", category: "Storage", initials: "DB" },
  { value: "Google Drive", category: "Storage", initials: "GD" },
  { value: "iCloud+", category: "Storage", initials: "IC" },
  { value: "Mega", category: "Storage", initials: "M" },
  { value: "Xbox Game Pass", category: "Gaming", initials: "GP" },
  { value: "PlayStation Plus", category: "Gaming", initials: "PS+" },
  { value: "Google Stadia", category: "Gaming", initials: "GS" },
  { value: "Notion", category: "Productivity", initials: "N" },
  { value: "Canva", category: "Productivity", initials: "C" },
  { value: "ChatGPT", category: "AI", initials: "GPT" },
  { value: "Claude", category: "AI", initials: "CL" },
  { value: "Gemini", category: "AI", initials: "G" },
];

export const billingCycles = [
  { value: "Monthly", label: "Monthly", days: 30 },
  { value: "Quarterly", label: "Quarterly", days: 90 },
  { value: "Yearly", label: "Yearly", days: 365 },
];
