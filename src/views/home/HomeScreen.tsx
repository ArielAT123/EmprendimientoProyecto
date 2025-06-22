import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HeaderHome } from '../../components/headerHome';

export type RootStackParamList = {
  Home: undefined;
  HomeCliente: undefined;
  TrabajadorTabs: undefined;
  ClientDetails: { clientId: string };
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <HeaderHome />
      <View style={tw`flex-1 px-4 py-6 items-center`}>
        <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-md`}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-2 text-center`}>¡Bienvenido a JOBBY!</Text>
          <Text style={tw`text-sm text-gray-600 mb-6 text-center`}>
            Conecta con clientes o encuentra trabajadores para tus necesidades.
          </Text>
          
          <View style={tw`w-full`}>
            <TouchableOpacity
              style={tw`bg-white border border-blue-500 rounded-lg p-4 mb-4`} // Added mb-4 for spacing
              onPress={() => navigation.navigate('HomeCliente')}
              activeOpacity={0.7} // Optional: adds visual feedback
            >
              <Text style={tw`text-blue-500 text-lg font-semibold text-center`}>Cliente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={tw`bg-white border border-orange-500 rounded-lg p-4`}
              onPress={() => navigation.navigate('TrabajadorTabs')}
              activeOpacity={0.7} // Optional: adds visual feedback
            >
              <Text style={tw`text-orange-500 text-lg font-semibold text-center`}>Trabajador</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;