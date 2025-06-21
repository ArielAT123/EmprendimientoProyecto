// screens/HomeScreen.js
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc'; // Tailwind CSS for React Native
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HeaderHome } from '../../components/headerHome';
import { RootStackParamList } from '../../navigation/types';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={tw`flex-1 bg-white`}>
      <HeaderHome />
      <View style={tw`flex-1 justify-center items-center bg-green-100`}>
        <Text style={tw`text-2xl font-bold mb-4`}>¡Bienvenido a JOBBY!</Text>
        <View>
          <TouchableOpacity
            style={tw`bg-blue-500 p-4 rounded-full mb-4`}
            onPress={() => navigation.navigate('HomeCliente')}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-green-500 p-4 rounded-full`}
            onPress={() => navigation.navigate('HomeTrabajador')}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Trabajador</Text>
          </TouchableOpacity>          
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;