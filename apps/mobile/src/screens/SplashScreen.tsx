import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/AppNavigator";
import { getAcceptedTerms } from "../lib/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    (async () => {
      const accepted = await getAcceptedTerms();
      navigation.replace(accepted ? "Location" : "Terms");
    })();
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>UCG</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>Quick relief</Text>
    </View>
  );
}
