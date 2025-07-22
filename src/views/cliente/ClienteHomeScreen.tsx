import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import tw from 'twrnc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FloatingChatBot from '../../components/ChatBotComponent';
import { mockWorkers, ORANGE_PRIMARY, ORANGE_LIGHTER, ORANGE_ACCENT, ORANGE_LIGHT, ORANGE_DARK, ORANGE_DARKER } from '../../views/cliente/Datos/datos';

const ClienteHomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: '¡Luis Gómez aceptó tu oferta!',
      time: 'Hace 2 min',
    },
    {
      id: 2,
      message: '¡Ana López aceptó tu oferta!',
      time: 'Hace 1 hora',
    },
  ]);

  const categories = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Técnicos', value: 'Técnico' },
    { label: 'Construcción', value: 'Construcción' },
    { label: 'Plomería', value: 'Plomero' },
    { label: 'Electricidad', value: 'Electricista' },
  ];

  const avatarBgColor = ORANGE_LIGHTER;

  // Filtrado: primero verificados, luego no verificados, por nombre, oficio o ubicación
  const filteredWorkers = mockWorkers
    .filter(worker => {
      if (selectedCategory === 'Todos') {
        return (
          worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
          worker.profession.toLowerCase().includes(searchText.toLowerCase()) ||
          worker.location.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      return (
        (worker.profession.toLowerCase().includes(selectedCategory.toLowerCase())) &&
        (
          worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
          worker.profession.toLowerCase().includes(searchText.toLowerCase()) ||
          worker.location.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    })
    .sort((a, b) => (a.isPremium === b.isPremium) ? 0 : a.isPremium ? -1 : 1);

  const handleWorkerPress = (worker: any) => {
    setSelectedWorker(worker);
    setModalVisible(true);
  };

  const renderWorkerCard = (worker: any) => (
    <TouchableOpacity
      key={worker.id}
      style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-[${ORANGE_LIGHTER}]`}
      onPress={() => handleWorkerPress(worker)}
    >
      <View style={tw`flex-row`}>
        {/* Mostrar la foto real del trabajador */}
        <Image
          source={{ uri: worker.photo }}
          style={tw`w-12 h-12 rounded-full`}
          resizeMode="cover"
        />
        <View style={tw`flex-1 ml-3`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-900 font-semibold text-base flex-1`}>{worker.name}</Text>
            {worker.isPremium && (
              <MaterialIcons name="verified" size={16} color={ORANGE_PRIMARY} style={tw`ml-2`} />
            )}
          </View>
          <Text style={tw`text-gray-600 text-sm mt-1`}>{worker.profession}</Text>
          <View style={tw`flex-row items-center mt-2`}>
            <MaterialIcons name="star" size={16} color="#FFBF00" />
            <Text style={tw`text-gray-700 text-sm ml-1 font-medium`}>{worker.rating.toFixed(1)}</Text>
            <Text style={tw`text-gray-500 text-sm ml-1`}>• {worker.totalJobs} trabajos</Text>
          </View>
          <Text style={tw`text-gray-500 text-sm mt-1`}>📍 {worker.location}</Text>
        </View>
        <View style={tw`items-end justify-center`}>
          <Text style={tw`text-[${ORANGE_PRIMARY}] font-bold text-lg`}>${worker.price}</Text>
          <Text style={tw`text-gray-500 text-xs`}>por trabajo</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Espacio arriba del header */}
      <View style={tw`h-6`} />
      {/* Header: fondo blanco, letras negras, sombra abajo */}
      <View
        style={{
          padding: 16,
          backgroundColor: '#FFFFFF',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: ORANGE_PRIMARY,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        }}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View>
            <Text style={{ color: '#111', fontSize: 24, fontWeight: 'bold' }}>
              Buenos días, César
            </Text>
            <Text style={{ color: '#111', fontSize: 14, opacity: 0.9 }}>
              📍 Guayaquil, Ecuador
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              style={tw`p-2 relative`}
              onPress={() => setNotificationsVisible(true)}
            >
              <MaterialIcons name="notifications" size={24} color={ORANGE_PRIMARY} />
              <View style={tw`absolute -top-1 -right-1 bg-[${ORANGE_DARK}] w-5 h-5 rounded-full items-center justify-center`}>
                <Text style={tw`text-white text-xs font-bold`}>{notifications.length}</Text>
              </View>
            </TouchableOpacity>
            {/* Foto real del cliente */}
            <Image
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
              style={tw`w-10 h-10 rounded-full ml-3`}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Búsqueda */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center bg-white rounded-lg px-3 py-3 shadow-sm border border-[${ORANGE_ACCENT}]`}>
            <MaterialIcons name="search" size={20} color={ORANGE_PRIMARY} />
            <TextInput
              style={tw`flex-1 ml-2 text-base text-gray-700`}
              placeholder="Buscar técnicos, maestros en Guayaquil..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#A3A3A3"
            />
          </View>
        </View>

        {/* Categorías */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`px-4 mb-4`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={tw`${selectedCategory === category.value
                ? `bg-[${ORANGE_PRIMARY}]`
                : `bg-white border border-[${ORANGE_LIGHTER}]`} px-4 py-2 rounded-full mr-2`}
              onPress={() => setSelectedCategory(category.value)}>
              <Text style={tw`${selectedCategory === category.value
                ? 'text-white'
                : `text-[${ORANGE_PRIMARY}]`} font-medium`}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sección de Emergencia */}
        <View style={tw`mx-4 mb-6 p-4 bg-white rounded-xl border-l-4 border-[${ORANGE_PRIMARY}]`}>
          <Text style={tw`text-[${ORANGE_PRIMARY}] font-bold text-base mb-3`}>¿Necesitas ayuda urgente?</Text>
          <TouchableOpacity 
            style={tw`bg-[${ORANGE_PRIMARY}] flex-row items-center justify-center p-3 rounded-lg`}
            onPress={() => navigation.navigate('CreateJob')}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={tw`text-white font-bold text-base ml-2`}>Solicitar Trabajo Urgente</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de trabajadores filtrados */}
        <View style={tw`px-4 pb-6`}>
          <Text style={tw`text-[${ORANGE_DARKER}] text-lg font-bold mb-4`}>Trabajadores Destacados</Text>
          {filteredWorkers.map(renderWorkerCard)}
        </View>
      </ScrollView>

      {/* Modal de perfil de trabajador */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={tw`flex-1 bg-black bg-opacity-40 justify-end`}>
            <TouchableWithoutFeedback>
              <View style={tw`bg-white rounded-t-2xl p-6`}>
                {selectedWorker && (
                  <>
                    <View style={tw`items-center mb-4`}>
                      {/* Foto real del trabajador, más grande y centrada */}
                      <Image
                        source={{ uri: selectedWorker.photo }}
                        style={tw`w-28 h-28 rounded-full mb-3`}
                        resizeMode="cover"
                      />
                      <Text style={tw`text-gray-900 font-bold text-xl mt-2`}>{selectedWorker.name}</Text>
                      <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium mt-1`}>{selectedWorker.profession}</Text>
                      <View style={tw`flex-row items-center mt-2`}>
                        {selectedWorker.isPremium && (
                          <MaterialIcons name="verified" size={18} color={ORANGE_PRIMARY} style={tw`mr-1`} />
                        )}
                        <MaterialIcons name="star" size={16} color="#FFBF00" />
                        <Text style={tw`text-gray-700 text-base ml-1 font-medium`}>{selectedWorker.rating.toFixed(1)}</Text>
                        <Text style={tw`text-gray-500 text-base ml-1`}>• {selectedWorker.totalJobs} trabajos</Text>
                      </View>
                      <Text style={tw`text-gray-500 text-sm mt-1`}>📍 {selectedWorker.location}</Text>
                    </View>
                    <Text style={tw`text-gray-800 mb-4 text-center`}>{selectedWorker.description}</Text>
                    <View style={tw`flex-row justify-between items-center mb-4 px-2`}>
                      <Text style={tw`text-[${ORANGE_PRIMARY}] font-bold text-xl`}>${selectedWorker.price}</Text>
                      <Text style={tw`text-gray-500 text-base`}>por trabajo</Text>
                    </View>
                    <View style={tw`flex-row justify-end`}>
                      <TouchableOpacity
                        style={tw`bg-[${ORANGE_PRIMARY}] px-5 py-2 rounded-lg mr-2`}
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate('CreateJob');
                        }}
                      >
                        <Text style={tw`text-white font-bold`}>Contratar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tw`bg-gray-200 px-5 py-2 rounded-lg`}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={tw`text-gray-700 font-bold`}>Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de notificaciones */}
      <Modal
        visible={notificationsVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setNotificationsVisible(false)}>
          <View style={tw`flex-1 bg-black bg-opacity-40 justify-end`}>
            <TouchableWithoutFeedback>
              <View style={tw`bg-white rounded-t-2xl p-6 max-h-96`}>
                <Text style={tw`text-lg font-bold mb-4 text-[${ORANGE_PRIMARY}]`}>Notificaciones</Text>
                {notifications.length === 0 ? (
                  <Text style={tw`text-gray-500 text-center`}>No tienes notificaciones nuevas.</Text>
                ) : (
                  notifications.map((notif) => (
                    <View key={notif.id} style={tw`mb-3`}>
                      <Text style={tw`text-gray-900`}>{notif.message}</Text>
                      <Text style={tw`text-gray-400 text-xs`}>{notif.time}</Text>
                    </View>
                  ))
                )}
                <TouchableOpacity
                  style={tw`mt-4 bg-[${ORANGE_PRIMARY}] px-5 py-2 rounded-lg self-end`}
                  onPress={() => setNotificationsVisible(false)}
                >
                  <Text style={tw`text-white font-bold`}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FloatingChatBot
        chatBotServices={{
          services: [],
          updateServices: function (newServices: string[]): void {
            throw new Error('Function not implemented.');
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ClienteHomeScreen;