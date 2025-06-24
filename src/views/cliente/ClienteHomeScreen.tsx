import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import tw from 'twrnc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FloatingChatBot from '../../components/ChatBotComponent';

const ClienteHomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Técnicos', 'Construcción', 'Plomería', 'Electricidad'];
  
  const mockWorkers = [
    {
      id: 1,
      name: 'Miguel Pérez',
      profession: 'Técnico de Aire Acondicionado',
      location: 'Norte de Guayaquil',
      price: 25,
      rating: 4.8,
      totalJobs: 143,
      isAvailable: true,
      isPremium: true,
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      profession: 'Maestro de Construcción',
      location: 'Centro de Guayaquil',
      price: 35,
      rating: 4.7,
      totalJobs: 156,
      isAvailable: true,
      isPremium: false,
    },
    {
      id: 3,
      name: 'Ana López',
      profession: 'Técnico en Computación',
      location: 'Alborada, Guayaquil',
      price: 15,
      rating: 4.9,
      totalJobs: 203,
      isAvailable: true,
      isPremium: false,
    },
  ];

  const renderWorkerCard = (worker: any) => (
    <TouchableOpacity key={worker.id} style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100`}>
      <View style={tw`flex-row`}>
        <View style={tw`w-12 h-12 bg-blue-200 rounded-full items-center justify-center`}>
          <Text style={tw`text-blue-800 font-bold text-lg`}>
            {worker.name.split(' ').map((n: string) => n[0]).join('')}
          </Text>
        </View>
        <View style={tw`flex-1 ml-3`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-900 font-semibold text-base flex-1`}>{worker.name}</Text>
            {worker.isPremium && (
              <MaterialIcons name="verified" size={16} color="#2196F3" style={tw`ml-2`} />
            )}
          </View>
          <Text style={tw`text-gray-600 text-sm mt-1`}>{worker.profession}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={tw`text-gray-700 text-sm ml-1 font-medium`}>{worker.rating}</Text>
            <Text style={tw`text-gray-500 text-sm ml-1`}>• {worker.totalJobs} trabajos</Text>
          </View>
          <Text style={tw`text-gray-500 text-sm mt-1`}>📍 {worker.location}</Text>
        </View>
        <View style={tw`items-end justify-center`}>
          <Text style={tw`text-blue-500 font-bold text-lg`}>${worker.price}</Text>
          <Text style={tw`text-gray-500 text-xs`}>por trabajo</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-blue-500 p-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-white text-1xl font-bold`}></Text>
            <Text style={tw`text-white text-2xl font-bold`}>Buenos días, César</Text>
            <Text style={tw`text-white text-sm opacity-90`}>📍 Guayaquil, Ecuador</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity style={tw`p-2 relative`}>
              <MaterialIcons name="notifications" size={24} color="#FFFFFF" />
              <View style={tw`absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center`}>
                <Text style={tw`text-white text-xs font-bold`}>3</Text>
              </View>
            </TouchableOpacity>
            <View style={tw`w-10 h-10 bg-white bg-opacity-20 rounded-full items-center justify-center ml-3`}>
              <Text style={tw`text-white font-bold`}>CM</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Búsqueda */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center bg-white rounded-lg px-3 py-3 shadow-sm border border-gray-100`}>
            <MaterialIcons name="search" size={20} color="#757575" />
            <TextInput
              style={tw`flex-1 ml-2 text-base`}
              placeholder="Buscar técnicos, maestros en Guayaquil..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#757575"
            />
          </View>
        </View>

        {/* Categorías */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`px-4 mb-4`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={tw`${selectedCategory === category ? 'bg-blue-500' : 'bg-white'} px-4 py-2 rounded-full mr-2 border border-gray-100`}
              onPress={() => setSelectedCategory(category)}>
              <Text style={tw`${selectedCategory === category ? 'text-white' : 'text-gray-600'} font-medium`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sección de Emergencia */}
        <View style={tw`mx-4 mb-6 p-4 bg-blue-50 rounded-xl border-l-4 border-red-500`}>
          <Text style={tw`text-red-600 font-bold text-base mb-3`}>¿Necesitas ayuda urgente?</Text>
          <TouchableOpacity 
            style={tw`bg-red-500 flex-row items-center justify-center p-3 rounded-lg`}
            onPress={() => navigation.navigate('CreateJob')}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={tw`text-white font-bold text-base ml-2`}>Crear Trabajo Urgente</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de trabajadores */}
        <View style={tw`px-4 pb-6`}>
          <Text style={tw`text-gray-900 text-lg font-bold mb-4`}>Trabajadores Destacados</Text>
          {mockWorkers.map(renderWorkerCard)}
        </View>
      </ScrollView>
      <FloatingChatBot chatBotServices={{
        services: [],
        updateServices: function (newServices: string[]): void {
          throw new Error('Function not implemented.');
        }
      }} ></FloatingChatBot>
    </SafeAreaView>
  );
};

export default ClienteHomeScreen;