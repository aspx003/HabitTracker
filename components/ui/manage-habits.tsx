import React from "react";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HABIT_KEY } from "@/constants/storage-constants";
import { deleteHabit, getAllHabits } from "@/utils/habits";
import Box from "../box";
import { FlashList } from "@shopify/flash-list";
import ThemedText from "../themed-text";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ManageHabits() {
  const queryClient = useQueryClient();
  const theme = useTheme<Theme>();

  const habits = useQuery({
    queryKey: [HABIT_KEY],
    queryFn: getAllHabits,
  });

  const habitsMuation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [HABIT_KEY],
      });
    },
  });

  return (
    <Box flex={1}>
      <FlashList
        data={habits.data}
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
            <Pressable onPress={() => habitsMuation.mutate({ id: item.id })}>
              <AntDesign name="delete" size={24} color={theme.colors.alert} />
            </Pressable>
          </Box>
        )}
      />
    </Box>
  );
}
