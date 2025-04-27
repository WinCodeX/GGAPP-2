import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const customDarkTheme = {
    dark: true,
    colors: {
      primary: '#a78bfa',
      background: '#000',
      text: '#fff',
      placeholder: '#aaa',
    },
  };

  return (
    <PaperProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </PaperProvider>
  );
}
