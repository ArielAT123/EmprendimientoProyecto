import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompanyScreen from './src/views/company/CompanyScreen';
import HomeScreen from './src/views/home/HomeScreen';
import RegisterScreen from './src/views/registro/RegisterScreen';
import TabNavigatorTrabajadores from './src/navigation/tabNavigationTrabajadores';
import TabNavigatorClientes from './src/navigation/TabNavigatorClientes';
import CreateJobScreen from './src/views/cliente/CreateJobScreen';
import HireScreen from './src/views/cliente/HireScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio', headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registro' }}
        />
        <Stack.Screen 
          name="TrabajadorTabs" 
          component={TabNavigatorTrabajadores}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeCliente" 
          component={TabNavigatorClientes}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CreateJob" 
          component={CreateJobScreen}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HireScreen" 
          component={HireScreen}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CompanyScreen" 
          component={CompanyScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}