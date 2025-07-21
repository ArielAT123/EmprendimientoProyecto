import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClienteHomeScreen from '../views/cliente/ClienteHomeScreen';
import ClienteJobsScreen from '../views/cliente/ClienteJobsScreen';
import ProfileScreen from '../views/cliente/ProfileScreen'; // Asegúrate de que la ruta sea correcta

const Tab = createBottomTabNavigator();

const TabNavigatorClientes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'ClienteHome') {
            iconName = 'home-outline';
          } else if (route.name === 'ClienteJobs') {
            iconName = 'briefcase-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else {
            iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#E0E0E0',
          paddingVertical: 10,
        },
      })}
    >
      <Tab.Screen 
        name="ClienteHome" 
        component={ClienteHomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen 
        name="ClienteJobs" 
        component={ClienteJobsScreen}
        options={{ tabBarLabel: 'Mis Trabajos' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorClientes;