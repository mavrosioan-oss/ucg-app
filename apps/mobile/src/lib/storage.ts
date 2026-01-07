import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  acceptedTerms: "ucg.acceptedTerms.v1",
} as const;

export async function getAcceptedTerms(): Promise<boolean> {
  const v = await AsyncStorage.getItem(KEYS.acceptedTerms);
  return v === "true";
}

export async function setAcceptedTerms(value: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.acceptedTerms, value ? "true" : "false");
}
