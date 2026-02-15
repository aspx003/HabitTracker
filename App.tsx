import { StatusBar } from "expo-status-bar";

// Database
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

// Query client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";

// Theming
import { ThemeProvider } from "@shopify/restyle";
import { lightTheme, darkTheme } from "./theme";
import { useColorScheme } from "react-native";

// Database setup
const expo = SQLite.openDatabaseSync("user.db");
export const db = drizzle(expo);

// Query Client setup
const client = new QueryClient();

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const colorScheme = useColorScheme();

  // console.log({ success, error });

  return (
    <NavigationContainer>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={darkTheme}>
          <RootNavigator />
        </ThemeProvider>
        <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
