import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Location">;

export default function LocationScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function request() {
    setError(null);
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied. You can still use lists later, but navigation needs location.");
        setLoading(false);
        return;
      }

      // Warm up GPS once (optional now, useful later)
      await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });

      navigation.replace("Home");
    } catch (e) {
      setError("Could not access location. Please try again.");
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Enable location</Text>
      <Text style={{ opacity: 0.8 }}>
        UCG uses your location to find the nearest open pharmacy or available ER clinic.
      </Text>

      {error ? <Text style={{ color: "crimson" }}>{error}</Text> : null}

      <Pressable
        onPress={request}
        disabled={loading}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" }}>
            Allow Location
          </Text>
        )}
      </Pressable>
    </View>
  );
}
