import { View, Text, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons, FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { useRef, useEffect } from 'react';

// Importa los colores naranjas
const ORANGE_PRIMARY = '#FF6B35';
const ORANGE_SECONDARY = '#FF8C42';
const ORANGE_ACCENT = '#FFB347';
const ORANGE_LIGHTER = '#FFD4B3';
const ORANGE_DARK = '#FF4500';
const ORANGE_DARKER = '#E55100';

const WorkerProfileScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const meData = {
    id: "12345",
  }

  // Datos de ejemplo
  const workerData = {
    id: "12345",
    name: "Carlos Méndez",
    profession: "Electricista certificado",
    rating: 4.7,
    completedJobs: 124,
    profilePhoto: "https://media.istockphoto.com/id/1090878494/es/foto/retrato-de-joven-sonriente-a-hombre-guapo-en-camiseta-polo-azul-aislado-sobre-fondo-gris-de.jpg?s=612x612&w=0&k=20&c=dHFsDEJSZ1kuSO4wTDAEaGOJEF-HuToZ6Gt-E2odc6U=",
    skills: ["Instalaciones eléctricas", "Reparación de cortocircuitos", "Paneles solares", "Cableado estructurado"],
    experience: "8 años de experiencia trabajando en proyectos residenciales e industriales",
    education: "Técnico en Electricidad - Instituto Tecnológico Nacional (2015)",
    about: "Electricista con amplia experiencia en soluciones energéticas eficientes y reparaciones urgentes.",
    badges: ["Verificado", "Top Rated", "Respuesta Rápida"],
    jobs: [
      {
        id: 1,
        title: "Instalación eléctrica completa",
        client: "María González",
        date: "15 Ene 2023",
        rating: 5,
        description: "Instalación completa en apartamento nuevo",
        price: "$450"
      },
      {
        id: 2,
        title: "Reparación de cortocircuito",
        client: "José Rodríguez",
        date: "2 Mar 2023",
        rating: 4,
        description: "Localización y reparación de falla en panel principal",
        price: "$120"
      },
      {
        id: 3,
        title: "Instalación de paneles solares",
        client: "EcoEnergía S.A.",
        date: "10 Abr 2023",
        rating: 5,
        description: "Sistema fotovoltaico de 5kW para empresa",
        price: "$2,500"
      }
    ]
  };

  // Componente de estrellas de rating con colores naranjas
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesome key={i} name="star" size={16} color={"white"} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesome key={i} name="star-half-full" size={16} color={"white"} />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={16} color={"white"} />);
      }
    }

    return (
      <View style={tw`flex-row items-center`}>
        {stars}
        <Text style={[tw`ml-2 font-semibold`, { color: "white" }]}>({rating.toFixed(1)})</Text>
      </View>
    );
  };

  return (
    <ScrollView style={tw`bg-gray-50`} showsVerticalScrollIndicator={false}>
      {/* Header del perfil con gradiente */}
      <Animated.View
        style={[
          tw`pt-12 pb-8 relative overflow-hidden`,
          { backgroundColor: ORANGE_PRIMARY, opacity: fadeAnim }
        ]}
      >
        {/* Elementos decorativos */}
        <View style={[
          tw`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20`,
          { backgroundColor: ORANGE_ACCENT }
        ]} />
        <View style={[
          tw`absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10`,
          { backgroundColor: ORANGE_LIGHTER }
        ]} />

        <View style={tw`items-center relative z-10`}>
          {/* Foto de perfil con anillo animado */}
          <View style={[
            tw`w-36 h-36 rounded-full p-1 shadow-2xl`,
            { backgroundColor: ORANGE_LIGHTER }
          ]}>
            <Image
              source={{ uri: workerData.profilePhoto }}
              style={tw`w-full h-full rounded-full`}
            />
            {/* Badge de verificado */}
            <View style={[
              tw`absolute -bottom-2 -right-2 w-10 h-10 rounded-full items-center justify-center border-4 border-white`,
              { backgroundColor: ORANGE_DARK }
            ]}>
              <Ionicons name="checkmark" size={20} color="white" />
            </View>
          </View>

          <Text style={tw`mt-6 text-3xl font-bold text-white text-center`}>
            {workerData.name}
          </Text>
          <Text style={tw`text-xl text-white opacity-90 mb-4`}>
            {workerData.profession}
          </Text>

          {/* Stats row */}
          <View style={tw`flex-row items-center justify-center space-x-8`}>
            <View style={tw`items-center`}>
              {renderStars(workerData.rating)}
            </View>
            <View style={tw`w-px h-8 bg-white opacity-30`} />
            <View style={tw`items-center`}>
              <Text style={tw`text-white font-bold text-lg`}>{workerData.completedJobs}</Text>
              <Text style={tw`text-white opacity-80 text-sm`}>trabajos</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Badges section */}
      <View style={tw`px-4 -mt-4 mb-6 relative z-20`}>
        <View style={tw`bg-white rounded-2xl p-4 shadow-md flex-row justify-center space-x-2`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            
          >
          {workerData.badges.map((badge, index) => (
            <View
            key={index}
            style={[
              tw`px-3 py-2 rounded-full flex-row items-center`,
                { backgroundColor: ORANGE_LIGHTER }
              ]}
            >
              <Ionicons
                name={badge === "Verificado" ? "shield-checkmark" : badge === "Top Rated" ? "star" : "flash"}
                size={14}
                color={ORANGE_DARKER}
                style={tw`mr-1`}
              />
              <Text style={[tw`text-xs font-bold`, { color: ORANGE_DARKER }]}>{badge}</Text>
            </View>
          ))}
          </ScrollView>
        </View>
      </View>

      {/* Sección de Hoja de Vida */}
      <Animated.View
        style={[
          tw`mx-4 mb-6 bg-white rounded-2xl shadow-lg overflow-hidden`,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[tw`p-1`, { backgroundColor: ORANGE_PRIMARY }]} />
        <View style={tw`p-6`}>
          <View style={tw`flex-row items-center mb-6`}>
            <View style={[
              tw`w-12 h-12 rounded-xl items-center justify-center mr-4`,
              { backgroundColor: ORANGE_LIGHTER }
            ]}>
              <Ionicons name="document-text" size={24} color={ORANGE_DARKER} />
            </View>
            <Text style={tw`text-xl font-bold text-gray-900`}>Hoja de Vida</Text>
          </View>

          {/* Habilidades mejoradas */}
          <View style={tw`mb-6`}>
            <Text style={[tw`font-bold text-lg mb-3`, { color: ORANGE_DARK }]}>🔧 Habilidades</Text>
            <View style={tw`flex-row flex-wrap`}>
              {workerData.skills.map((skill, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    tw`rounded-full px-4 py-2 mr-2 mb-2 border-2 shadow-sm`,
                    {
                      backgroundColor: ORANGE_ACCENT,
                      borderColor: ORANGE_PRIMARY
                    }
                  ]}
                  activeOpacity={0.8}
                >
                  <Text style={[tw`font-semibold`, { color: ORANGE_DARKER }]}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Experiencia */}
          <View style={tw`mb-6`}>
            <Text style={[tw`font-bold text-lg mb-3`, { color: ORANGE_DARK }]}>💼 Experiencia</Text>
            <View style={[tw`p-4 rounded-xl`, { backgroundColor: ORANGE_LIGHTER }]}>
              <Text style={tw`text-gray-700 leading-6`}>{workerData.experience}</Text>
            </View>
          </View>

          {/* Educación */}
          <View style={tw`mb-6`}>
            <Text style={[tw`font-bold text-lg mb-3`, { color: ORANGE_DARK }]}>🎓 Educación</Text>
            <View style={[tw`p-4 rounded-xl`, { backgroundColor: ORANGE_LIGHTER }]}>
              <Text style={tw`text-gray-700 leading-6`}>{workerData.education}</Text>
            </View>
          </View>

          {/* Acerca de */}
          <View>
            <Text style={[tw`font-bold text-lg mb-3`, { color: ORANGE_DARK }]}>ℹ️ Acerca de</Text>
            <View style={[tw`p-4 rounded-xl`, { backgroundColor: ORANGE_LIGHTER }]}>
              <Text style={tw`text-gray-700 leading-6`}>{workerData.about}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Trabajos realizados mejorados */}
      <Animated.View
        style={[
          tw`mx-4 mb-6 bg-white rounded-2xl shadow-lg overflow-hidden`,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[tw`p-1`, { backgroundColor: ORANGE_PRIMARY }]} />
        <View style={tw`p-6`}>
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View style={tw`flex-row items-center`}>
              <View style={[
                tw`w-12 h-12 rounded-xl items-center justify-center mr-4`,
                { backgroundColor: ORANGE_LIGHTER }
              ]}>
                <Ionicons name="briefcase" size={24} color={ORANGE_DARKER} />
              </View>
              <Text style={tw`text-xl font-bold text-gray-900`}>Trabajos Recientes</Text>
            </View>
            <View style={[
              tw`px-3 py-1 rounded-full`,
              { backgroundColor: ORANGE_ACCENT }
            ]}>
              <Text style={[tw`text-sm font-bold`, { color: ORANGE_DARKER }]}>
                {workerData.jobs.length}
              </Text>
            </View>
          </View>

          {workerData.jobs.map((job, index) => (
            <TouchableOpacity
              key={job.id}
              style={[
                tw`mb-4 p-4 rounded-xl border-l-4`,
                {
                  backgroundColor: ORANGE_LIGHTER,
                  borderLeftColor: ORANGE_PRIMARY
                }
              ]}
              activeOpacity={0.9}
            >
              <View style={tw`flex-row justify-between items-start mb-2`}>
                <Text style={tw`font-bold text-gray-800 flex-1 text-lg`}>{job.title}</Text>
                <Text style={[tw`font-bold text-lg ml-2`, { color: ORANGE_DARK }]}>
                  {job.price}
                </Text>
              </View>

              <View style={tw`flex-row items-center mb-3`}>
                <Ionicons name="person" size={16} color={ORANGE_PRIMARY} />
                <Text style={tw`text-gray-600 ml-1 mr-3`}>{job.client}</Text>
                <Ionicons name="calendar" size={16} color={ORANGE_PRIMARY} />
                <Text style={tw`text-gray-600 ml-1`}>{job.date}</Text>
              </View>

              <View style={tw`mb-3`}>
                {renderStars(job.rating)}
              </View>

              <Text style={tw`text-gray-700 leading-5`}>{job.description}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              tw`mt-4 p-4 rounded-xl flex-row items-center justify-center border-2 border-dashed`,
              { borderColor: ORANGE_PRIMARY }
            ]}
            activeOpacity={0.8}
          >
            <Text style={[tw`font-bold text-lg mr-2`, { color: ORANGE_PRIMARY }]}>
              Ver todos los trabajos
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color={ORANGE_PRIMARY} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Botón de contacto mejorado */}
      {workerData.id !== meData.id && (
        <View style={tw`px-4 pb-8`}>
          <TouchableOpacity
            style={[
              tw`py-4 rounded-2xl items-center justify-center shadow-lg flex-row`,
              { backgroundColor: ORANGE_PRIMARY }
            ]}
            activeOpacity={0.9}
          >
            <Ionicons name="chatbubble" size={24} color="white" style={tw`mr-3`} />
            <Text style={tw`text-white font-bold text-xl`}>
              Contactar a {workerData.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>

          {/* Botones adicionales */}
          <View style={tw`flex-row mt-4 space-x-4`}>
            <TouchableOpacity
              style={[
                tw`flex-1 py-3 rounded-xl items-center justify-center border-2`,
                { borderColor: ORANGE_PRIMARY }
              ]}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={20} color={ORANGE_PRIMARY} />
              <Text style={[tw`font-semibold mt-1`, { color: ORANGE_PRIMARY }]}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                tw`flex-1 py-3 rounded-xl items-center justify-center border-2`,
                { borderColor: ORANGE_PRIMARY }
              ]}
              activeOpacity={0.8}
            >
              <Ionicons name="bookmark" size={20} color={ORANGE_PRIMARY} />
              <Text style={[tw`font-semibold mt-1`, { color: ORANGE_PRIMARY }]}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default WorkerProfileScreen;