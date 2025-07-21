// screens/RegisterScreen.js
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from '../../navigation/types';

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  type FormData = {
    email: string;
    password1: string;
    password2: string;
    fullName: string;
    idNumber: string;
    profileImage: string | null;
    idImage: string | null;
    fechaNacimiento: Date | null;
    telefono: string | null;
    cedulaImage: string | null;
  };

  const [form, setForm] = useState<FormData>({
    email: '',
    password1: '',
    password2: '',
    fullName: '',
    idNumber: '',
    profileImage: null,
    idImage: null,
    fechaNacimiento: null,
    telefono: null,
    cedulaImage: null,
  });

  const [isPressedProfile, setIsPressedProfile] = useState(false);
  const [isPressedId, setIsPressedId] = useState(false);
  const [isPressedSubmit, setIsPressedSubmit] = useState(false);

  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permisos de almacenamiento',
            message: 'La app necesita acceso a tus archivos',
            buttonNeutral: 'Preguntar después',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickImage = async (imageType: keyof Pick<FormData, 'profileImage' | 'idImage'>): Promise<void> => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', 'No se pudo seleccionar la imagen');
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setForm((prev) => ({
            ...prev,
            [imageType]: uri,
          }));
        }
      }
    );
  };

  const handleRegister = (): void => {
    const { email, password1, password2, fullName, idNumber, profileImage, idImage } = form;

    if (!email || !password1 || !password2 || !fullName || !idNumber || !profileImage || !idImage) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    if (password1 !== password2) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Error', 'Por favor ingrese un email válido');
      return;
    }

    navigation.navigate('Home');
  };

  const handleChange = <T extends keyof FormData>(name: T, value: FormData[T]): void => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow justify-center p-6 bg-gray-50`}
      keyboardShouldPersistTaps="handled"
    >
      <View style={tw`max-w-md mx-auto`}>
        <Text style={tw`text-3xl font-bold text-center mb-8 text-blue-600`}>Regístrate en Jobby</Text>

        <TextInput
          placeholder="Nombre completo"
          style={tw`bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm`}
          placeholderTextColor="#9CA3AF"
          value={form.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />

        <TextInput
          placeholder="Número de cédula"
          style={tw`bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm`}
          placeholderTextColor="#9CA3AF"
          value={form.idNumber}
          onChangeText={(text) => handleChange('idNumber', text)}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Email"
          style={tw`bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm`}
          placeholderTextColor="#9CA3AF"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          style={tw`bg-white p-4 rounded-xl mb-4 border border-gray-200 shadow-sm`}
          placeholderTextColor="#9CA3AF"
          value={form.password1}
          onChangeText={(text) => handleChange('password1', text)}
          secureTextEntry
        />

        <TextInput
          placeholder="Repita su contraseña"
          style={tw`bg-white p-4 rounded-xl mb-6 border border-gray-200 shadow-sm`}
          placeholderTextColor="#9CA3AF"
          value={form.password2}
          onChangeText={(text) => handleChange('password2', text)}
          secureTextEntry
        />

        <TouchableOpacity
          style={tw`bg-gray-100 py-3 rounded-xl mb-4 border border-gray-200 shadow-sm ${
            isPressedProfile ? 'bg-gray-200' : ''
          }`}
          onPress={() => pickImage('profileImage')}
          onPressIn={() => setIsPressedProfile(true)}
          onPressOut={() => setIsPressedProfile(false)}
          activeOpacity={0.8}
        >
          <Text style={tw`text-gray-700 text-center font-medium`}>
            {form.profileImage ? 'Foto de perfil seleccionada' : 'Seleccionar foto de perfil'}
          </Text>
        </TouchableOpacity>
        {form.profileImage && (
          <Image
            source={{ uri: form.profileImage }}
            style={tw`w-24 h-24 rounded-full self-center mb-4 border border-gray-200`}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity
          style={tw`bg-gray-100 py-3 rounded-xl mb-6 border border-gray-200 shadow-sm ${
            isPressedId ? 'bg-gray-200' : ''
          }`}
          onPress={() => pickImage('idImage')}
          onPressIn={() => setIsPressedId(true)}
          onPressOut={() => setIsPressedId(false)}
          activeOpacity={0.8}
        >
          <Text style={tw`text-gray-700 text-center font-medium`}>
            {form.idImage ? 'Foto de cédula seleccionada' : 'Seleccionar foto de cédula'}
          </Text>
        </TouchableOpacity>
        {form.idImage && (
          <Image
            source={{ uri: form.idImage }}
            style={tw`w-full h-48 rounded-xl self-center mb-6 border border-gray-200`}
            resizeMode="contain"
          />
        )}

        <TouchableOpacity
          style={tw`bg-blue-500 py-4 rounded-xl shadow-md ${
            isPressedSubmit ? 'bg-blue-600' : ''
          }`}
          onPress={handleRegister}
          onPressIn={() => setIsPressedSubmit(true)}
          onPressOut={() => setIsPressedSubmit(false)}
          activeOpacity={0.8}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;