import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation/types";
import tw from 'twrnc'; // Tailwind CSS for React Native
// Asegúrate de tener este archivo con tus tipos de navegación
export const HeaderHome = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={tw`flex-row justify-between items-center p-4 bg-blue-500`}>
            <View style={tw`rounded-lg px-4 py-2`}>
                <Text>Digital Workers</Text>
            </View>
            <TouchableOpacity style={tw`bg-red-100 px-4 py-2 rounded-lg`} onPress={() => navigation.navigate('Register')}>
                <Text>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
};