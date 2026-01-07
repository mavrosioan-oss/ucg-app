import React from "react";
import { View, Text, Pressable, Alert, Platform, Linking } from "react-native";
import { useLocationState } from "../state/LocationContext";
import { MOCK_PHARMACIES } from "../data/mockPharmacies";
import { distanceMeters } from "../lib/geo";

function openMapsDirections(lat: number, lng: number, label?: string) {
  // Apple Maps vs Google Maps handling (simple + reliable)
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
    android: `google.navigation:q=${lat},${lng}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
  });

  if (!url) return;

  Linking.openURL(url).catch(() => {
    Alert.alert("Could not open maps", "Please make sure you have a maps app installed.");
  });
}

export default function HomeScreen() {
  const { coords } = useLocationState();

  function driveToNearestPharmacy() {
    if (!coords) {
      Alert.alert("Location not available", "Please enable location first.");
      return;
    }

    let best = MOCK_PHARMACIES[0];
    let bestDist = Number.POSITIVE_INFINITY;

    for (const p of MOCK_PHARMACIES) {
      const d = distanceMeters(coords, { latitude: p.latitude, longitude: p.longitude });
      if (d < bestDist) {
        bestDist = d;
        best = p;
      }
    }

    openMapsDirections(best.latitude, best.longitude, best.name);
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Where to?</Text>

      <Pressable
        onPress={driveToNearestPharmacy}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
          Drive me to the nearest pharmacy
        </Text>
      </Pressable>

      <Pressable
        onPress={() => Alert.alert("Next", "We’ll wire ER next.")}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
          Drive me to the nearest ER
        </Text>
      </Pressable>
    </View>
  );
}
