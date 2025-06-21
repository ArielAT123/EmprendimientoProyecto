// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/views/login/LoginScreen';
import HomeScreen from './src/views/home/HomeScreen';
import RegisterScreen from './src/views/registro/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}  // Oculta el header en Login
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}  // Título del header
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}  // Puedes cambiar esto a tu pantalla de registro
          options={{ title: 'Registro' }}  // Título del header para registro
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}