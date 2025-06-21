// screens/LoginScreen.js
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import tw from 'twrnc'; // Tailwind CSS for React Native
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types'; // Asegúrate de tener este archivo con tus tipos de navegación


const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const handleRegister = () => {
    if (email && password1==password2) {
      navigation.navigate('Home');
    } 
    if(password1!=password2){
      Alert.alert('Error', 'Las contraseñas no coinciden');
    }else {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
    }
  };

  return (
    <View style={tw`flex-1 justify-center p-6 bg-gray-100`}>
      <Text style={tw`text-3xl font-bold text-center mb-8 text-blue-600`}>Registrate Aqui</Text>
      
      <TextInput
        placeholder="Email"
        style={tw`bg-white p-4 rounded-lg mb-4 border border-gray-300`}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Contraseña"
        style={tw`bg-white p-4 rounded-lg mb-6 border border-gray-300`}
        value={password1}
        onChangeText={setPassword1}
        secureTextEntry
      />
      <TextInput
        placeholder="Repita su contraseña"
        style={tw`bg-white p-4 rounded-lg mb-6 border border-gray-300`}
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={tw`bg-blue-500 py-3 rounded-lg`}
        onPress={handleRegister}
      >
        <Text style={tw`text-white text-center font-bold`}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;