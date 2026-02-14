import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import React from "react";

const ThemedSafeAreaView: React.FC<
  React.ComponentProps<typeof SafeAreaView>
> = ({ style, children, ...props }) => {
  const theme = useTheme<Theme>();
  return (
    <SafeAreaView
      style={[
        {
          paddingHorizontal: theme.spacing.l,
          backgroundColor: theme.colors.mainBackground,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export default ThemedSafeAreaView;
