import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const messages = [
  {
    id: '1',
    name: 'Customer Support',
    message: 'We will assist you shortly',
    time: '',
    ticket: true,
    avatar: require('../assets/support.png'), // Placeholder or use a default
  },
  {
    id: '2',
    name: 'Sophia',
    message: 'Okay, see you then.',
    time: '9:30',
    avatar: require('../assets/sophia.jpg'),
  },
  {
    id: '3',
    name: 'Lucas Boyd',
    message: 'Sounds good!',
    time: '8:15',
    avatar: require('../assets/lucas.jpg'),
  },
  {
    id: '4',
    name: 'Ethan',
    message: 'Thank you!',
    time: 'Yesterday',
    avatar: require('../assets/ethan.jpg'),
  },
  {
    id: '5',
    name: 'Olivia King',
    message: 'Have a nice day! 😊',
    time: 'Yesterday',
    avatar: require('../assets/olivia.jpg'),
  },
];

export default function ChatScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#282a36', paddingHorizontal: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 0.5,
              borderColor: '#44475a',
            }}
          >
            <Image
              source={item.avatar}
              style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#f8f8f2', fontWeight: 'bold', fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: '#bd93f9', fontSize: 14 }}>{item.message}</Text>
            </View>
            <View>
              {item.ticket ? (
                <View
                  style={{
                    backgroundColor: '#50fa7b',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 12 }}>TICKET</Text>
                </View>
              ) : (
                <Text style={{ color: '#888', fontSize: 12 }}>{item.time}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

