import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkersClientPostsDashboard from '../views/home/TrabajadorHomeScreen';
import { Ionicons } from '@expo/vector-icons';
import WorkerProfileScreen from '../views/Trabajadores/Profile';
import TrabajadoresPostsScreen from '../views/Trabajadores/Publicaciones';

const Tab = createBottomTabNavigator();

const TabNavigatorTrabajadores = () => {
    return (

        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: 'black', paddingVertical: 10 } }}>
            <Tab.Screen
                name="Inicio"
                component={WorkersClientPostsDashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                    headerShown: false, // Oculta el header para esta pantalla
                }}
            />
            <Tab.Screen
                name="Publicaciones"
                component={TrabajadoresPostsScreen} // Cambia esto por tu componente de perfil
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="briefcase-outline" size={size} color={color}/>),
                    headerShown: false, // Oculta el header para esta pantalla
                }} />
            <Tab.Screen
                name="Perfil"
                component={WorkerProfileScreen} // Cambia esto por tu componente de perfil
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                    headerShown: false, // Oculta el header para esta pantalla
                }} />

        </Tab.Navigator>
    );
};

export default TabNavigatorTrabajadores;