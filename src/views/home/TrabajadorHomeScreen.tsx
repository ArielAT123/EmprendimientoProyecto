import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import React, { useState, useEffect } from 'react';
import FloatingChatBot from '../../components/ChatBotComponent';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ClientPost = {
  clientName: string;
  clientId: string;
  postContent: string;
  isImage: boolean;
  description: string;
  tags: string[];
};

const fetchClientPosts = async (): Promise<ClientPost[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      clientName: 'Ana Rodríguez',
      clientId: 'CLI-001',
      postContent: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/plumbing-services-ads-design-template-b707140e39c8469924aa544ab2c74a92_screen.jpg?ts=1732461611',
      isImage: true,
      description: 'Necesito reparación de tuberías urgente en el baño.',
      tags: ['Plomería', 'Urgente', 'Baño'],
    },
    {
      clientName: 'Juan Pérez',
      clientId: 'CLI-002',
      postContent: 'Busco carpintero para construir un mueble a medida.',
      isImage: false,
      description: 'Mueble de madera para sala, medidas 2m x 1m.',
      tags: ['Carpintería', 'Mueble', 'Sala'],
    },
    {
      clientName: 'María Gómez',
      clientId: 'CLI-003',
      postContent: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/house-cleaning-services-flyer-poster-design-template-a9d93dcfd2a5d8606bef3dd41e719b0a_screen.jpg?ts=1636984552',
      isImage: true,
      description: 'Limpieza profunda de apartamento de 3 habitaciones.',
      tags: ['Limpieza', 'Apartamento', 'Profunda'],
    },
  ];
};

const useChatBotServices = () => {
  const [services, setServices] = useState<string[]>([]);

  const updateServices = (newServices: string[] = []) => {
    setServices(prev => [...new Set([...prev, ...newServices])]);
  };

  const clearServices = () => {
    setServices([]);
  };

  return { services, updateServices, clearServices };
};

export default function WorkersClientPostsDashboard() {
  const navigation = useNavigation<NavigationProp>();
  const [clientPosts, setClientPosts] = useState<ClientPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ClientPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const chatBotServices = useChatBotServices();
  const { services: recommendedServices, clearServices } = chatBotServices;

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await fetchClientPosts();
        setClientPosts(posts);
        setFilteredPosts(posts);
      } catch (error) {
        console.error('Error fetching client posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '' && recommendedServices.length === 0) {
      setFilteredPosts(clientPosts);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');
    const recommendedTerms = recommendedServices.map(s => s.toLowerCase());

    const filtered = clientPosts.filter((post) => {
      const postContent = [
        ...post.tags.map(t => t.toLowerCase()),
        post.description.toLowerCase()
      ].join(' ');

      const matchesSearch = searchTerms.length === 0 || 
        searchTerms.some(term => postContent.includes(term));

      const matchesRecommended = recommendedTerms.length === 0 ||
        post.tags.some(tag => 
          recommendedTerms.some(service => 
            tag.toLowerCase().includes(service)
          )
        );

      return matchesSearch && matchesRecommended;
    });

    setFilteredPosts(filtered);
  }, [searchQuery, clientPosts, recommendedServices]);

  const applyRecommendedFilter = (service: string) => {
    setSearchQuery(prev => {
      const services = new Set(prev.split(' ').filter(s => s.trim()));
      services.add(service);
      return Array.from(services).join(' ');
    });
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`bg-white px-5 py-4 rounded-b-lg shadow-sm py-2 mt-10`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>Requerimientos de clientes</Text>
        <Text style={tw`text-gray-500 mt-1`}>Encuentra trabajos disponibles</Text>
      </View>

      <View style={tw`px-5 py-4 bg-white`}>
        <View style={tw`relative`}>
          <TextInput
            placeholder="Buscar por etiqueta o descripción..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={tw`pl-4 pr-10 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white`}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={tw`absolute right-3 top-3`}
              onPress={() => setSearchQuery('')}
            >
              <Text style={tw`text-gray-400 text-lg`}>×</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {recommendedServices.length > 0 && (
          <View style={tw`mt-3`}>
            <Text style={tw`text-sm text-gray-500 mb-1`}>Servicios recomendados:</Text>
            <View style={tw`flex-row flex-wrap`}>
              {recommendedServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`bg-blue-100 rounded-full px-3 py-1 mr-2 mb-2`}
                  onPress={() => applyRecommendedFilter(service)}
                >
                  <Text style={tw`text-blue-700 text-xs`}>{service}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={tw`bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2`}
                onPress={clearServices}
              >
                <Text style={tw`text-gray-700 text-xs`}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={tw`pb-6 py-4`}>
        {isLoading ? (
          <View style={tw`mt-6 px-5`}>
            {[1, 2, 3].map((_, i) => (
              <View key={i} style={tw`bg-white rounded-lg p-4 mb-4`}>
                <View style={tw`flex-row`}>
                  <View style={tw`w-16 h-16 bg-gray-200 rounded-lg mr-4`} />
                  <View style={tw`flex-1`}>
                    <View style={tw`h-5 bg-gray-200 rounded mb-2 w-3/4`} />
                    <View style={tw`h-4 bg-gray-200 rounded mb-1 w-1/2`} />
                    <View style={tw`h-4 bg-gray-200 rounded w-2/3`} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : filteredPosts.length === 0 ? (
          <View style={tw`mx-5 mt-6 bg-white p-6 rounded-lg items-center`}>
            <Text style={tw`text-gray-500 text-center`}>
              No se encontraron resultados para "{searchQuery}"
            </Text>
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={tw`mt-3 px-4 py-2 bg-blue-50 rounded-lg`}
            >
              <Text style={tw`text-blue-600`}>Limpiar búsqueda</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`px-5`}>
            {filteredPosts.map((post, index) => (
              <View 
                key={index} 
                style={tw`bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100`}
              >
                <View style={tw`flex-row mb-3`}>
                  <View style={tw`w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3`}>
                    <Text style={tw`text-blue-600 font-bold text-lg`}>
                      {post.clientName.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={tw`font-semibold text-gray-900`}>{post.clientName}</Text>
                    <Text style={tw`text-xs text-gray-500`}>ID: {post.clientId}</Text>
                  </View>
                </View>

                {post.isImage ? (
                  <Image
                    source={{ uri: post.postContent }}
                    style={tw`w-full h-48 rounded-lg mb-3`}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={tw`text-gray-700 mb-3`}>{post.postContent}</Text>
                )}

                <Text style={tw`text-gray-600 mb-3`}>{post.description}</Text>

                <View style={tw`flex-row flex-wrap mb-4`}>
                  {post.tags.map((tag, tagIndex) => (
                    <TouchableOpacity
                      key={tagIndex}
                      style={tw`bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2`}
                      onPress={() => setSearchQuery(tag)}
                    >
                      <Text style={tw`text-gray-700 text-xs`}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={tw`py-2 bg-blue-600 rounded-lg items-center justify-center`}
                  onPress={() => navigation.navigate('ClientDetails', { clientId: post.clientId })}
                >
                  <Text style={tw`text-white font-medium`}>Contactar cliente</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      
      <FloatingChatBot chatBotServices={chatBotServices} />
    </View>
  );
}