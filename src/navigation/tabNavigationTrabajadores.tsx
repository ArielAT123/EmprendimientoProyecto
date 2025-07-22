import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkersClientPostsDashboard from '../views/home/TrabajadorHomeScreen';
import { Ionicons } from '@expo/vector-icons';
import WorkerProfileScreen from '../views/Trabajadores/Profile';
import TrabajadoresPostsScreen from '../views/Trabajadores/Publicaciones';

// Orange Color Palette
const ORANGE_PRIMARY = '#FF6B35';
const ORANGE_SECONDARY = '#FF8C42';
const ORANGE_ACCENT = '#FFB347';
const ORANGE_LIGHTER = '#FFD4B3';
const ORANGE_DARK = '#FF4500';
const ORANGE_DARKER = '#E55100';

const Tab = createBottomTabNavigator();

const TabNavigatorTrabajadores = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: 'white', 
                    paddingVertical: 10,
                    height: 70, // Altura un poco mayor para mejor apariencia
                    paddingBottom: 10,
                    shadowColor: ORANGE_PRIMARY,
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 8, // Sombra para Android
                },
                tabBarActiveTintColor: ORANGE_SECONDARY, // Color del texto e ícono cuando está activo
                tabBarInactiveTintColor: '#9CA3AF', // Color gris cuando está inactivo
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600', // Texto un poco más grueso
                    marginTop: 2,
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={WorkersClientPostsDashboard}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons 
                            name={focused ? "home" : "home-outline"} 
                            size={size} 
                            color={focused ? ORANGE_SECONDARY : '#9CA3AF'} 
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Publicaciones"
                component={TrabajadoresPostsScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons 
                            name={focused ? "briefcase" : "briefcase-outline"} 
                            size={size} 
                            color={focused ? ORANGE_SECONDARY : '#9CA3AF'} 
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={WorkerProfileScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <Ionicons 
                            name={focused ? "person" : "person-outline"} 
                            size={size} 
                            color={focused ? ORANGE_SECONDARY : '#9CA3AF'} 
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigatorTrabajadores;