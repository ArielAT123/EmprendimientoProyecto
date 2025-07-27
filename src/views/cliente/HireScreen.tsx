import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  Image,
} from 'react-native';
import tw from 'twrnc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { ORANGE_PRIMARY, ORANGE_DARK, ORANGE_LIGHTER } from './Datos/datos';

const HireScreen = ({ navigation, route }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemImage, setProblemImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Obtener parámetros de la navegación
  const selectedWorker = route?.params?.selectedWorker;
  const preselectedCategory = route?.params?.preselectedCategory;

  // Auto-preseleccionar categoría si viene desde contratar trabajador
  React.useEffect(() => {
    if (preselectedCategory) {
      setSelectedCategory(preselectedCategory);
    }
    if (selectedWorker) {
      // Opcional: prellenar el título con ejemplo específico
      setTitle('Aire acondicionado dañado');
    }
  }, [preselectedCategory, selectedWorker]);

  const categories = [
    { id: 'tecnicos', name: 'Técnicos', icon: 'build' },
    { id: 'construccion', name: 'Construcción', icon: 'engineering' },
    { id: 'plomeria', name: 'Plomería', icon: 'plumbing' },
    { id: 'electricidad', name: 'Electricidad', icon: 'electrical-services' },
    { id: 'servicios', name: 'Servicios Generales', icon: 'home-repair-service' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos permisos para acceder a tu galería de fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProblemImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos permisos para acceder a tu cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProblemImage(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige una opción:',
      [
        { text: 'Cámara', onPress: takePhoto },
        { text: 'Galería', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleCreateJob = () => {
    if (!title || !description || !budget || !selectedCategory) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    setShowPreview(true);
  };

  const handleSendJob = () => {
    setShowPreview(false);
    Alert.alert(
      'Solicitud Enviada',
      'Tu solicitud de contratación ha sido enviada al trabajador exitosamente. Te notificaremos cuando responda.',
      [
        {
          text: 'Ver Mis Solicitudes',
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
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Espacio arriba del header */}
      <View style={tw`h-6`} />
      {/* Header igual que ClienteHomeScreen y ClienteJobsScreen */}
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={ORANGE_DARK} />
          </TouchableOpacity>
          <Text style={{ color: ORANGE_DARK, fontSize: 24, fontWeight: 'bold' }}>
            Solicitud de contratación
          </Text>
          <View />
        </View>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-base font-bold mb-2`}>Título de la Solicitud</Text>
          <TextInput
            style={[
              tw`bg-white rounded-lg p-3 text-base`,
              {
                borderWidth: 1,
                borderColor: ORANGE_LIGHTER,
                color: '#757575',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              },
            ]}
            placeholder="Ej: Aire acondicionado dañado"
            value={title}
            onChangeText={setTitle}
            onFocus={() => {
              if (title === 'Aire acondicionado dañado') {
                setTitle('');
              }
            }}
            placeholderTextColor="#757575"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-base font-bold mb-2`}>Descripción</Text>
          <TextInput
            style={[
              tw`bg-white rounded-lg p-3 text-base h-24`,
              {
                borderWidth: 1,
                borderColor: ORANGE_LIGHTER,
                color: '#757575',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              },
            ]}
            placeholder="Describe detalladamente qué necesitas..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#757575"
          />
        </View>

        {/* Sección para subir foto del problema */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-base font-bold mb-2`}>Foto del Problema (Opcional)</Text>
          <TouchableOpacity
            style={[
              tw`bg-white rounded-lg p-4 items-center justify-center border-2 border-dashed`,
              {
                borderColor: problemImage ? ORANGE_PRIMARY : ORANGE_LIGHTER,
                minHeight: 120,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              },
            ]}
            onPress={showImageOptions}
          >
            {problemImage ? (
              <View style={tw`items-center`}>
                <Image source={{ uri: problemImage }} style={tw`w-20 h-20 rounded-lg mb-2`} />
                <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium`}>Cambiar foto</Text>
              </View>
            ) : (
              <View style={tw`items-center`}>
                <MaterialIcons name="add-a-photo" size={32} color={ORANGE_LIGHTER} />
                <Text style={tw`text-[${ORANGE_LIGHTER}] font-medium mt-2`}>Subir foto del problema</Text>
                <Text style={tw`text-gray-500 text-sm mt-1 text-center`}>
                  Ayuda a mostrar mejor el problema
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Sección para modelo del aparato */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-base font-bold mb-2`}>Modelo del Aparato (Opcional)</Text>
          <TextInput
            style={[
              tw`bg-white rounded-lg p-3 text-base`,
              {
                borderWidth: 1,
                borderColor: ORANGE_LIGHTER,
                color: '#757575',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              },
            ]}
            placeholder="Ej: Samsung Galaxy A54, LG Refrigerador, etc."
            value={deviceModel}
            onChangeText={setDeviceModel}
            placeholderTextColor="#757575"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-base font-bold mb-2`}>Presupuesto (USD)</Text>
          <TextInput
            style={[
              tw`bg-white rounded-lg p-3 text-base`,
              {
                borderWidth: 1,
                borderColor: ORANGE_LIGHTER,
                color: '#757575',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              },
            ]}
            placeholder="Ej: 25"
            value={budget}
            onChangeText={setBudget}
            keyboardType="numeric"
            placeholderTextColor="#757575"
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-base font-bold mb-2`}>Categoría</Text>
          <View style={tw`flex-row items-center justify-center flex-wrap`}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  tw`bg-white border-2 rounded-xl p-4 items-center mr-3 mb-3 w-35`,
                  {
                    borderColor: selectedCategory === category.id ? ORANGE_DARK : ORANGE_LIGHTER,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 3,
                  },
                ]}
                onPress={() => setSelectedCategory(category.id)}>
                <MaterialIcons
                  name={category.icon as any}
                  size={32}
                  color={selectedCategory === category.id ? ORANGE_DARK : '#757575'}
                />
                <Text style={[
                  tw`font-medium mt-2 text-center`,
                  { color: selectedCategory === category.id ? ORANGE_DARK : '#757575' }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={tw`bg-[${ORANGE_PRIMARY}] p-4 rounded-lg items-center mt-6 mb-8`} 
          onPress={handleCreateJob}>
          <Text style={tw`text-white text-lg font-bold`}>Enviar Solicitud</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de vista previa */}
      <Modal
        visible={showPreview}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-40 justify-end`}>
          <View style={tw`bg-white rounded-t-2xl p-6 max-h-[80%]`}>
            <Text style={tw`text-xl font-bold text-[${ORANGE_DARK}] mb-4`}>Vista Previa</Text>
            <ScrollView>
              <Text style={tw`text-base font-bold text-black mb-2`}>{title}</Text>
              <Text style={tw`text-sm text-gray-700 mb-2`}>{description}</Text>
              {problemImage && (
                <View style={tw`mb-2`}>
                  <Text style={tw`font-bold text-black mb-1`}>Foto del problema:</Text>
                  <Image source={{ uri: problemImage }} style={tw`w-full h-32 rounded-lg`} resizeMode="cover" />
                </View>
              )}
              {deviceModel && (
                <Text style={tw`text-sm text-gray-700 mb-2`}>
                  <Text style={tw`font-bold text-black`}>Modelo del Aparato: </Text>
                  {deviceModel}
                </Text>
              )}
              <Text style={tw`text-sm text-gray-700 mb-2`}>
                <Text style={tw`font-bold text-black`}>Presupuesto: </Text>${budget}
              </Text>
              <Text style={tw`text-sm text-gray-700 mb-2`}>
                <Text style={tw`font-bold text-black`}>Categoría: </Text>
                {categories.find((c) => c.id === selectedCategory)?.name}
              </Text>
              <TouchableOpacity
                style={tw`mt-6 bg-[${ORANGE_PRIMARY}] py-3 rounded-xl`}
                onPress={handleSendJob}
              >
                <Text style={tw`text-white text-center font-bold text-base`}>Enviar Solicitud</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`mt-2 bg-gray-200 py-3 rounded-xl`}
                onPress={() => setShowPreview(false)}
              >
                <Text style={tw`text-center font-bold text-base text-gray-700`}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HireScreen;