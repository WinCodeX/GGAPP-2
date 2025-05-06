import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import api from '../../lib/api'; // Adjust if needed

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        user: { email, password },
      });

      const token: string | undefined = response.data?.token;
      if (token) {
        await AsyncStorage.setItem('auth_token', token);
        console.log('✅ Login successful:', token);

        router.replace('/'); // Send user to the Home screen
      } else {
        throw new Error('Token not found');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setErrorMsg('Invalid credentials');
    }
  };

  const navigateToSignup = () => {
    router.push('../../auth/signup'); // New signup page route
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GG4App-2 Login</Text>

      <TextInput
        label="Email"
        mode="flat"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{
          colors: {
            text: '#fff',
            placeholder: '#aaa',
            background: '#111',
            primary: '#a78bfa',
          },
        }}
      />

      <TextInput
        label="Password"
        mode="flat"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(prev => !prev)}
            color="#aaa"
          />
        }
        theme={{
          colors: {
            text: '#fff',
            placeholder: '#aaa',
            background: '#111',
            primary: '#a78bfa',
          },
        }}
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
      >
        Log In
      </Button>

      <Button
        onPress={navigateToSignup}
        textColor="#a78bfa"
      >
        Don't have an account? Sign up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#111',
  },
  button: {
    backgroundColor: '#a78bfa',
    marginTop: 8,
    padding: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});
