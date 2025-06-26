import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CreateJobScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'tecnicos', name: 'Técnicos', icon: 'build' },
    { id: 'construccion', name: 'Construcción', icon: 'engineering' },
    { id: 'plomeria', name: 'Plomería', icon: 'plumbing' },
    { id: 'electricidad', name: 'Electricidad', icon: 'electrical-services' },
  ];

  const handleCreateJob = () => {
    if (!title || !description || !budget || !selectedCategory) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    Alert.alert(
      'Trabajo Creado',
      'Tu trabajo ha sido publicado exitosamente. Los trabajadores comenzarán a enviar propuestas.',
      [
        {
          text: 'Ver Mis Trabajos',
          onPress: () => navigation.navigate('ClienteJobs'),
        },
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`bg-orange-500 p-4 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold`}>Crear Nuevo Trabajo</Text>
        <View />
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-900 text-base font-bold mb-2`}>Título del Trabajo</Text>
          <TextInput
            style={tw`bg-white border border-gray-200 rounded-lg p-3 text-base`}
            placeholder="Ej: Reparación de aire acondicionado"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-900 text-base font-bold mb-2`}>Descripción</Text>
          <TextInput
            style={tw`bg-white border border-gray-200 rounded-lg p-3 text-base h-24`}
            placeholder="Describe detalladamente qué necesitas..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-900 text-base font-bold mb-2`}>Presupuesto (USD)</Text>
          <TextInput
            style={tw`bg-white border border-gray-200 rounded-lg p-3 text-base`}
            placeholder="Ej: 25"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-900 text-base font-bold mb-2`}>Categoría</Text>
          <View style={tw`flex-row items-center justify-center flex-wrap `}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={tw`${selectedCategory === category.id ? 'bg-orange-500 border-orange-500' : 'bg-orange-50 border-orange-50'} border-2 rounded-xl p-4 items-center mr-3 mb-3 w-35`}
                onPress={() => setSelectedCategory(category.id)}>
                <MaterialIcons
                  name={category.icon as any}
                  size={32}
                  color={selectedCategory === category.id ? '#FFFFFF' : '#FF5722'}
                />
                <Text style={tw`${selectedCategory === category.id ? 'text-white' : 'text-orange-600'} font-medium mt-2 text-center`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={tw`bg-orange-500 p-4 rounded-lg items-center mt-6 mb-8`} 
          onPress={handleCreateJob}>
          <Text style={tw`text-white text-lg font-bold`}>Publicar Trabajo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateJobScreen;