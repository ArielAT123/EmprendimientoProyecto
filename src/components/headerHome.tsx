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
        <View style={tw`flex-row justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100`}>
            <View style={tw`mt-5 flex-row items-center px-4 py-2 rounded-full`}>
                <Image
                    source={require('../../assets/jobby.jpg')}
                    style={tw`w-15 h-15`}
                    resizeMode="contain"
                />
                <Text style={tw`text-2xl font-bold text-orange-500 ml-2`}>JOBBY</Text>
            </View>

            <TouchableOpacity
                style={tw`bg-orange-500 px-5 mt-5 py-2 rounded-full flex-row items-center`}
                onPress={() => navigation.navigate('Register')}
            >
                <MaterialCommunityIcons name="account-plus" size={18} color="black" />
                <Text style={tw`text-black font-medium ml-2`}>Registro</Text>
            </TouchableOpacity>
        </View>
    )
};