export type Pharmacy = {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  source?: string;
};

const API_BASE = "http://192.168.2.13:4000";

async function fetchWithTimeout(url: string, ms: number) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

export async function fetchOpenPharmacies(lat: number, lng: number) {
  const url = `${API_BASE}/pharmacies/open?lat=${lat}&lng=${lng}`;
  const res = await fetchWithTimeout(url, 8000);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return (await res.json()) as {
    updatedAt: string;
    count: number;
    pharmacies: Pharmacy[];
  };
}
