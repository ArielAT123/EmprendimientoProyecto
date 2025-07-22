import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';
import { mockJobs, ORANGE_PRIMARY, ORANGE_DARK, ORANGE_LIGHTER, ORANGE_ACCENT } from './Datos/datos';

// Agrega este mock arriba o en tu archivo de datos si prefieres
const mockProposals = [
  { id: 1, name: 'Carlos Ruiz', price: 20, message: 'Puedo hacerlo hoy mismo.' },
  { id: 2, name: 'Andrea Molina', price: 22, message: 'Tengo experiencia en este tipo de trabajos.' },
  { id: 3, name: 'Pedro Sánchez', price: 18, message: 'Trabajo rápido y garantizado.' },
  { id: 4, name: 'Lucía Torres', price: 25, message: 'Llevo mis propias herramientas.' },
];

const ClienteJobsScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [proposalsModal, setProposalsModal] = useState(false);
  const [proposals, setProposals] = useState<any[]>([]);

  const categories = [
    { label: 'Todos', value: 'todos' },
    { label: 'Completados', value: 'completed' },
    { label: 'En Progreso', value: 'in_progress' },
    { label: 'Esperando', value: 'waiting' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('todos');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return ORANGE_PRIMARY;
      case 'waiting': return ORANGE_ACCENT;
      case 'completed': return '#4CAF50';
      default: return '#B0B0B0';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress': return 'En Progreso';
      case 'waiting': return 'Esperando';
      case 'completed': return 'Completado';
      default: return status;
    }
  };

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleViewProposals = (job: any) => {
    // Genera propuestas random para mostrar
    const randomProposals = Array.from({ length: job.proposalsCount }).map((_, i) => {
      const p = mockProposals[Math.floor(Math.random() * mockProposals.length)];
      return { ...p, id: i + 1 };
    });
    setProposals(randomProposals);
    setProposalsModal(true);
  };

  const renderJobCard = ({ item }: { item: any }) => (
    <View style={[
      tw`bg-white rounded-xl p-4 mb-3`,
      { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }
    ]}>
      {/* Título y estado */}
      <View style={tw`flex-row justify-between items-start mb-1`}>
        <View style={tw`flex-1 pr-2`}>
          <Text style={tw`text-base font-bold text-black`} numberOfLines={2}>{item.title}</Text>
        </View>
        <View style={[
          tw`px-2 py-1 rounded-xl`,
          { backgroundColor: getStatusColor(item.status), maxWidth: 110 }
        ]}>
          <Text style={tw`text-xs font-semibold text-white`} numberOfLines={1} ellipsizeMode="tail">
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      {/* Descripción */}
      <Text style={tw`text-sm text-gray-600 mb-2`} numberOfLines={2}>{item.description}</Text>
      {/* Fecha y presupuesto */}
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-xs text-gray-500`}>
          Publicado hace {Math.floor((Date.now() - item.createdAt.getTime()) / (1000 * 60 * 60 * 24))} días
        </Text>
        <Text style={tw`text-base font-bold text-[${ORANGE_DARK}]`}>${item.budget}</Text>
      </View>
      {/* Trabajador o propuestas y botón */}
      <TouchableOpacity style={tw`flex-row justify-between items-center`}>
        {item.worker ? (
          <View style={tw`flex-row items-center flex-1`}>
            <Image
              source={{ uri: item.worker.photo }}
              style={tw`w-10 h-10 rounded-full mr-2 bg-gray-200`}
              resizeMode="cover"
            />
            <View style={tw`max-w-[120px]`}>
              <Text style={tw`text-sm font-bold text-black`} numberOfLines={1}>{item.worker.name}</Text>
              <Text style={tw`text-xs text-black`} numberOfLines={1} ellipsizeMode="tail">
                {item.worker.profession}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={tw`text-sm text-gray-500 flex-1`}>
            {item.proposalsCount} propuestas recibidas
          </Text>
        )}
        <View
          style={tw`px-3 py-1`}>
          <Text style={tw`text-sm font-semibold text-[${ORANGE_PRIMARY}]`}>
            {item.worker ? 'Ver Detalles' : 'Ver Propuestas'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const activeJobs = mockJobs.filter(job => job.status !== 'completed');
  const completedJobs = mockJobs.filter(job => job.status === 'completed');

  const filterAndSortJobs = () => {
    let jobs = [...mockJobs];
    if (selectedCategory !== 'todos') {
      jobs = jobs.filter(job => job.status === selectedCategory);
    }
    // Ordenar por fecha descendente (más reciente primero)
    jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return jobs;
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`h-6`} />
      {/* Header igual que ClienteHomeScreen */}
      <View
        style={{
          padding: 16,
          backgroundColor: '#FFFFFF',
          shadowColor: ORANGE_PRIMARY,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <View />
          <Text style={{ color: ORANGE_DARK, fontSize: 24, fontWeight: 'bold' }}>
            Mis Trabajos
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateJob')}>
            <Icon name="add" size={28} color={ORANGE_DARK} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categorías tipo "chips" */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`px-4 mt-2 mb-4`}
      >
        {categories.map((category) => {
          // Asigna color según la categoría
          let bgColor = 'bg-white';
          let borderColor = `border-[${ORANGE_LIGHTER}]`;
          let textColor = `text-[${ORANGE_PRIMARY}]`;

          if (selectedCategory === category.value) {
            switch (category.value) {
              case 'todos':
                bgColor = 'bg-orange-100'; // Color pastel para "Todos"
                textColor = `text-[${ORANGE_PRIMARY}]`;
                break;
              case 'completed':
                bgColor = 'bg-[#4CAF50]';
                textColor = 'text-white';
                break;
              case 'in_progress':
                bgColor = `bg-[${ORANGE_PRIMARY}]`;
                textColor = 'text-white';
                break;
              case 'waiting':
                bgColor = `bg-[${ORANGE_ACCENT}]`;
                textColor = 'text-white';
                break;
              default:
                bgColor = `bg-[${ORANGE_PRIMARY}]`;
                textColor = 'text-white';
            }
            borderColor = '';
          }

          return (
            <TouchableOpacity
              key={category.value}
              style={tw`${bgColor} ${borderColor} h-12 px-4 flex-row items-center rounded-full mr-2`}
              onPress={() => setSelectedCategory(category.value)}>
              <Text style={tw`${textColor} font-medium text-base`}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Lista de trabajos filtrados y ordenados */}
      <View style={tw`mb-6`} />

      <FlatList
        data={filterAndSortJobs()}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`px-4 pb-4`}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de detalles del trabajo */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-40 justify-end`}>
          <View style={tw`bg-white rounded-t-2xl p-6 max-h-[80%]`}>
            <ScrollView>
              {selectedJob && (
                <>
                  <Text style={tw`text-xl font-bold text-[${ORANGE_DARK}] mb-2`}>{selectedJob.title}</Text>
                  <Text style={tw`text-base text-gray-700 mb-1`}>{selectedJob.description}</Text>
                  <Text style={tw`text-sm text-gray-500 mb-2`}>{selectedJob.details}</Text>
                  <Text style={tw`text-sm text-gray-500 mb-1`}>Dirección: {selectedJob.address}</Text>
                  <Text style={tw`text-sm text-gray-500 mb-1`}>Fecha: {selectedJob.date}</Text>
                  <Text style={tw`text-sm text-gray-500 mb-1`}>Presupuesto: ${selectedJob.budget}</Text>
                  {selectedJob.worker && (
                    <View style={tw`flex-row items-center mt-2`}>
                      <Image
                        source={{ uri: selectedJob.worker.photo }}
                        style={tw`w-10 h-10 rounded-full mr-2 bg-gray-200`}
                        resizeMode="cover"
                      />
                      <View>
                        <Text style={tw`text-base font-bold text-black`}>{selectedJob.worker.name}</Text>
                        <Text style={tw`text-xs text-black`}>{selectedJob.worker.profession}</Text>
                      </View>
                    </View>
                  )}
                </>
              )}
              <TouchableOpacity
                style={tw`mt-6 bg-[${ORANGE_PRIMARY}] py-3 rounded-xl`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-white text-center font-bold text-base`}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de propuestas */}
      <Modal
        visible={proposalsModal}
        animationType="slide"
        transparent
        onRequestClose={() => setProposalsModal(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-40 justify-end`}>
          <View style={tw`bg-white rounded-t-2xl p-6 max-h-[80%]`}>
            <Text style={tw`text-xl font-bold text-[${ORANGE_DARK}] mb-4`}>Propuestas</Text>
            <ScrollView>
              {proposals.length === 0 ? (
                <Text style={tw`text-center text-gray-500`}>No hay propuestas para este trabajo.</Text>
              ) : (
                proposals.map((p) => (
                  <View key={p.id} style={tw`mb-4 p-4 bg-orange-50 rounded-xl`}>
                    <Text style={tw`text-base font-bold text-black`}>{p.name}</Text>
                    <Text style={tw`text-sm text-gray-700 mb-1`}>${p.price}</Text>
                    <Text style={tw`text-sm text-gray-600 mb-2`}>{p.message}</Text>
                    <TouchableOpacity
                      style={tw`bg-[${ORANGE_PRIMARY}] py-2 px-4 rounded-lg self-end`}
                      onPress={() => {
                        // Aquí puedes agregar la lógica para aceptar la propuesta
                        setProposalsModal(false);
                        // Por ejemplo: setSelectedWorker(p) o actualizar el estado del trabajo
                      }}
                    >
                      <Text style={tw`text-white font-bold text-base`}>Aceptar</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
              <TouchableOpacity
                style={tw`mt-4 bg-[${ORANGE_PRIMARY}] py-3 rounded-xl`}
                onPress={() => setProposalsModal(false)}
              >
                <Text style={tw`text-white text-center font-bold text-base`}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ClienteJobsScreen;