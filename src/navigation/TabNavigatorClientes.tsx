import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ClienteHomeScreen from '../views/cliente/ClienteHomeScreen';
import ClienteJobsScreen from '../views/cliente/ClienteJobsScreen';

const Tab = createBottomTabNavigator();

const TabNavigatorClientes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ClienteHome') {
            iconName = 'home';
          } else if (route.name === 'ClienteJobs') {
            iconName = 'work';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <MaterialIcons name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#757575',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}>
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
    </Tab.Navigator>
  );
};

export default TabNavigatorClientes;