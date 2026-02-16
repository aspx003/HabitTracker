import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import ThemedText from "../themed-text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import Box from "../box";

type TabProps = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  data: {
    name: string;
    child: React.ReactNode;
  }[];
};

export function Tab({ index, setIndex, data }: TabProps) {
  const theme = useTheme<Theme>();

  return (
    <>
      <Box
        marginTop={"s"}
        flexDirection={"row"}
        justifyContent={"space-around"}
        padding={"s"}
        backgroundColor={"surface"}
        width={300}
        borderRadius={20}
      >
        {data.map((tab, i) => (
          <Pressable key={i} onPress={() => setIndex(i)}>
            <Box
              backgroundColor={i === index ? "primary" : "surface"}
              paddingHorizontal={"m"}
              paddingVertical={"s"}
              borderRadius={15}
            >
              <ThemedText
                color={i === index ? "textPrimary" : "textSecondary"}
                variant={"subheader"}
              >
                {tab.name}
              </ThemedText>
            </Box>
          </Pressable>
        ))}
      </Box>
    </>
  );
}

type TabDisplayProps = {
  index: number;
  data: {
    name: string;
    child: React.ReactNode;
  }[];
};

export function TabDisplay({ index, data }: TabDisplayProps) {
  return data[index].child;
}
