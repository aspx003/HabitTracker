import Box from "@/components/box";
import { Tab, TabDisplay } from "@/components/ui/tabbed-view";
import { useState } from "react";
import CreateHabit from "@/components/ui/create-habit";
import CreateCategory from "@/components/ui/create-category";

const data = [
  {
    name: "Habit",
    child: <CreateHabit />,
  },
  {
    name: "Category",
    child: <CreateCategory />,
  },
];

export default function CreateScreen() {
  const [index, setIndex] = useState(0);

  return (
    <Box backgroundColor={"mainBackground"} flex={1}>
      <Box alignItems={"center"} marginBottom={"m"}>
        <Tab index={index} setIndex={setIndex} data={data} />
      </Box>
      <TabDisplay index={index} data={data} />
    </Box>
  );
}
