import React from "react";
import { View, Text, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Where to?</Text>

      <Pressable
        onPress={() => console.log("Nearest pharmacy")}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
          Drive me to the nearest pharmacy
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.log("Nearest ER")}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
          Drive me to the nearest ER
        </Text>
      </Pressable>
    </View>
  );
}
