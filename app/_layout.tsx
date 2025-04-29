import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Simulated auth check (replace with your real auth logic)
function useAuth() {
  const [user, setUser] = useState<null | object>(null);

  // Simulate fetching user login status (you should replace this with real logic)
  useEffect(() => {
    const fetchUser = async () => {
      // simulate API call or check asyncStorage
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null); // set to null if not logged in, or an object if logged in
    };
    fetchUser();
  }, []);

  return { user };
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (user === null) {
    // User is NOT logged in, redirect to login page
    return <Redirect href="/auth/login" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}