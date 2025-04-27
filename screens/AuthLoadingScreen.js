import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('auth_token');

      if (!token) {
        navigation.replace('Login');
        return;
      }

      try {
        // Validate token by calling a protected route
        await api.get('/packages', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Token is valid → Navigate to BottomTabNavigator (Main)
        navigation.replace('Main');
      } catch (error) {
        // ❌ Token invalid/expired → clear it and send to Login
        await AsyncStorage.removeItem('auth_token');
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1d9bf0" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;
