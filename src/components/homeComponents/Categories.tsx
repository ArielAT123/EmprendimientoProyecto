import React from 'react';
import { View, Text } from 'react-native';
import { Category } from '../../types/Categories';
export const Categories = () => {
    //LLAMADO A LA API PARA OBTENER LAS CATEGORIAS
    //const categories: Category[]

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Categorías</Text>
         
        </View>
    );
}