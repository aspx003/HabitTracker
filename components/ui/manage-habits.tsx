import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import Box from "../box";
import { FlashList } from "@shopify/flash-list";
import ThemedText from "../themed-text";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "@legendapp/state/react";
import { Habit, habitStore } from "@/stores/habitStore";

export default function ManageHabits() {
  const theme = useTheme<Theme>();

  const todayHabits = useSelector(habitStore.todayHabits);
  const isLoading = useSelector(habitStore.isLoading);
  const error = useSelector(habitStore.error);

  return (
    <Box flex={1} marginTop={"m"}>
      {
        todayHabits?.length === 0 && (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <ThemedText variant={"body"}>No habits found</ThemedText>
          </Box>
        )
      }
      {
        !isLoading && todayHabits && todayHabits.length > 0 && <FlashList
          data={todayHabits as Habit[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box
              backgroundColor={"surface"}
              padding={"m"}
              marginVertical={"s"}
              borderRadius={10}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <ThemedText variant={"subheader"}>{item.name}</ThemedText>
                <ThemedText variant={"caption"}>{item.description}</ThemedText>
              </Box>
              <Pressable onPress={() => habitStore.storeDeleteHabit(item.id)}>
                <AntDesign name="delete" size={24} color={theme.colors.alert} />
              </Pressable>
            </Box>
          )}
        />
      }
    </Box>
  );
}
