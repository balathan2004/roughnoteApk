import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { styles } from "@/styles/global.css";
import DocDataHolder from "@/src/components/context/doc_wrapper";
import ContextWrapper from "@/src/components/context/context_wrapper";
import { Provider } from "react-redux";
import { store } from "@/src/redux/store";
import Router from "./src/router/Router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Provider store={store}>
        <ThemeProvider value={DarkTheme}>
          <SafeAreaView style={styles.safearea}>
            <DocDataHolder>
              <ContextWrapper>
                <Router/>
              </ContextWrapper>
            </DocDataHolder>

            <StatusBar style="auto" />
          </SafeAreaView>
        </ThemeProvider>
      </Provider>
    </PaperProvider>
  );
}
