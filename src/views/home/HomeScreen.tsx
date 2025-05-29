// screens/HomeScreen.js
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc'; // Tailwind CSS for React Native
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 justify-center items-center bg-green-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>¡Bienvenido!</Text>
      <TouchableOpacity
        style={tw`bg-red-500 px-4 py-2 rounded-lg`}
        onPress={() => navigation.goBack()}  // Regresa al Login
      >
        <Text style={tw`text-white`}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;