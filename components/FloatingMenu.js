import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
//import CreatePackageModal from './CreatePackageModal'; // We'll build this next

const FloatingMenu = ({ navigation, userRole }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onStateChange = ({ open }) => setOpen(open);

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
          color="#fff"
          backdropColor="rgba(0,0,0,0.5)"
          style={styles.fab}
          actions={[
            {
              icon: 'package-variant',
              label: 'Create Package',
              onPress: () => setShowModal(true),
              visible: ['admin', 'agent'].includes(userRole)
            },
            {
              icon: 'map-marker-path',
              label: 'Track Package',
              onPress: () => navigation.navigate('TrackScreen')
            },
            {
              icon: 'message-text',
              label: 'Chat',
              onPress: () => navigation.navigate('ChatScreen')
            },
            {
              icon: 'briefcase-outline',
              label: 'Business Request',
              onPress: () => navigation.navigate('BusinessScreen'),
              visible: userRole === 'client'
            }
          ]}
          onStateChange={onStateChange}
          visible
        />

        <CreatePackageModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log("Submit to API later:", data);
            setShowModal(false);
          }}
        />
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1d9bf0'
  }
});

export default FloatingMenu;
