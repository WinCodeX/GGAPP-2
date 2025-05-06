import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import api from '../../lib/api';
import Images from '../../assets'; // Centralized image registry

interface User {
  name: string;
  avatar: string | null;
}

export default function AccountScreen() {
  const [user, setUser] = useState<User>({ name: '', avatar: null });
  const [editingName, setEditingName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        if (!token) return;
        const res = await api.get('/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setNewName(res.data.name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdateName = async () => {
    try {
      setUpdating(true);
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) return;
      await api.put('/me', { name: newName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prev) => ({ ...prev, name: newName }));
      setEditingName(false);
    } catch (error) {
      console.error('Failed to update name:', error);
    } finally {
      setUpdating(false);
    }
  };

  const pickImageAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const filename = uri.split('/').pop() || 'image.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image';

        const formData = new FormData();
        const blob = await (await fetch(uri)).blob();
        formData.append('avatar', {
          uri,
          name: filename,
          type,
        } as any);

        const token = await AsyncStorage.getItem('auth_token');
        if (!token) return;

        const response = await fetch('http://192.168.1.100:3000/api/v1/me', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const data = await response.json();
        if (data.avatar_url) {
          setUser((prev) => ({ ...prev, avatar: data.avatar_url }));
        }
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
      router.replace('../../auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <TouchableOpacity onPress={pickImageAndUpload}>
        <Image
          source={user.avatar ? { uri: user.avatar } : Images.avatarPlaceholder}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Username Section */}
      {!editingName ? (
        <>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>Delivering made easy.</Text>
          <TouchableOpacity onPress={() => setEditingName(true)}>
            <Text style={styles.edit}>Edit Name</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            mode="outlined"
            outlineColor="#44475a"
            activeOutlineColor="#bd93f9"
            style={styles.input}
            theme={{
              colors: {
                text: '#f8f8f2',
                background: '#282a36',
                placeholder: '#6272a4',
                primary: '#bd93f9',
              },
            }}
          />
          <Button
            mode="contained"
            onPress={handleUpdateName}
            loading={updating}
            style={styles.saveButton}
          >
            Save
          </Button>
        </>
      )}

      {/* Business CTA */}
      <TouchableOpacity style={styles.businessButton}>
        <Text style={styles.businessText}>CREATE BUSINESS PROFILE</Text>
      </TouchableOpacity>

      {/* Action List */}
      <View style={styles.section}>
        <AccountRow title="Edit Profile" onPress={() => router.push('/edit-profile')} />
        <AccountRow title="Payment" onPress={() => console.log('Payment pressed')} />
        <AccountRow title="Subscription" onPress={() => console.log('Subscription pressed')} />
        <AccountRow title="Log Out" logout onPress={handleLogout} />
      </View>
    </View>
  );
}

interface AccountRowProps {
  title: string;
  logout?: boolean;
  onPress?: () => void;
}

function AccountRow({ title, logout = false, onPress }: AccountRowProps) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Text style={[styles.rowText, logout && { color: '#ff5555' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b26',
    alignItems: 'center',
    paddingTop: 48,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#bd93f9',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f8f8f2',
  },
  subtitle: {
    color: '#6272a4',
    marginBottom: 16,
  },
  edit: {
    color: '#bd93f9',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#bd93f9',
    width: '60%',
    marginBottom: 20,
  },
  businessButton: {
    backgroundColor: '#282a36',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 24,
  },
  businessText: {
    color: '#bd93f9',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  section: {
    width: '90%',
  },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#44475a',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    color: '#f8f8f2',
    fontSize: 16,
  },
});