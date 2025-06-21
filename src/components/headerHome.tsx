import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { RootStackParamList } from "../navigation/types";
import tw from 'twrnc'; // Tailwind CSS for React Native
// Asegúrate de tener este archivo con tus tipos de navegación
// Asegúrate de tener @expo/vector-icons instalado
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const HeaderHome = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={tw`flex-row justify-between items-center px-6 mt-5 py-4 bg-white shadow-sm border-b border-gray-100`}>
            <View style={tw`flex-row items-center`}>
                <Image
                    source={require('../../assets/jobby.png')}
                    style={tw`w-15 h-15`}
                    resizeMode="contain"
                />
                <Text style={tw`text-2xl font-bold text-blue-600 ml-2`}>JOBBY</Text>
            </View>

            <TouchableOpacity
                style={tw`bg-blue-600 px-5 py-2 rounded-full flex-row items-center`}
                onPress={() => navigation.navigate('Register')}
            >
                <MaterialCommunityIcons name="account-plus" size={18} color="white" />
                <Text style={tw`text-white font-medium ml-2`}>Registro</Text>
            </TouchableOpacity>
        </View>
    )
};