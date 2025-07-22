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
  Animated,
  Dimensions,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import tw from 'twrnc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from '../../navigation/types';

// Colores personalizados
const pastelOrange = '#FFB074';
const pastelOrangeDark = '#FF8C42';
const pastelOrangeLight = '#FFE5CF';

const { width, height } = Dimensions.get('window');

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
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const profileButtonScale = useRef(new Animated.Value(1)).current;
  const idButtonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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

  const getInputStyle = (inputName: string) => {
    const isFocused = focusedInput === inputName;
    return [
      tw`bg-white p-4 rounded-2xl mb-4 text-gray-800 text-base`,
      {
        borderWidth: 2,
        borderColor: isFocused ? pastelOrangeDark : '#E5E7EB',
        shadowColor: isFocused ? pastelOrangeDark : '#000',
        shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
        shadowOpacity: isFocused ? 0.15 : 0.05,
        shadowRadius: isFocused ? 8 : 4,
        elevation: isFocused ? 8 : 2,
      }
    ];
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: '#f8fafc' }]}>
      {/* Background decorativo */}
      <View style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.35,
          backgroundColor: pastelOrangeLight,
        },
        tw`opacity-40`
      ]} />

      {/* Círculos decorativos */}
      <View style={[
        {
          position: 'absolute',
          top: -60,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: pastelOrange,
        },
        tw`opacity-20`
      ]} />

      <View style={[
        {
          position: 'absolute',
          bottom: -50,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: pastelOrangeDark,
        },
        tw`opacity-15`
      ]} />

      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center p-6`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            tw`max-w-md mx-auto w-full`,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Header mejorado */}
          <View style={tw`mb-8 items-center`}>
            <View style={[
              tw`w-20 h-20 rounded-full mb-4 items-center justify-center`,
              { backgroundColor: pastelOrangeLight }
            ]}>
              <View style={[
                tw`w-12 h-12 rounded-full items-center justify-center`,
                { backgroundColor: pastelOrangeDark }
              ]}>
                <Image
                  source={require('../../../assets/jobby.jpg')}
                  style={tw`w-15 h-15 rounded-full`}
                  resizeMode="contain"
                />
                </View>
            </View>
            <Text style={[
              tw`text-3xl font-bold text-center mb-2`,
              { color: pastelOrangeDark, letterSpacing: -0.5 }
            ]}>
              Únete a Jobby
            </Text>
            <Text style={tw`text-base text-gray-600 text-center leading-6`}>
              Crea tu cuenta y encuentra oportunidades increíbles
            </Text>
          </View>

          {/* Card principal */}
          <View style={[
            tw`bg-white rounded-3xl p-6 mb-6`,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 15,
            }
          ]}>
            {/* Inputs mejorados */}
            <View style={tw`mb-2`}>
              <Text style={[tw`text-sm font-semibold mb-2 ml-1`, { color: pastelOrangeDark }]}>
                Nombre completo
              </Text>
              <TextInput
                placeholder="Ingresa tu nombre completo"
                style={getInputStyle('fullName')}
                placeholderTextColor="#9CA3AF"
                value={form.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                onFocus={() => setFocusedInput('fullName')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={tw`mb-2`}>
              <Text style={[tw`text-sm font-semibold mb-2 ml-1`, { color: pastelOrangeDark }]}>
                Número de cédula
              </Text>
              <TextInput
                placeholder="Ingresa tu número de cédula"
                style={getInputStyle('idNumber')}
                placeholderTextColor="#9CA3AF"
                value={form.idNumber}
                onChangeText={(text) => handleChange('idNumber', text)}
                keyboardType="numeric"
                onFocus={() => setFocusedInput('idNumber')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={tw`mb-2`}>
              <Text style={[tw`text-sm font-semibold mb-2 ml-1`, { color: pastelOrangeDark }]}>
                Correo electrónico
              </Text>
              <TextInput
                placeholder="ejemplo@correo.com"
                style={getInputStyle('email')}
                placeholderTextColor="#9CA3AF"
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={tw`mb-2`}>
              <Text style={[tw`text-sm font-semibold mb-2 ml-1`, { color: pastelOrangeDark }]}>
                Contraseña
              </Text>
              <TextInput
                placeholder="Crea una contraseña segura"
                style={getInputStyle('password1')}
                placeholderTextColor="#9CA3AF"
                value={form.password1}
                onChangeText={(text) => handleChange('password1', text)}
                secureTextEntry
                onFocus={() => setFocusedInput('password1')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={[tw`text-sm font-semibold mb-2 ml-1`, { color: pastelOrangeDark }]}>
                Confirmar contraseña
              </Text>
              <TextInput
                placeholder="Repite tu contraseña"
                style={getInputStyle('password2')}
                placeholderTextColor="#9CA3AF"
                value={form.password2}
                onChangeText={(text) => handleChange('password2', text)}
                secureTextEntry
                onFocus={() => setFocusedInput('password2')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Sección de imágenes mejorada */}
            <View style={tw`mb-4`}>
              <Text style={[tw`text-lg font-bold mb-4 text-center`, { color: pastelOrangeDark }]}>
                Documentos requeridos
              </Text>

              {/* Botón foto de perfil */}
              <Animated.View style={{ transform: [{ scale: profileButtonScale }] }}>
                <TouchableOpacity
                  style={[
                    tw`rounded-2xl p-4 mb-4 relative overflow-hidden`,
                    {
                      backgroundColor: form.profileImage ? pastelOrangeLight : '#f9fafb',
                      borderWidth: 2,
                      borderColor: form.profileImage ? pastelOrangeDark : '#e5e7eb',
                      shadowColor: form.profileImage ? pastelOrangeDark : '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: form.profileImage ? 0.15 : 0.05,
                      shadowRadius: 8,
                      elevation: form.profileImage ? 8 : 2,
                    }
                  ]}
                  onPress={() => pickImage('profileImage')}
                  onPressIn={() => handlePressIn(profileButtonScale)}
                  onPressOut={() => handlePressOut(profileButtonScale)}
                  activeOpacity={0.9}
                >
                  <View style={tw`items-center`}>
                    <View style={[
                      tw`w-12 h-12 rounded-full items-center justify-center mb-2`,
                      { backgroundColor: form.profileImage ? pastelOrangeDark : '#d1d5db' }
                    ]}>
                      <Text style={tw`text-white font-bold text-lg`}>👤</Text>
                    </View>
                    <Text style={[
                      tw`font-semibold text-base`,
                      { color: form.profileImage ? pastelOrangeDark : '#6b7280' }
                    ]}>
                      {form.profileImage ? '✓ Foto de perfil seleccionada' : 'Seleccionar foto de perfil'}
                    </Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>
                      Foto clara de tu rostro
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {form.profileImage && (
                <View style={tw`items-center mb-4`}>
                  <Image
                    source={{ uri: form.profileImage }}
                    style={[
                      tw`w-24 h-24 rounded-full`,
                      {
                        borderWidth: 3,
                        borderColor: pastelOrangeDark,
                        shadowColor: pastelOrangeDark,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                      }
                    ]}
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* Botón foto de cédula */}
              <Animated.View style={{ transform: [{ scale: idButtonScale }] }}>
                <TouchableOpacity
                  style={[
                    tw`rounded-2xl p-4 mb-4 relative overflow-hidden`,
                    {
                      backgroundColor: form.idImage ? pastelOrangeLight : '#f9fafb',
                      borderWidth: 2,
                      borderColor: form.idImage ? pastelOrangeDark : '#e5e7eb',
                      shadowColor: form.idImage ? pastelOrangeDark : '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: form.idImage ? 0.15 : 0.05,
                      shadowRadius: 8,
                      elevation: form.idImage ? 8 : 2,
                    }
                  ]}
                  onPress={() => pickImage('idImage')}
                  onPressIn={() => handlePressIn(idButtonScale)}
                  onPressOut={() => handlePressOut(idButtonScale)}
                  activeOpacity={0.9}
                >
                  <View style={tw`items-center`}>
                    <View style={[
                      tw`w-12 h-12 rounded-full items-center justify-center mb-2`,
                      { backgroundColor: form.idImage ? pastelOrangeDark : '#d1d5db' }
                    ]}>
                      <Text style={tw`text-white font-bold text-lg`}>📄</Text>
                    </View>
                    <Text style={[
                      tw`font-semibold text-base`,
                      { color: form.idImage ? pastelOrangeDark : '#6b7280' }
                    ]}>
                      {form.idImage ? '✓ Foto de cédula seleccionada' : 'Seleccionar foto de cédula'}
                    </Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>
                      Foto nítida de ambos lados
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {form.idImage && (
                <View style={tw`items-center mb-4`}>
                  <Image
                    source={{ uri: form.idImage }}
                    style={[
                      tw`w-full h-48 rounded-2xl`,
                      {
                        borderWidth: 2,
                        borderColor: pastelOrangeDark,
                        shadowColor: pastelOrangeDark,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                      }
                    ]}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>
          </View>

          {/* Botón de registro mejorado */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[
                tw`py-4 rounded-2xl relative overflow-hidden`,
                {
                  backgroundColor: pastelOrangeDark,
                  shadowColor: pastelOrangeDark,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 12,
                }
              ]}
              onPress={handleRegister}
              onPressIn={() => handlePressIn(buttonScale)}
              onPressOut={() => handlePressOut(buttonScale)}
              activeOpacity={0.9}
            >
              {/* Efecto de brillo */}
              <View style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#fff',
                },
                tw`opacity-10`
              ]} />

              <Text style={tw`text-white text-center text-xl font-bold tracking-wide`}>
                Crear mi cuenta
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <View style={tw`mt-6 items-center`}>
            <Text style={tw`text-center text-gray-500 text-sm leading-5`}>
              Al registrarte, aceptas nuestros términos de servicio y política de privacidad
            </Text>

            <TouchableOpacity
              style={tw`mt-4`}
              onPress={() => navigation.goBack()}
            >
              <Text style={[tw`text-center font-semibold`, { color: pastelOrangeDark }]}>
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;