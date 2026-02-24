import { StatusBar } from "expo-status-bar";
// Database init
import { db } from "@/db/db";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";

// Theming
import { ThemeProvider } from "@shopify/restyle";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
enableReactTracking({
  auto: true,
});

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
        <RootNavigator />
      </ThemeProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </NavigationContainer>
  );
}
