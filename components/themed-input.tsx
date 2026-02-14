import { TextInput } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import React from "react";

const ThemedInput: React.FC<React.ComponentProps<typeof TextInput>> = ({
  style,
  children,
  ...props
}) => {
  const theme = useTheme<Theme>();
  return (
    <TextInput
      placeholderTextColor={theme.colors.textSecondary}
      style={[
        {
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: 10,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedInput;
