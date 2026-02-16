import { getHours } from "date-fns";

export const useGreeting = () => {
  const hour = getHours(new Date());
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};
