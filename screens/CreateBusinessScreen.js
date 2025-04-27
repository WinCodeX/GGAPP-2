import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CreateBusinessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CreateBusinessScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b26',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#f8f8f2',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
