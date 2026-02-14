import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const FIRST_TIME_KEY = "firstTime";

export function useFirstTime() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const value = await AsyncStorage.getItem(FIRST_TIME_KEY);
        setIsFirstTime(value === null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsFirstTime(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkFirstTime();
  }, []);

  const setIntroSeen = async () => {
    try {
      if (isFirstTime) {
        console.log("setting value to be true");
        // await AsyncStorage.setItem(FIRST_TIME_KEY, "true");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isLoading, isFirstTime, setIntroSeen };
}
