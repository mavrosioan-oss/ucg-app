import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/AppNavigator";
import { setAcceptedTerms } from "../lib/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Terms">;

export default function TermsScreen({ navigation }: Props) {
  async function accept() {
    await setAcceptedTerms(true);
    navigation.replace("Location");
  }

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>Terms & Conditions</Text>

      <ScrollView style={{ marginTop: 12 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={{ lineHeight: 20, opacity: 0.8 }}>
          {/* MVP placeholder – we’ll replace with your real terms later */}
          By using UCG, you agree that the app provides navigation assistance and does not replace
          professional medical advice. In emergencies, call your local emergency number.
        </Text>
      </ScrollView>

      <Pressable
        onPress={accept}
        style={{ padding: 16, borderRadius: 12, backgroundColor: "#111" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" }}>
          I Accept
        </Text>
      </Pressable>
    </View>
  );
}
