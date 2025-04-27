import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ route, navigation }) {
    const { name: initialName = '', avatar: initialAvatar = null } = route?.params || {};

    const [name, setName] = useState(initialName);
    const [avatar, setAvatar] = useState(initialAvatar);
    

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
    }
  };

  const handleSave = () => {
    // Update user info here (API or local)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={avatar ? { uri: avatar } : require('../assets/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Enter your name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        mode="outlined"
        outlineColor="#444"
        activeOutlineColor="#bd93f9" // Dracula purple
        style={styles.input}
        theme={{
          colors: {
            text: '#f8f8f2',
            placeholder: '#6272a4',
            background: '#282a36',
            primary: '#bd93f9'
          }
        }}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={handleSave}
          style={styles.saveButton}
        >
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1b26', // Dracula base
    flex: 1,
    padding: 24,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#bd93f9',
    borderRadius: 20,
    padding: 8,
  },
  cameraIcon: {
    fontSize: 18,
    color: '#282a36',
  },
  label: {
    color: '#f8f8f2',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#282a36',
    color: '#f8f8f2',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelText: {
    color: '#ff5555',
    fontSize: 16,
    marginTop: 12,
  },
  saveButton: {
    backgroundColor: '#bd93f9',
  },
});
