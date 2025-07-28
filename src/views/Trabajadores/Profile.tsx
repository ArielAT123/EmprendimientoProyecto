import { View, Text, ScrollView, Image, TouchableOpacity, Animated, Modal, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons, FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { useRef, useEffect, useState } from 'react';

// Importa los colores naranjas - misma línea gráfica del home
const ORANGE_PRIMARY = '#FF6B35';
const ORANGE_SECONDARY = '#FF8C42';
const ORANGE_ACCENT = '#FFB347';
const ORANGE_LIGHTER = '#FFD4B3';
const ORANGE_DARK = '#FF4500';
const ORANGE_DARKER = '#E55100';

const WorkerProfileScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Estados para la funcionalidad de trabajos completados
  const [jobDetailsModalVisible, setJobDetailsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [allJobsModalVisible, setAllJobsModalVisible] = useState(false);

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

  // Datos de ejemplo - con más trabajos para funcionalidad completa
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
    portfolio: [
      {
        id: 'port_001',
        title: 'Sistema Solar Residencial',
        description: 'Instalación completa de paneles solares 5kW',
        image: 'https://picsum.photos/400/300?random=301',
        client: 'EcoHogar S.A.',
        date: 'Marzo 2024',
        category: 'Energía Solar'
      },
      {
        id: 'port_002',
        title: 'Remodelación Eléctrica Completa',
        description: 'Renovación total del sistema eléctrico de casa',
        image: 'https://picsum.photos/400/300?random=302',
        client: 'Familia Rodríguez',
        date: 'Febrero 2024',
        category: 'Remodelación'
      },
      {
        id: 'port_003',
        title: 'Iluminación LED Comercial',
        description: 'Cambio a sistema LED en oficinas corporativas',
        image: 'https://picsum.photos/400/300?random=303',
        client: 'Corporativo Plus',
        date: 'Enero 2024',
        category: 'Iluminación'
      }
    ],
    certifications: [
      {
        id: 'cert_001',
        name: 'Certificación Eléctrica Nacional',
        issuer: 'INEN Ecuador',
        date: '2023',
        validUntil: '2026',
        image: 'https://picsum.photos/200/150?random=401'
      },
      {
        id: 'cert_002',
        name: 'Especialización en Energía Solar',
        issuer: 'Instituto Tecnológico',
        date: '2022',
        validUntil: 'Permanente',
        image: 'https://picsum.photos/200/150?random=402'
      }
    ],
    jobs: [
      {
        id: 1,
        title: "Instalación eléctrica completa",
        client: "María González",
        clientPhoto: "https://randomuser.me/api/portraits/women/45.jpg",
        date: "15 Ene 2024",
        rating: 5,
        description: "Instalación completa en apartamento nuevo de 3 habitaciones",
        price: "$450",
        duration: "3 días",
        location: "Norte de Guayaquil",
        category: "Instalación",
        status: "Completado",
        paymentMethod: "Transferencia",
        clientReview: "Excelente trabajo, muy profesional y puntual. Recomendado 100%",
        beforeImages: [
          'https://picsum.photos/300/200?random=101',
          'https://picsum.photos/300/200?random=102'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=103',
          'https://picsum.photos/300/200?random=104'
        ],
        materials: ["Cable eléctrico", "Breakers", "Tomacorrientes", "Interruptores"]
      },
      {
        id: 2,
        title: "Reparación de cortocircuito",
        client: "José Rodríguez",
        clientPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "2 Mar 2024",
        rating: 4,
        description: "Localización y reparación de falla en panel principal",
        price: "$120",
        duration: "1 día",
        location: "Centro de Guayaquil",
        category: "Reparación",
        status: "Completado",
        paymentMethod: "Efectivo",
        clientReview: "Muy eficiente, solucionó el problema rápidamente.",
        beforeImages: [
          'https://picsum.photos/300/200?random=201'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=202'
        ],
        materials: ["Breaker nuevo", "Cable de reemplazo"]
      },
      {
        id: 3,
        title: "Instalación de paneles solares",
        client: "EcoEnergía S.A.",
        clientPhoto: "https://randomuser.me/api/portraits/women/28.jpg",
        date: "10 Abr 2024",
        rating: 5,
        description: "Sistema fotovoltaico de 5kW para empresa",
        price: "$2,500",
        duration: "5 días",
        location: "Sur de Guayaquil",
        category: "Energía Solar",
        status: "Completado",
        paymentMethod: "Transferencia por etapas",
        clientReview: "Proyecto excepcional, reducimos 70% la factura eléctrica.",
        beforeImages: [
          'https://picsum.photos/300/200?random=301',
          'https://picsum.photos/300/200?random=302'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=303',
          'https://picsum.photos/300/200?random=304',
          'https://picsum.photos/300/200?random=305'
        ],
        materials: ["Paneles solares", "Inversor", "Baterías", "Sistema de montaje"]
      },
      {
        id: 4,
        title: "Mantenimiento eléctrico edificio",
        client: "Administración Torres del Sol",
        clientPhoto: "https://randomuser.me/api/portraits/men/45.jpg",
        date: "25 Mar 2024",
        rating: 4.5,
        description: "Mantenimiento preventivo en edificio de 8 pisos",
        price: "$800",
        duration: "2 días",
        location: "Norte de Guayaquil",
        category: "Mantenimiento",
        status: "Completado",
        paymentMethod: "Cheque",
        clientReview: "Muy organizado, trabajó sin interrumpir a los residentes.",
        beforeImages: [
          'https://picsum.photos/300/200?random=401'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=402'
        ],
        materials: ["Materiales de limpieza", "Contactos de repuesto", "Fusibles"]
      },
      {
        id: 5,
        title: "Instalación de iluminación LED",
        client: "Restaurante La Plaza",
        clientPhoto: "https://randomuser.me/api/portraits/women/35.jpg",
        date: "18 Feb 2024",
        rating: 5,
        description: "Cambio completo a iluminación LED en restaurante",
        price: "$350",
        duration: "2 días",
        location: "Centro de Guayaquil",
        category: "Iluminación",
        status: "Completado",
        paymentMethod: "Transferencia",
        clientReview: "El ambiente del restaurante mejoró increíblemente, clientes encantados.",
        beforeImages: [
          'https://picsum.photos/300/200?random=501'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=502',
          'https://picsum.photos/300/200?random=503'
        ],
        materials: ["Luces LED", "Reguladores", "Cables especiales"]
      },
      {
        id: 6,
        title: "Reparación de aire acondicionado",
        client: "Hotel Costa Azul",
        clientPhoto: "https://randomuser.me/api/portraits/men/22.jpg",
        date: "5 Feb 2024",
        rating: 4.8,
        description: "Mantenimiento y reparación de sistema HVAC en hotel",
        price: "$680",
        duration: "3 días",
        location: "Centro de Guayaquil",
        category: "Climatización",
        status: "Completado",
        paymentMethod: "Transferencia",
        clientReview: "Excelente servicio técnico, aires funcionando perfectamente.",
        beforeImages: [
          'https://picsum.photos/300/200?random=601'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=602'
        ],
        materials: ["Refrigerante", "Filtros", "Componentes eléctricos"]
      },
      {
        id: 7,
        title: "Instalación de sistema de seguridad",
        client: "Oficinas Empresariales",
        clientPhoto: "https://randomuser.me/api/portraits/women/18.jpg",
        date: "28 Ene 2024",
        rating: 5,
        description: "Cámaras de seguridad y alarmas en oficinas corporativas",
        price: "$950",
        duration: "4 días",
        location: "Norte de Guayaquil",
        category: "Seguridad",
        status: "Completado",
        paymentMethod: "Cheque",
        clientReview: "Sistema de seguridad de primera calidad, muy profesional.",
        beforeImages: [
          'https://picsum.photos/300/200?random=701',
          'https://picsum.photos/300/200?random=702'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=703',
          'https://picsum.photos/300/200?random=704'
        ],
        materials: ["Cámaras IP", "DVR", "Cableado", "Sensores"]
      },
      {
        id: 8,
        title: "Reparación de electrodomésticos",
        client: "Familia Martínez",
        clientPhoto: "https://randomuser.me/api/portraits/men/40.jpg",
        date: "20 Ene 2024",
        rating: 4.3,
        description: "Reparación de lavadora y refrigerador domésticos",
        price: "$145",
        duration: "1 día",
        location: "Sur de Guayaquil",
        category: "Electrodomésticos",
        status: "Completado",
        paymentMethod: "Efectivo",
        clientReview: "Buen trabajo, electrodomésticos funcionando como nuevos.",
        beforeImages: [
          'https://picsum.photos/300/200?random=801'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=802'
        ],
        materials: ["Repuestos varios", "Aceite lubricante", "Componentes"]
      },
      {
        id: 9,
        title: "Instalación de red de datos",
        client: "Centro de Estudios TechMax",
        clientPhoto: "https://randomuser.me/api/portraits/women/33.jpg",
        date: "12 Ene 2024",
        rating: 4.9,
        description: "Red estructurada para laboratorio de computación",
        price: "$1,200",
        duration: "6 días",
        location: "Centro de Guayaquil",
        category: "Redes",
        status: "Completado",
        paymentMethod: "Transferencia por etapas",
        clientReview: "Red súper rápida y estable, estudiantes muy contentos.",
        beforeImages: [
          'https://picsum.photos/300/200?random=901'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=902',
          'https://picsum.photos/300/200?random=903'
        ],
        materials: ["Cable UTP", "Switch", "Patch panels", "Conectores"]
      },
      {
        id: 10,
        title: "Mantenimiento de ascensor",
        client: "Edificio Residencial Torres",
        clientPhoto: "https://randomuser.me/api/portraits/men/55.jpg",
        date: "8 Ene 2024",
        rating: 4.6,
        description: "Revisión completa y mantenimiento preventivo de ascensor",
        price: "$420",
        duration: "2 días",
        location: "Norte de Guayaquil",
        category: "Mantenimiento",
        status: "Completado",
        paymentMethod: "Transferencia",
        clientReview: "Ascensor funcionando suavemente, servicio confiable.",
        beforeImages: [
          'https://picsum.photos/300/200?random=1001'
        ],
        afterImages: [
          'https://picsum.photos/300/200?random=1002'
        ],
        materials: ["Lubricantes", "Cables de acero", "Sensores de seguridad"]
      }
    ]
  };

  // Función para abrir modal de detalles del trabajo
  const openJobDetails = (job: any) => {
    setSelectedJob(job);
    setJobDetailsModalVisible(true);
  };

  // Función para obtener color según rating
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return '#10B981'; // Verde
    if (rating >= 4.0) return '#F59E0B'; // Amarillo
    return '#EF4444'; // Rojo
  };

  // Función para obtener color según categoría
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'instalación': return ORANGE_PRIMARY;
      case 'reparación': return '#EF4444';
      case 'energía solar': return '#10B981';
      case 'mantenimiento': return '#3B82F6';
      case 'iluminación': return '#F59E0B';
      case 'climatización': return '#06B6D4';
      case 'seguridad': return '#8B5CF6';
      case 'electrodomésticos': return '#EC4899';
      case 'redes': return '#10B981';
      default: return ORANGE_PRIMARY;
    }
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
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Espacio arriba del header */}
      <View style={tw`h-6`} />
      
      {/* Header: mismo estilo que TrabajadorHomeScreen */}
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
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: workerData.profilePhoto }}
              style={tw`w-16 h-16 rounded-full mr-4`}
            />
            <View>
              <Text style={{ color: '#111', fontSize: 24, fontWeight: 'bold' }}>
                {workerData.name}
              </Text>
              <Text style={{ color: '#666', fontSize: 14, opacity: 0.9 }}>
                {workerData.profession} • ⭐ {workerData.rating} ({workerData.completedJobs} trabajos)
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            {/* Badge de verificado mejorado */}
            <View style={[
              tw`w-12 h-12 rounded-full items-center justify-center border-2 shadow-lg`,
              { backgroundColor: '#10B981', borderColor: '#D1FAE5' }
            ]}>
              <MaterialIcons name="verified" size={24} color="white" />
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={tw`bg-white`} showsVerticalScrollIndicator={false}>

      {/* Badges section */}
      <View style={tw`px-4 mt-4 mb-6`}>
        <View style={tw`bg-white rounded-xl p-4 shadow-sm border border-[${ORANGE_LIGHTER}] flex-row justify-center`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {workerData.badges.map((badge, index) => (
              <View
                key={index}
                style={[
                  tw`px-3 py-2 rounded-full flex-row items-center mr-2`,
                  { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
                ]}
              >
                <Ionicons
                  name={badge === "Verificado" ? "shield-checkmark" : badge === "Top Rated" ? "star" : "flash"}
                  size={14}
                  color={ORANGE_PRIMARY}
                  style={tw`mr-1`}
                />
                <Text style={[tw`text-xs font-bold`, { color: '#1F2937' }]}>{badge}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Sección de Hoja de Vida */}
      <Animated.View
        style={[
          tw`mx-4 mb-6 bg-white rounded-xl shadow-sm border border-[${ORANGE_LIGHTER}]`,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[tw`p-1 rounded-t-xl`, { backgroundColor: ORANGE_PRIMARY }]} />
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={[
              tw`w-10 h-10 rounded-lg items-center justify-center mr-3`,
              { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
            ]}>
              <Ionicons name="document-text" size={20} color={ORANGE_PRIMARY} />
            </View>
            <Text style={[tw`text-lg font-bold`, { color: ORANGE_PRIMARY }]}>Hoja de Vida</Text>
          </View>

          {/* Habilidades mejoradas */}
          <View style={tw`mb-4`}>
            <Text style={[tw`font-bold text-base mb-3`, { color: ORANGE_DARK }]}>🔧 Habilidades</Text>
            <View style={tw`flex-row flex-wrap`}>
              {workerData.skills.map((skill, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    tw`rounded-full px-3 py-2 mr-2 mb-2 border shadow-sm`,
                    {
                      backgroundColor: 'white',
                      borderColor: ORANGE_LIGHTER
                    }
                  ]}
                  activeOpacity={0.8}
                >
                  <Text style={[tw`font-medium text-sm`, { color: '#1F2937' }]}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Experiencia */}
          <View style={tw`mb-4`}>
            <Text style={[tw`font-bold text-base mb-3`, { color: ORANGE_DARK }]}>💼 Experiencia</Text>
            <View style={tw`p-3 rounded-lg bg-white border border-gray-200`}>
              <Text style={tw`text-gray-700 leading-5`}>{workerData.experience}</Text>
            </View>
          </View>

          {/* Educación */}
          <View style={tw`mb-4`}>
            <Text style={[tw`font-bold text-base mb-3`, { color: ORANGE_DARK }]}>🎓 Educación</Text>
            <View style={tw`p-3 rounded-lg bg-white border border-gray-200`}>
              <Text style={tw`text-gray-700 leading-5`}>{workerData.education}</Text>
            </View>
          </View>

          {/* Acerca de */}
          <View>
            <Text style={[tw`font-bold text-base mb-3`, { color: ORANGE_DARK }]}>ℹ️ Acerca de</Text>
            <View style={tw`p-3 rounded-lg bg-white border border-gray-200`}>
              <Text style={tw`text-gray-700 leading-5`}>{workerData.about}</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Trabajos realizados mejorados */}
      <Animated.View
        style={[
          tw`mx-4 mb-6 bg-white rounded-xl shadow-sm border border-[${ORANGE_LIGHTER}]`,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[tw`p-1 rounded-t-xl`, { backgroundColor: ORANGE_PRIMARY }]} />
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <View style={tw`flex-row items-center`}>
              <View style={[
                tw`w-10 h-10 rounded-lg items-center justify-center mr-3`,
                { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
              ]}>
                <MaterialIcons name="work-history" size={20} color={ORANGE_PRIMARY} />
              </View>
              <View>
                <Text style={[tw`text-lg font-bold`, { color: ORANGE_PRIMARY }]}>Trabajos Recientes</Text>
                <Text style={tw`text-gray-600 text-sm`}>Proyectos completados exitosamente</Text>
              </View>
            </View>
            <View style={[
              tw`px-2 py-1 rounded-full`,
              { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
            ]}>
              <Text style={[tw`text-sm font-bold`, { color: ORANGE_PRIMARY }]}>
                {workerData.jobs.length}
              </Text>
            </View>
          </View>

          {/* Mostrar solo los primeros 3 trabajos */}
          {workerData.jobs.slice(0, 3).map((job, index) => (
            <TouchableOpacity
              key={job.id}
              style={[
                tw`mb-3 p-3 rounded-lg border-l-4`,
                {
                  backgroundColor: 'white',
                  borderLeftColor: getCategoryColor(job.category),
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }
              ]}
              activeOpacity={0.9}
              onPress={() => openJobDetails(job)}
            >
              <View style={tw`flex-row items-start`}>
                <Image
                  source={{ uri: job.clientPhoto }}
                  style={tw`w-12 h-12 rounded-full`}
                  resizeMode="cover"
                />
                <View style={tw`flex-1 ml-3`}>
                  <View style={tw`flex-row justify-between items-start mb-2`}>
                    <Text style={tw`font-bold text-gray-800 flex-1 text-base`}>{job.title}</Text>
                    <Text style={[tw`font-bold text-base ml-2`, { color: getCategoryColor(job.category) }]}>
                      {job.price}
                    </Text>
                  </View>

                  <View style={tw`flex-row items-center mb-2`}>
                    <MaterialIcons name="person" size={14} color={ORANGE_PRIMARY} />
                    <Text style={tw`text-gray-600 ml-1 mr-3 text-sm`}>{job.client}</Text>
                    <MaterialIcons name="calendar-today" size={14} color={ORANGE_PRIMARY} />
                    <Text style={tw`text-gray-600 ml-1 text-sm`}>{job.date}</Text>
                  </View>

                  <View style={tw`flex-row items-center justify-between mb-2`}>
                    <View style={tw`flex-row items-center`}>
                      <MaterialIcons name="star" size={14} color="#FFBF00" />
                      <Text style={tw`text-yellow-600 font-bold ml-1 text-sm`}>{job.rating}</Text>
                      <Text style={tw`text-gray-500 text-xs ml-2`}>• {job.duration}</Text>
                    </View>
                    
                    <View style={[
                      tw`px-2 py-1 rounded-full`,
                      { backgroundColor: getCategoryColor(job.category) + '20' }
                    ]}>
                      <Text style={[tw`text-xs font-bold`, { color: getCategoryColor(job.category) }]}>
                        {job.category}
                      </Text>
                    </View>
                  </View>

                  <Text style={tw`text-gray-700 leading-4 mb-2 text-sm`} numberOfLines={2}>{job.description}</Text>
                  
                  {job.clientReview && (
                    <View style={tw`bg-gray-50 p-2 rounded-lg mt-2 border border-gray-200`}>
                      <Text style={tw`text-gray-600 text-xs italic`}>
                        💬 "{job.clientReview}"
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              
              {/* Indicador visual de que es clickeable */}
              <View style={tw`absolute top-2 right-2`}>
                <MaterialIcons name="arrow-forward-ios" size={14} color={getCategoryColor(job.category)} />
              </View>
            </TouchableOpacity>
          ))}

          {/* Botón para ver todos los trabajos */}
          <TouchableOpacity
            style={[
              tw`mt-3 p-3 rounded-lg flex-row items-center justify-center border-2 border-dashed`,
              { borderColor: ORANGE_PRIMARY }
            ]}
            activeOpacity={0.8}
            onPress={() => setAllJobsModalVisible(true)}
          >
            <MaterialIcons name="visibility" size={18} color={ORANGE_PRIMARY} style={tw`mr-2`} />
            <Text style={[tw`font-bold text-base`, { color: ORANGE_PRIMARY }]}>
              Ver todos los trabajos ({workerData.jobs.length})
            </Text>
            <MaterialIcons name="arrow-forward" size={18} color={ORANGE_PRIMARY} style={tw`ml-2`} />
          </TouchableOpacity>

          {/* Estadísticas rápidas */}
          <View style={tw`mt-4 pt-3 border-t border-gray-200`}>
            <Text style={tw`text-center text-gray-600 text-sm mb-3`}>📊 Estadísticas de Proyectos</Text>
            <View style={tw`flex-row justify-around`}>
              <View style={tw`items-center`}>
                <Text style={tw`text-xl font-bold text-green-600`}>
                  {workerData.jobs.filter(job => job.rating >= 4.5).length}
                </Text>
                <Text style={tw`text-gray-600 text-xs`}>Excelentes</Text>
              </View>
              <View style={tw`items-center`}>
                <Text style={tw`text-xl font-bold text-[${ORANGE_PRIMARY}]`}>
                  ${workerData.jobs.reduce((sum, job) => sum + parseFloat(job.price.replace('$', '').replace(',', '')), 0).toLocaleString()}
                </Text>
                <Text style={tw`text-gray-600 text-xs`}>Total Ganado</Text>
              </View>
              <View style={tw`items-center`}>
                <Text style={tw`text-xl font-bold text-blue-600`}>
                  {(workerData.jobs.reduce((sum, job) => sum + job.rating, 0) / workerData.jobs.length).toFixed(1)}
                </Text>
                <Text style={tw`text-gray-600 text-xs`}>Rating Prom.</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Sección de Portafolio */}
      <Animated.View
        style={[
          tw`mx-4 mb-6 bg-white rounded-xl shadow-sm border border-[${ORANGE_LIGHTER}]`,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[tw`p-1 rounded-t-xl`, { backgroundColor: ORANGE_PRIMARY }]} />
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={[
              tw`w-10 h-10 rounded-lg items-center justify-center mr-3`,
              { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
            ]}>
              <MaterialIcons name="photo-library" size={20} color={ORANGE_PRIMARY} />
            </View>
            <View>
              <Text style={[tw`text-lg font-bold`, { color: ORANGE_PRIMARY }]}>Portafolio</Text>
              <Text style={tw`text-gray-600 text-sm`}>Proyectos destacados</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {workerData.portfolio.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={tw`mr-4 w-48 bg-white rounded-xl overflow-hidden border border-gray-200`}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: item.image }}
                  style={tw`w-full h-32`}
                  resizeMode="cover"
                />
                <View style={tw`p-3`}>
                  <Text style={tw`font-bold text-gray-800 text-sm mb-1`}>{item.title}</Text>
                  <Text style={tw`text-gray-600 text-xs mb-2`}>{item.description}</Text>
                  <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-gray-500 text-xs`}>{item.client}</Text>
                    <View style={[
                      tw`px-2 py-1 rounded-full`,
                      { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
                    ]}>
                      <Text style={[tw`text-xs font-bold`, { color: ORANGE_PRIMARY }]}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                  <Text style={tw`text-gray-400 text-xs mt-1`}>{item.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Sección de Certificaciones */}
      <Animated.View
        style={[
          tw`mx-4 mb-6 bg-white rounded-xl shadow-sm border border-[${ORANGE_LIGHTER}]`,
          { opacity: fadeAnim }
        ]}
      >
        <View style={[tw`p-1 rounded-t-xl`, { backgroundColor: ORANGE_PRIMARY }]} />
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <View style={[
              tw`w-10 h-10 rounded-lg items-center justify-center mr-3`,
              { backgroundColor: 'white', borderWidth: 1, borderColor: ORANGE_LIGHTER }
            ]}>
              <MaterialIcons name="verified" size={20} color={ORANGE_PRIMARY} />
            </View>
            <View>
              <Text style={[tw`text-lg font-bold`, { color: ORANGE_PRIMARY }]}>Certificaciones</Text>
              <Text style={tw`text-gray-600 text-sm`}>Credenciales profesionales</Text>
            </View>
          </View>

          {workerData.certifications.map((cert, index) => (
            <TouchableOpacity
              key={cert.id}
              style={[
                tw`mb-3 p-3 rounded-lg border-l-4`,
                {
                  backgroundColor: 'white',
                  borderLeftColor: ORANGE_PRIMARY,
                  borderWidth: 1,
                  borderColor: '#E5E7EB'
                }
              ]}
              activeOpacity={0.9}
            >
              <View style={tw`flex-row`}>
                <Image
                  source={{ uri: cert.image }}
                  style={tw`w-16 h-12 rounded-lg mr-3`}
                  resizeMode="cover"
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`font-bold text-gray-800 text-base mb-1`}>{cert.name}</Text>
                  <Text style={tw`text-gray-600 text-sm mb-1`}>Emisor: {cert.issuer}</Text>
                  <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-gray-500 text-xs`}>Obtenido: {cert.date}</Text>
                    <View style={[
                      tw`px-2 py-1 rounded-full`,
                      { backgroundColor: cert.validUntil === 'Permanente' ? '#10B981' : 'white', 
                        borderWidth: cert.validUntil === 'Permanente' ? 0 : 1, 
                        borderColor: cert.validUntil === 'Permanente' ? 'transparent' : ORANGE_LIGHTER }
                    ]}>
                      <Text style={[tw`text-xs font-bold`, 
                                    { color: cert.validUntil === 'Permanente' ? 'white' : ORANGE_PRIMARY }]}>
                        {cert.validUntil === 'Permanente' ? '✓ Permanente' : `Hasta ${cert.validUntil}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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

      {/* Modal de Detalles del Trabajo */}
      <Modal
        visible={jobDetailsModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setJobDetailsModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[90%]`}>
            {selectedJob && (
              <>
                {/* Header del modal */}
                <View style={tw`relative p-4 border-b border-gray-200`}>
                  <TouchableOpacity
                    style={tw`absolute top-2 right-2 p-2`}
                    onPress={() => setJobDetailsModalVisible(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  <View style={tw`items-center pt-2`}>
                    <Image
                      source={{ uri: selectedJob.clientPhoto }}
                      style={tw`w-20 h-20 rounded-full mb-3`}
                      resizeMode="cover"
                    />
                    <Text style={tw`text-xl font-bold text-gray-800`}>{selectedJob.title}</Text>
                    <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium`}>{selectedJob.client}</Text>
                    <View style={tw`flex-row items-center mt-2`}>
                      <View style={[
                        tw`px-3 py-1 rounded-full`,
                        { backgroundColor: getCategoryColor(selectedJob.category) + '20' }
                      ]}>
                        <Text style={[tw`text-sm font-bold`, { color: getCategoryColor(selectedJob.category) }]}>
                          {selectedJob.category}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Contenido scrolleable */}
                <ScrollView style={tw`p-4`} showsVerticalScrollIndicator={false}>
                  {/* Rating y información básica */}
                  <View style={tw`mb-4`}>
                    <View style={tw`flex-row items-center justify-center mb-2`}>
                      {renderStars(selectedJob.rating)}
                    </View>
                    <Text style={tw`text-center text-gray-600 text-sm italic`}>
                      "{selectedJob.clientReview}"
                    </Text>
                  </View>

                  {/* Información del proyecto */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-3 text-lg`}>📋 Información del Proyecto</Text>
                    
                    <View style={tw`bg-gray-50 p-3 rounded-lg mb-3`}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="description" size={16} color={ORANGE_PRIMARY} />
                        <Text style={tw`text-gray-600 ml-2 font-medium`}>Descripción:</Text>
                      </View>
                      <Text style={tw`text-gray-700 ml-6`}>{selectedJob.description}</Text>
                    </View>

                    <View style={tw`flex-row mb-3`}>
                      <View style={tw`flex-1 bg-gray-50 p-3 rounded-lg mr-2`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="location-on" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-600 ml-1 text-sm font-medium`}>Ubicación:</Text>
                        </View>
                        <Text style={tw`text-gray-700 text-sm ml-5`}>{selectedJob.location}</Text>
                      </View>
                      
                      <View style={tw`flex-1 bg-gray-50 p-3 rounded-lg ml-2`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="schedule" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-600 ml-1 text-sm font-medium`}>Duración:</Text>
                        </View>
                        <Text style={tw`text-gray-700 text-sm ml-5`}>{selectedJob.duration}</Text>
                      </View>
                    </View>

                    <View style={tw`flex-row mb-3`}>
                      <View style={tw`flex-1 bg-gray-50 p-3 rounded-lg mr-2`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="event" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-600 ml-1 text-sm font-medium`}>Fecha:</Text>
                        </View>
                        <Text style={tw`text-gray-700 text-sm ml-5`}>{selectedJob.date}</Text>
                      </View>
                      
                      <View style={tw`flex-1 bg-gray-50 p-3 rounded-lg ml-2`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="payment" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-600 ml-1 text-sm font-medium`}>Pago:</Text>
                        </View>
                        <Text style={tw`text-gray-700 text-sm ml-5`}>{selectedJob.paymentMethod}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Materiales utilizados */}
                  {selectedJob.materials && selectedJob.materials.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-3`}>🔧 Materiales Utilizados</Text>
                      <View style={tw`flex-row flex-wrap`}>
                        {selectedJob.materials.map((material: string, index: number) => (
                          <View
                            key={index}
                            style={[
                              tw`rounded-full px-3 py-1 mr-2 mb-2`,
                              { backgroundColor: ORANGE_LIGHTER }
                            ]}
                          >
                            <Text style={[tw`text-xs font-medium`, { color: ORANGE_DARKER }]}>
                              {material}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Imágenes antes y después */}
                  {selectedJob.beforeImages && selectedJob.beforeImages.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-3`}>📷 Antes del Trabajo</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {selectedJob.beforeImages.map((image: string, index: number) => (
                          <Image
                            key={index}
                            source={{ uri: image }}
                            style={tw`w-32 h-24 rounded-lg mr-3`}
                            resizeMode="cover"
                          />
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {selectedJob.afterImages && selectedJob.afterImages.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-3`}>✨ Después del Trabajo</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {selectedJob.afterImages.map((image: string, index: number) => (
                          <Image
                            key={index}
                            source={{ uri: image }}
                            style={tw`w-32 h-24 rounded-lg mr-3`}
                            resizeMode="cover"
                          />
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {/* Presupuesto final */}
                  <View style={[tw`bg-white p-3 rounded-lg mb-4 border-2`, 
                                { borderColor: getCategoryColor(selectedJob.category) }]}>
                    <Text style={[tw`font-bold text-center mb-2`, 
                                  { color: getCategoryColor(selectedJob.category) }]}>
                      💰 Valor del Proyecto
                    </Text>
                    <Text style={tw`text-3xl font-bold text-center text-black`}>
                      {selectedJob.price}
                    </Text>
                  </View>
                </ScrollView>

                {/* Botón cerrar */}
                <View style={tw`p-4 border-t border-gray-200`}>
                  <TouchableOpacity
                    style={tw`bg-gray-200 py-3 rounded-lg`}
                    onPress={() => setJobDetailsModalVisible(false)}
                  >
                    <Text style={tw`text-gray-700 font-medium text-center text-base`}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de Todos los Trabajos */}
      <Modal
        visible={allJobsModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAllJobsModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[90%]`}>
            {/* Header */}
            <View style={tw`relative p-4 border-b border-gray-200`}>
              <TouchableOpacity
                style={tw`absolute top-2 right-2 p-2`}
                onPress={() => setAllJobsModalVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
              
              <View style={tw`items-center pt-2`}>
                <Text style={tw`text-xl font-bold text-gray-800`}>📋 Todos mis Trabajos</Text>
                <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium mt-1`}>
                  {workerData.jobs.length} trabajos completados
                </Text>
              </View>
            </View>

            {/* Lista de trabajos */}
            <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
              {workerData.jobs.map((job, index) => (
                <TouchableOpacity
                  key={job.id}
                  style={[
                    tw`bg-white rounded-xl p-4 mb-3 shadow-sm border-l-4`,
                    { borderLeftColor: getCategoryColor(job.category) }
                  ]}
                  onPress={() => {
                    setAllJobsModalVisible(false);
                    openJobDetails(job);
                  }}
                >
                  <View style={tw`flex-row`}>
                    <Image
                      source={{ uri: job.clientPhoto }}
                      style={tw`w-14 h-14 rounded-full`}
                      resizeMode="cover"
                    />
                    <View style={tw`flex-1 ml-3`}>
                      <View style={tw`flex-row items-center justify-between mb-1`}>
                        <Text style={tw`font-bold text-gray-800 flex-1 text-base`}>{job.title}</Text>
                        <Text style={[tw`font-bold text-lg`, { color: getCategoryColor(job.category) }]}>
                          {job.price}
                        </Text>
                      </View>

                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="person" size={14} color={ORANGE_PRIMARY} />
                        <Text style={tw`text-gray-600 ml-1 mr-3 text-sm`}>{job.client}</Text>
                        <MaterialIcons name="calendar-today" size={14} color={ORANGE_PRIMARY} />
                        <Text style={tw`text-gray-600 ml-1 text-sm`}>{job.date}</Text>
                      </View>

                      <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                          <MaterialIcons name="star" size={16} color="#FFBF00" />
                          <Text style={tw`text-yellow-600 font-bold ml-1`}>{job.rating}</Text>
                        </View>
                        
                        <View style={[
                          tw`px-2 py-1 rounded-full`,
                          { backgroundColor: getCategoryColor(job.category) + '20' }
                        ]}>
                          <Text style={[tw`text-xs font-bold`, { color: getCategoryColor(job.category) }]}>
                            {job.category}
                          </Text>
                        </View>
                      </View>

                      <Text style={tw`text-gray-600 text-sm mt-2 leading-4`} numberOfLines={2}>
                        {job.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WorkerProfileScreen;