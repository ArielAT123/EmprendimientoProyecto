import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigation/types";
import { Category } from "../../types/Categories";

type CategoryCardProps = {
  category: Category;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('WorkerList', { categoryId: category.tipo })}
      style={{
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <Image source={{ uri: category.icon }} style={{ height: 18, width: 18 }} />
      <Text style={{ color: '#666', marginTop: 5 }}>{category.descripcion}</Text>
    </TouchableOpacity>
  );
}