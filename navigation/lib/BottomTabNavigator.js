import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TrackScreen from '../screens/TrackScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#1e1e2f', borderTopColor: '#44475a' },
        tabBarActiveTintColor: '#bd93f9',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Track') iconName = focused ? 'cube' : 'cube-outline';
          else if (route.name === 'Chat') iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Account') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
