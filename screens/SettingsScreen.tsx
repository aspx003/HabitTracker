import Box from "@/components/box";
import ThemedText from "@/components/themed-text";
import ManageHabits from "@/components/ui/manage-habits";

export default function SettingsScreen() {
  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <ThemedText variant={"header"}>Manage Habits</ThemedText>
      <ManageHabits />
    </Box>
  );
}
