import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import tw from 'twrnc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HeaderHome } from '../../components/headerHome';
import { RootStackParamList } from '../../navigation/types';

// Colores personalizados
const pastelOrange = '#FFB074';
const pastelOrangeDark = '#FF8C42';
const pastelOrangeLight = '#ffe5cf17';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScale1 = useRef(new Animated.Value(1)).current;
  const buttonScale2 = useRef(new Animated.Value(1)).current;
  const buttonScale3 = useRef(new Animated.Value(1)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = (scaleRef: Animated.Value | Animated.ValueXY) => {
    Animated.spring(scaleRef, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleRef: Animated.Value | Animated.ValueXY) => {
    Animated.spring(scaleRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
          height: height * 0.4,
          backgroundColor: pastelOrangeLight,
        },
        tw`opacity-30`
      ]} />

      {/* Círculos decorativos */}
      <View style={[
        {
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: pastelOrange,
        },
        tw`opacity-20`
      ]} />

      <View style={[
        {
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: pastelOrangeDark,
        },
        tw`opacity-15`
      ]} />

      <HeaderHome />

      <View style={tw`flex-1 px-6 py-8 justify-center`}>
        <Animated.View
          style={[
            tw`items-center`,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Card principal con sombra y gradiente sutil */}
          <View style={[
            tw`bg-white rounded-3xl w-full max-w-md relative overflow-hidden`,
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.1,
              shadowRadius: 25,
              elevation: 20,
            }
          ]}>
            {/* Gradiente sutil en el header de la card */}
            <View style={[
              {
                height: 120,
                backgroundColor: pastelOrangeLight,
              },
              tw`opacity-30 absolute top-0 left-0 right-0`
            ]} />

            <View style={tw`p-8 pt-12`}>
              {/* Título con mejor tipografía */}
              <Text style={[
                tw`text-3xl font-bold text-gray-900 mb-3 text-center`,
                { letterSpacing: -0.5 }
              ]}>
                ¡Bienvenido a{' '}
                <Text style={{ color: pastelOrangeDark }}>JOBBY</Text>!
              </Text>

              <Text style={[
                tw`text-base text-gray-600 mb-8 text-center leading-6`,
                { lineHeight: 24 }
              ]}>
                Conecta con clientes o encuentra trabajadores para tus necesidades de manera fácil y rápida.
              </Text>

              {/* Botones mejorados con animaciones */}
              <View style={tw`w-full flex-column`}>
                {/* Botón Cliente */}
                <Animated.View style={{ transform: [{ scale: buttonScale1 }] }}>
                  <TouchableOpacity
                    style={[
                      tw`bg-white rounded-2xl py-5 mb-2 relative overflow-hidden`,
                      {
                        borderWidth: 2,
                        borderColor: pastelOrangeDark,
                        shadowColor: pastelOrangeDark,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 5,
                      }
                    ]}
                    onPress={() => navigation.navigate('HomeCliente')}
                    onPressIn={() => handlePressIn(buttonScale1)}
                    onPressOut={() => handlePressOut(buttonScale1)}
                    activeOpacity={0.9}
                  >
                    {/* Efecto de hover sutil */}
                    <View style={[
                      {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: pastelOrange,
                      },
                      tw`opacity-10`
                    ]} />

                    <View style={tw`flex-row items-center justify-center`}>

                      <Text style={[
                        tw`text-xl font-bold`,
                        {
                          letterSpacing: 0.5,
                          color: pastelOrangeDark
                        }
                      ]}>
                        Cliente
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>

                {/* Botón Trabajador */}
                <Animated.View style={{ transform: [{ scale: buttonScale2 }] }}>
                  <TouchableOpacity
                    style={[
                      tw`bg-white rounded-2xl py-5 relative overflow-hidden`,
                      {
                        borderWidth: 2,
                        borderColor: pastelOrangeDark,
                        shadowColor: pastelOrangeDark,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 5,
                      }
                    ]}
                    onPress={() => navigation.navigate('TrabajadorTabs')}
                    onPressIn={() => handlePressIn(buttonScale2)}
                    onPressOut={() => handlePressOut(buttonScale2)}
                    activeOpacity={0.9}
                  >
                    <View style={[
                      {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: pastelOrange,
                      },
                      tw`opacity-10`
                    ]} />

                    <View style={tw`flex-row items-center justify-center`}>

                      <Text style={[
                        tw`text-xl font-bold`,
                        {
                          letterSpacing: 0.5,
                          color: pastelOrangeDark
                        }
                      ]}>
                        Trabajador
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>

                {/* Botón Empresa */}
                <Animated.View style={{ transform: [{ scale: buttonScale3 }] }}>
                  <TouchableOpacity
                    style={[
                      tw`bg-white rounded-2xl p-5 mt-2 relative overflow-hidden`,
                      {
                        borderWidth: 2,
                        borderColor: pastelOrangeDark, // Gris elegante para empresa
                        shadowColor: pastelOrangeDark,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 5,
                      }
                    ]}
                    onPress={() => navigation.navigate('CompanyScreen')}
                    onPressIn={() => handlePressIn(buttonScale3)}
                    onPressOut={() => handlePressOut(buttonScale3)}
                    activeOpacity={0.9}
                  >
                    <View style={[
                      {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: pastelOrangeDark,
                      },
                      tw`opacity-5`
                    ]} />

                    <View style={tw`flex-row items-center justify-center`}>

                      <Text style={[
                        tw`text-xl font-bold`,
                        {
                          letterSpacing: 0.5,
                          color: pastelOrangeDark
                        }
                      ]}>
                        Empresa
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Footer decorativo */}
              <View style={tw`mt-8 pt-6 border-t border-gray-100`}>
                <Text style={tw`text-center text-gray-400 text-sm`}>
                  Elige tu perfil para comenzar
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default HomeScreen;