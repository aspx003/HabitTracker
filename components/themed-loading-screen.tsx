import { ActivityIndicator } from "react-native";
import React from "react";
import Box from "./box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";

export default function ThemedLoadingScreen() {
  const theme = useTheme<Theme>();

  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"mainBackground"}
    >
      <ActivityIndicator size={"large"} color={theme.colors.primary} />
    </Box>
  );
}
