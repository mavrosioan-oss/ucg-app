import React, { createContext, useContext, useMemo, useState } from "react";

export type LatLng = { latitude: number; longitude: number };

type LocationState = {
  coords: LatLng | null;
  setCoords: (c: LatLng | null) => void;
};

const Ctx = createContext<LocationState | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<LatLng | null>(null);

  const value = useMemo(() => ({ coords, setCoords }), [coords]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocationState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLocationState must be used within LocationProvider");
  return v;
}
