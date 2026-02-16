import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Box from "@/components/box";
import ThemedText from "@/components/themed-text";
import { Tab, TabDisplay } from "@/components/ui/tabbed-view";
import ManageCategory from "@/components/ui/manage-category";
import ManageHabits from "@/components/ui/manage-habits";

const data = [
  {
    name: "Habit",
    child: <ManageHabits />,
  },
  {
    name: "Category",
    child: <ManageCategory />,
  },
];

export default function SettingsScreen() {
  const [index, setIndex] = useState(0);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <ThemedText variant={"header"}>Settings</ThemedText>
      <Box alignItems={"center"} marginBottom={"m"}>
        <Tab index={index} setIndex={setIndex} data={data} />
      </Box>
      <TabDisplay index={index} data={data} />
    </Box>
  );
}

const styles = StyleSheet.create({});
