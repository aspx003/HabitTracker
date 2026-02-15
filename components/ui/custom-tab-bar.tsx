import { Theme } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { Dimensions, Pressable } from "react-native";
import Box from "../box";

const { width: screenWidth } = Dimensions.get("window");

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme<Theme>();

  return (
    <Box justifyContent="center" alignItems="center">
      <Box
        backgroundColor="surface"
        height={60}
        width={screenWidth - 200}
        borderRadius={30}
        flexDirection="row"
        overflow="hidden"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
        elevation={5}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = getIconName(route.name);

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                width={40}
                height={40}
                borderRadius={20}
                backgroundColor={isFocused ? "primary" : "surface"}
                justifyContent="center"
                alignItems="center"
                marginBottom="xs"
              >
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isFocused ? "white" : theme.colors.iconDefault}
                />
              </Box>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
}

const getIconName = (path: string) => {
  switch (path) {
    case "Home":
      return "home";
    case "Create":
      return "add-circle";
    case "Settings":
      return "settings";
    default:
      return "home";
  }
};
