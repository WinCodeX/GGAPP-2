import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import TrackScreen from '../screens/TrackScreen';
import ChatScreen from '../screens/ChatScreen';
import BottomTabNavigator from './BottomTabNavigator';
import EditProfileScreen from '../screens/EditProfileScreen';
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthLoading">
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="TrackScreen" component={TrackScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
