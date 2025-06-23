// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompanyScreen from './src/views/company/CompanyScreen';
import HomeScreen from './src/views/home/HomeScreen';
import RegisterScreen from './src/views/registro/RegisterScreen';
import TabNavigatorTrabajadores from './src/navigation/tabNavigationTrabajadores';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' , headerShown: false}}  // Título del header
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}  // Puedes cambiar esto a tu pantalla de registro
          options={{ title: 'Registro' }}  // Título del header para registro
        />
        <Stack.Screen name="TrabajadorTabs" component={TabNavigatorTrabajadores}  options={{headerShown: false}}/>
        <Stack.Screen name="CompanyScreen" component={CompanyScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}