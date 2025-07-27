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
import { mockWorkers, ORANGE_PRIMARY, ORANGE_LIGHTER, ORANGE_ACCENT, ORANGE_LIGHT, ORANGE_DARK, ORANGE_DARKER, portfolioPhotos } from '../../views/cliente/Datos/datos';

const ClienteHomeScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job_accepted',
      title: 'Oferta Aceptada',
      message: 'Luis Gómez aceptó tu solicitud de trabajo eléctrico',
      time: 'Hace 2 min',
      isRead: false,
      icon: 'check-circle',
      color: '#10B981'
    },
    {
      id: 2,
      type: 'job_accepted',
      title: 'Oferta Aceptada', 
      message: 'Ana López aceptó tu solicitud de reparación de computadora',
      time: 'Hace 1 hora',
      isRead: false,
      icon: 'check-circle',
      color: '#10B981'
    },
    {
      id: 3,
      type: 'job_completed',
      title: 'Trabajo Completado',
      message: 'María Torres completó el trabajo de pintura. ¡Califica su servicio!',
      time: 'Hace 3 horas',
      isRead: true,
      icon: 'star',
      color: '#F59E0B'
    },
    {
      id: 4,
      type: 'new_proposal',
      title: 'Nueva Propuesta',
      message: 'Pedro Mendoza envió una propuesta para tu trabajo de gasfitería',
      time: 'Hace 5 horas',
      isRead: true,
      icon: 'assignment',
      color: '#3B82F6'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Recordatorio',
      message: 'Tu trabajo con Jorge Zambrano está programado para mañana a las 9:00 AM',
      time: 'Hace 1 día',
      isRead: true,
      icon: 'schedule',
      color: '#8B5CF6'
    }
  ]);

  const categories = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Técnicos', value: 'Técnico' },
    { label: 'Construcción', value: 'Construcción' },
    { label: 'Plomería', value: 'Plomero' },
    { label: 'Electricidad', value: 'Electricista' },
    { label: 'Servicios Generales', value: 'Servicios' },
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
      
      // Filtrado por categorías específicas
      let matchesCategory = false;
      const profession = worker.profession.toLowerCase();
      
      if (selectedCategory === 'Técnico') {
        matchesCategory = profession.includes('técnico');
      } else if (selectedCategory === 'Construcción') {
        matchesCategory = profession.includes('construcción') || profession.includes('maestro') || profession.includes('carpinter');
      } else if (selectedCategory === 'Plomero') {
        matchesCategory = profession.includes('plomer') || profession.includes('gasfiter');
      } else if (selectedCategory === 'Electricista') {
        matchesCategory = profession.includes('electricista');
      } else if (selectedCategory === 'Servicios') {
        matchesCategory = profession.includes('jardinero') || profession.includes('pintor') || profession.includes('cerrajer');
      }
      
      return matchesCategory && (
        worker.name.toLowerCase().includes(searchText.toLowerCase()) ||
        worker.profession.toLowerCase().includes(searchText.toLowerCase()) ||
        worker.location.toLowerCase().includes(searchText.toLowerCase())
      );
    })
    .sort((a, b) => (a.isPremium === b.isPremium) ? 0 : a.isPremium ? -1 : 1);

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

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
              {notifications.filter(n => !n.isRead).length > 0 && (
                <View style={tw`absolute -top-1 -right-1 bg-[${ORANGE_DARK}] w-5 h-5 rounded-full items-center justify-center`}>
                  <Text style={tw`text-white text-xs font-bold`}>{notifications.filter(n => !n.isRead).length}</Text>
                </View>
              )}
            </TouchableOpacity>
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
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[85%]`}>
            {selectedWorker && (
              <>
                {/* Header con botón cerrar */}
                <View style={tw`relative p-4 border-b border-gray-200`}>
                  <TouchableOpacity
                    style={tw`absolute top-2 right-2 p-2`}
                    onPress={() => setModalVisible(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  <View style={tw`items-center pt-2`}>
                    <Image
                      source={{ uri: selectedWorker.photo }}
                      style={tw`w-24 h-24 rounded-full mb-3`}
                      resizeMode="cover"
                    />
                    <Text style={tw`text-xl font-bold text-gray-800`}>{selectedWorker.name}</Text>
                    <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium`}>{selectedWorker.profession}</Text>
                    <View style={tw`flex-row items-center mt-2`}>
                      {selectedWorker.isPremium && (
                        <MaterialIcons name="verified" size={16} color={ORANGE_PRIMARY} style={tw`mr-1`} />
                      )}
                      <MaterialIcons name="star" size={16} color="#FFBF00" />
                      <Text style={tw`text-gray-600 ml-1`}>{selectedWorker.rating?.toFixed(1)} • {selectedWorker.totalJobs} trabajos</Text>
                    </View>
                    <Text style={tw`text-gray-500 mt-1`}>📍 {selectedWorker.location}</Text>
                  </View>
                </View>

                {/* Contenido scrolleable */}
                <ScrollView style={tw`p-4`} showsVerticalScrollIndicator={false}>
                  {/* Descripción */}
                  <Text style={tw`text-gray-700 mb-4 text-center`}>{selectedWorker.description}</Text>
                  
                  {/* Experiencia y Contacto */}
                  {selectedWorker.experience && (
                    <View style={tw`mb-3`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-1`}>Experiencia:</Text>
                      <Text style={tw`text-gray-600`}>{selectedWorker.experience}</Text>
                    </View>
                  )}
                  
                  {selectedWorker.phone && (
                    <View style={tw`mb-3`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-1`}>Contacto:</Text>
                      <Text style={tw`text-gray-600`}>{selectedWorker.phone}</Text>
                    </View>
                  )}

                  {/* Certificaciones */}
                  {selectedWorker.certifications && selectedWorker.certifications.length > 0 && (
                    <View style={tw`mb-3`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Certificaciones:</Text>
                      <View style={tw`flex-row flex-wrap`}>
                        {selectedWorker.certifications.map((cert: string, index: number) => (
                          <Text key={index} style={tw`bg-[${ORANGE_LIGHTER}] text-[${ORANGE_DARK}] px-2 py-1 rounded text-xs mr-2 mb-1`}>
                            {cert}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Habilidades */}
                  {selectedWorker.skills && selectedWorker.skills.length > 0 && (
                    <View style={tw`mb-3`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Especialidades:</Text>
                      {selectedWorker.skills.map((skill: string, index: number) => (
                        <Text key={index} style={tw`text-gray-600 mb-1`}>• {skill}</Text>
                      ))}
                    </View>
                  )}

                  {/* Portafolio */}
                  {selectedWorker.portfolioPhotos && selectedWorker.portfolioPhotos.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Portafolio:</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {selectedWorker.portfolioPhotos.map((photo: string, index: number) => (
                          <Image
                            key={index}
                            source={{ uri: photo }}
                            style={tw`w-20 h-20 rounded-lg mr-2`}
                            resizeMode="cover"
                          />
                        ))}
                      </ScrollView>
                    </View>
                  )}
                  
                  {/* Trabajos Frecuentes */}
                  {selectedWorker.frequentJobs && selectedWorker.frequentJobs.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Trabajos Frecuentes:</Text>
                      {selectedWorker.frequentJobs.map((job: any, index: number) => (
                        <View key={index} style={tw`flex-row justify-between items-center py-2 px-3 bg-gray-50 rounded-lg mb-2`}>
                          <Text style={tw`text-gray-700 flex-1`}>{job.name}</Text>
                          <Text style={tw`font-bold text-[${ORANGE_PRIMARY}]`}>${job.price}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  {/* Precios */}
                  <View style={tw`bg-[${ORANGE_LIGHTER}] p-3 rounded-lg mb-4`}>
                    <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Tarifa Base:</Text>
                    <Text style={tw`text-gray-700`}>Por trabajo: <Text style={tw`font-bold text-[${ORANGE_PRIMARY}]`}>${selectedWorker.price}</Text></Text>
                  </View>
                </ScrollView>

                {/* Botón contratar */}
                <View style={tw`p-4 border-t border-gray-200`}>
                  <TouchableOpacity
                    style={tw`bg-[${ORANGE_PRIMARY}] py-3 rounded-lg`}
                    onPress={() => {
                      setModalVisible(false);
                      let selectedCategoryId = 'tecnicos';
                      const profession = selectedWorker.profession.toLowerCase();
                      
                      if (profession.includes('técnico')) {
                        selectedCategoryId = 'tecnicos';
                      } else if (profession.includes('construcción') || profession.includes('maestro') || profession.includes('carpinter')) {
                        selectedCategoryId = 'construccion';
                      } else if (profession.includes('plomer') || profession.includes('gasfiter')) {
                        selectedCategoryId = 'plomeria';
                      } else if (profession.includes('electricista')) {
                        selectedCategoryId = 'electricidad';
                      } else if (profession.includes('jardinero') || profession.includes('pintor') || profession.includes('cerrajer')) {
                        selectedCategoryId = 'servicios';
                      }
                      
                      navigation.navigate('HireScreen', { 
                        selectedWorker: selectedWorker,
                        preselectedCategory: selectedCategoryId
                      });
                    }}
                  >
                    <Text style={tw`text-white font-bold text-center text-base`}>Contratar Ahora</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de notificaciones */}
      <Modal
        visible={notificationsVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setNotificationsVisible(false)}>
          <View style={tw`flex-1 bg-black bg-opacity-40 justify-start`}>
            <TouchableWithoutFeedback>
              <View style={[tw`bg-white rounded-b-2xl mx-4 mt-20`, { minHeight: '60%', maxHeight: '80%' }]}>
                {/* Header del modal */}
                <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}>
                  <Text style={tw`text-xl font-bold text-[${ORANGE_PRIMARY}]`}>Notificaciones</Text>
                  <TouchableOpacity 
                    onPress={markAllAsRead}
                    style={tw`bg-[${ORANGE_LIGHTER}] px-3 py-1 rounded-full`}
                  >
                    <Text style={tw`text-[${ORANGE_DARK}] text-sm font-medium`}>Marcar todas</Text>
                  </TouchableOpacity>
                </View>

                {/* Lista de notificaciones */}
                <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
                  {notifications.length === 0 ? (
                    <View style={tw`items-center py-8`}>
                      <MaterialIcons name="notifications-none" size={48} color="#9CA3AF" />
                      <Text style={tw`text-gray-500 text-center mt-3`}>No tienes notificaciones nuevas</Text>
                    </View>
                  ) : (
                    notifications.map((notif) => (
                      <View 
                        key={notif.id} 
                        style={tw`${!notif.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'} p-4 rounded-2xl mb-3 border-2`}
                      >
                        <View style={tw`flex-row`}>
                          {/* Icono */}
                          <View style={tw`mr-3 mt-1`}>
                            <MaterialIcons name={notif.icon} size={24} color={notif.color} />
                            {!notif.isRead && (
                              <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-[${ORANGE_PRIMARY}] rounded-full`} />
                            )}
                          </View>
                          
                          {/* Contenido */}
                          <View style={tw`flex-1`}>
                            <Text style={tw`${!notif.isRead ? 'font-bold' : 'font-medium'} text-gray-900 text-base mb-1`}>
                              {notif.title}
                            </Text>
                            <Text style={tw`text-gray-600 text-sm leading-5 mb-2`}>
                              {notif.message}
                            </Text>
                            <Text style={tw`text-gray-400 text-xs`}>
                              {notif.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))
                  )}
                </ScrollView>
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