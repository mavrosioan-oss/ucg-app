export type Pharmacy = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
};

// MVP mock — Athens center-ish (replace later with real scraping/backend)
export const MOCK_PHARMACIES: Pharmacy[] = [
  { id: "p1", name: "Pharmacy A (Syntagma)", latitude: 37.9755, longitude: 23.7348 },
  { id: "p2", name: "Pharmacy B (Monastiraki)", latitude: 37.9763, longitude: 23.7257 },
  { id: "p3", name: "Pharmacy C (Omonia)", latitude: 37.9842, longitude: 23.7286 },
];
