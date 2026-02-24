import Box from "@/components/box";
import CreateHabit from "@/components/ui/create-habit";

export default function CreateScreen() {
  return (
    <Box backgroundColor={"mainBackground"} flex={1} justifyContent={"center"}>
      <CreateHabit />
    </Box>
  );
}
