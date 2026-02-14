import { StyleSheet } from "react-native";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedText from "@/components/themed-text";
import { useNameStore } from "@/stores/nameStore";

export default function CreateScreen() {
  const name = useNameStore((state) => state.name);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText variant={"subheader"}>Good Morning</ThemedText>
      <ThemedText variant={"header"}>{name}</ThemedText>
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
