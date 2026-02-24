import ThemedLoadingScreen from "@/components/themed-loading-screen";
import { USERNAME } from "@/constants/storage-constants";
import IntroScreen from "@/screens/IntroScreen";
import { useNameStore } from "@/stores/nameStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const setUserName = useNameStore((state) => state.setName);
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<"Tabs" | "Home">("Home");

  // Checking if first time user or not
  useEffect(() => {
    const checkName = async () => {
      try {
        const value = await AsyncStorage.getItem(USERNAME);
        if (value) {
          setUserName(value);
          setInitialRoute("Tabs");
        }
      } catch (error) {
        setInitialRoute("Home");
      } finally {
        setIsLoading(false);
      }
    };

    checkName();
  }, []);

  // TODO: Add a loading screen
  if (isLoading) {
    return <ThemedLoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="Home" component={IntroScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
