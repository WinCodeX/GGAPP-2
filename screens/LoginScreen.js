import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        user: { email, password },
      });

      const token = response.data?.token;
      if (token) {
        await AsyncStorage.setItem('auth_token', token);
        console.log('✅ Login successful:', token);

navigation.reset({
  index: 0,
  routes: [{ name: 'Main' }], // Ensure 'Main' matches the registered route name
});
      } else {
        throw new Error('Token not found');
      }

// Removed erroneous and unnecessary lines
    } catch (error) {
      console.error('❌ Login error:', error);
      setErrorMsg('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GG4App Login</Text>

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
            primary: '#a78bfa'
          }
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
            primary: '#a78bfa'
          }
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
        onPress={() => navigation.navigate('Signup')}
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
    backgroundColor: '#a78bfa', // Light purple
    marginTop: 8,
    padding: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});
