import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import React, { useState, useEffect } from 'react';
import FloatingChatBot from '../../components/ChatBotComponent';
import { ORANGE_PRIMARY, ORANGE_LIGHTER, ORANGE_ACCENT, ORANGE_DARK, ORANGE_DARKER, hombreFotos, mujerFotos } from '../../views/cliente/Datos/datos';
import { Ionicons } from '@expo/vector-icons';
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
      {/* Header con gradiente naranja */}
      <View style={[
        tw`px-5 py-6 rounded-b-3xl shadow-lg pt-12`,
        { backgroundColor: ORANGE_PRIMARY }
      ]}>
        <Text style={tw`text-3xl font-bold text-white mb-2`}>
          Requerimientos de clientes
        </Text>
        <Text style={tw`text-white text-lg opacity-90`}>
          Encuentra trabajos disponibles
        </Text>

        {/* Decorative elements */}
        <View style={[
          tw`absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-20`,
          { backgroundColor: ORANGE_ACCENT }
        ]} />
        <View style={[
          tw`absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-10`,
          { backgroundColor: ORANGE_LIGHTER }
        ]} />
      </View>

      {/* Search Section */}
      <View style={tw`px-5 py-6 bg-white mx-4 -mt-6 rounded-2xl shadow-lg z-10`}>
        <View style={tw`relative mb-4`}>
          <TextInput
            placeholder="Buscar por etiqueta o descripción..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[
              tw`pl-5 pr-12 py-4 border-2 rounded-xl text-gray-900 bg-gray-50`,
              { borderColor: ORANGE_LIGHTER }
            ]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={[
                tw`absolute right-3 top-3 w-8 h-8 rounded-full items-center justify-center`,
                { backgroundColor: ORANGE_LIGHTER }
              ]}
              onPress={() => setSearchQuery('')}
            >
              <Text style={[tw`text-lg font-bold`, { color: ORANGE_DARK }]}>×</Text>
            </TouchableOpacity>
          )}

          {/* Search icon */}
          <View style={tw`absolute left-4 top-4`}>
            <Text style={tw`text-gray-400 text-lg`}></Text>
          </View>
        </View>

        {/* Recommended Services */}
        {recommendedServices.length > 0 && (
          <View>
            <Text style={[tw`text-sm font-semibold mb-3`, { color: ORANGE_DARK }]}>
              Servicios recomendados:
            </Text>
            <View style={tw`flex-row flex-wrap`}>
              {recommendedServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    tw`rounded-full px-4 py-2 mr-2 mb-2 shadow-sm`,
                    { backgroundColor: ORANGE_ACCENT }
                  ]}
                  onPress={() => applyRecommendedFilter(service)}
                >
                  <Text style={[tw`text-sm font-medium`, { color: ORANGE_DARKER }]}>
                    {service}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={tw`bg-gray-200 rounded-full px-4 py-2 mr-2 mb-2 shadow-sm`}
                onPress={clearServices}
              >
                <Text style={tw`text-gray-700 text-sm font-medium`}>Limpiar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={tw`pb-8 px-4`}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={tw`mt-6`}>
            {[1, 2, 3].map((_, i) => (
              <View key={i} style={tw`bg-white rounded-2xl p-6 mb-4 shadow-md`}>
                <View style={tw`flex-row mb-4`}>
                  <View style={[
                    tw`w-16 h-16 rounded-2xl mr-4`,
                    { backgroundColor: ORANGE_LIGHTER }
                  ]} />
                  <View style={tw`flex-1`}>
                    <View style={[
                      tw`h-5 rounded-lg mb-2 w-3/4`,
                      { backgroundColor: ORANGE_LIGHTER }
                    ]} />
                    <View style={tw`h-4 bg-gray-200 rounded-lg mb-1 w-1/2`} />
                    <View style={tw`h-4 bg-gray-200 rounded-lg w-2/3`} />
                  </View>
                </View>
                <ActivityIndicator size="small" color={ORANGE_PRIMARY} />
              </View>
            ))}
          </View>
        ) : filteredPosts.length === 0 ? (
          <View style={tw`mt-8 bg-white p-8 rounded-2xl items-center shadow-md`}>
            <Text style={tw`text-6xl mb-4`}>🔍</Text>
            <Text style={tw`text-gray-500 text-center text-lg mb-2`}>
              No se encontraron resultados
            </Text>
            <Text style={tw`text-gray-400 text-center mb-6`}>
              para "{searchQuery}"
            </Text>
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={[
                tw`px-6 py-3 rounded-xl shadow-sm`,
                { backgroundColor: ORANGE_ACCENT }
              ]}
            >
              <Text style={[tw`font-semibold`, { color: ORANGE_DARKER }]}>
                Limpiar búsqueda
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`mt-4`}>
            {filteredPosts.map((post, index) => (
              <View
                key={index}
                style={tw`bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100`}
              >
                {/* Client Info */}
                <View style={tw`flex-row mb-4`}>
                  <View style={[
                    tw`w-14 h-14 rounded-full items-center justify-center mr-4 shadow-sm`,
                    { backgroundColor: ORANGE_LIGHTER }
                  ]}>
                    <Image
                      source={hombreFotos.length > 0 ? { uri: hombreFotos[index % hombreFotos.length] } : require('../../../assets/jobby.jpg')}
                      style={tw`w-full h-full rounded-full`}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`font-bold text-gray-900 text-lg`}>
                      {post.clientName}
                    </Text>
                    <Text style={[tw`text-sm font-medium`, { color: ORANGE_DARK }]}>
                      ID: {post.clientId}
                    </Text>
                  </View>

                  {/* Priority indicator */}
                  {post.tags.includes('Urgente') && (
                    <View style={[
                      tw`px-3 py-3 rounded-full`,
                      { backgroundColor: ORANGE_DARK }
                    ]}>
                      <Ionicons name={"alert-circle-outline"} size={30} color={"white"} />
                    </View>
                  )}
                </View>

                {/* Content */}
                {post.isImage ? (
                  <View style={tw`mb-4`}>
                    <Image
                      source={{ uri: post.postContent }}
                      style={tw`w-full h-52 rounded-xl`}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View style={[
                    tw`p-4 rounded-xl mb-4`,
                    { backgroundColor: ORANGE_LIGHTER }
                  ]}>
                    <Text style={[tw`text-lg leading-6`, { color: ORANGE_DARKER }]}>
                      {post.postContent}
                    </Text>
                  </View>
                )}

                {/* Description */}
                <Text style={tw`text-gray-700 text-base mb-4 leading-6`}>
                  {post.description}
                </Text>

                {/* Tags */}
                <View style={tw`flex-row flex-wrap mb-6`}>
                  {post.tags.map((tag, tagIndex) => (
                    <TouchableOpacity
                      key={tagIndex}
                      style={[
                        tw`rounded-full px-4 py-2 mr-2 mb-2 border`,
                        {
                          backgroundColor: tag === 'Urgente' ? ORANGE_DARK : 'white',
                          borderColor: ORANGE_PRIMARY
                        }
                      ]}
                      onPress={() => setSearchQuery(tag)}
                    >
                      <Text style={[
                        tw`text-sm font-medium`,
                        { color: tag === 'Urgente' ? 'white' : ORANGE_PRIMARY }
                      ]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Contact Button */}
                <TouchableOpacity
                  style={[
                    tw`py-4 rounded-xl items-center justify-center shadow-sm`,
                    { backgroundColor: ORANGE_PRIMARY }
                  ]}
                  onPress={() => navigation.navigate('ClientDetails', { clientId: post.clientId })}
                >
                  <Text style={tw`text-white font-bold text-lg`}>
                    Contactar cliente
                  </Text>
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