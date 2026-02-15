import React from "react";
import Box from "@/components/box";
import ThemedText from "@/components/themed-text";
import { useNameStore } from "@/stores/nameStore";

export default function HomeScreen() {
  const name = useNameStore((state) => state.name);

  return (
    <Box backgroundColor={"mainBackground"} flex={1}>
      <ThemedText variant={"subheader"}>Good Morning</ThemedText>
      <ThemedText variant={"header"}>{name}</ThemedText>
    </Box>
  );
}
