import React, { useState } from "react";
import { View, Text, Pressable, Alert, ActivityIndicator, Platform, Linking } from "react-native";
import { useLocationState } from "../state/LocationContext";
import { distanceMeters } from "../lib/geo";
import { fetchOpenPharmacies, Pharmacy } from "../lib/api";

function openMapsDirections(lat: number, lng: number) {
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
  const [loading, setLoading] = useState(false);

  async function driveToNearestPharmacy() {
    if (!coords) {
      Alert.alert("Location not available", "Please enable location first.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchOpenPharmacies(coords.latitude, coords.longitude);
      const pharmacies = data.pharmacies;

      if (!pharmacies?.length) {
        Alert.alert("No pharmacies found", "Try again in a moment.");
        return;
      }

      let best: Pharmacy = pharmacies[0];
      let bestDist = Number.POSITIVE_INFINITY;

      for (const p of pharmacies) {
        const d = distanceMeters(coords, { latitude: p.latitude, longitude: p.longitude });
        if (d < bestDist) {
          bestDist = d;
          best = p;
        }
      }

      openMapsDirections(best.latitude, best.longitude);
    } catch (e: any) {
      Alert.alert(
        "Could not load pharmacies",
       e?.message ??
          "Check that the API is running and your phone is on the same Wi-Fi as your PC."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Where to?</Text>

      <Pressable
        onPress={driveToNearestPharmacy}
        disabled={loading}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            Drive me to the nearest pharmacy
          </Text>
        )}
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
