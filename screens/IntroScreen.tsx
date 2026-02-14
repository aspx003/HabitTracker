import Button from "@/components/themed-button";
import ThemedInput from "@/components/themed-input";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedText from "@/components/themed-text";
import { USERNAME } from "@/constants/storage-constants";
import { useNameStore } from "@/stores/nameStore";
import { RootStackParamList } from "@/types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";

type IntroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function IntroScreen() {
  const [name, setName] = useState("");
  const setUserName = useNameStore((state) => state.setName);
  const navigation = useNavigation<IntroScreenNavigationProp>();

  const handleSetName = async () => {
    if (!name) {
      Alert.alert("Please enter your name before proceeding");
      return;
    }

    await AsyncStorage.setItem(USERNAME, name);
    navigation.reset({
      index: 0,
      routes: [{ name: "Tabs" }],
    });
    setUserName(name);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText variant={"header"}>HabiTrack</ThemedText>
      <ThemedText variant={"body"}>
        Track all your habits in one place.{"\n"}
        Be a better person than tommorrow.
      </ThemedText>
      <ThemedInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button onPress={handleSetName} label="Get Started" />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
});
