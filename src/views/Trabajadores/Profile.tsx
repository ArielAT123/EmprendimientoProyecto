import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

const WorkerProfileScreen = () => {
  // Datos de ejemplo
  const workerData = {
    name: "Carlos Méndez",
    profession: "Electricista certificado",
    rating: 4.7,
    completedJobs: 124,
    profilePhoto: "https://media.istockphoto.com/id/1090878494/es/foto/retrato-de-joven-sonriente-a-hombre-guapo-en-camiseta-polo-azul-aislado-sobre-fondo-gris-de.jpg?s=612x612&w=0&k=20&c=dHFsDEJSZ1kuSO4wTDAEaGOJEF-HuToZ6Gt-E2odc6U=",
    skills: ["Instalaciones eléctricas", "Reparación de cortocircuitos", "Paneles solares", "Cableado estructurado"],
    experience: "8 años de experiencia trabajando en proyectos residenciales e industriales",
    education: "Técnico en Electricidad - Instituto Tecnológico Nacional (2015)",
    about: "Electricista con amplia experiencia en soluciones energéticas eficientes y reparaciones urgentes.",
    jobs: [
      {
        id: 1,
        title: "Instalación eléctrica completa",
        client: "María González",
        date: "15 Ene 2023",
        rating: 5,
        description: "Instalación completa en apartamento nuevo"
      },
      {
        id: 2,
        title: "Reparación de cortocircuito",
        client: "José Rodríguez",
        date: "2 Mar 2023",
        rating: 4,
        description: "Localización y reparación de falla en panel principal"
      },
      {
        id: 3,
        title: "Instalación de paneles solares",
        client: "EcoEnergía S.A.",
        date: "10 Abr 2023",
        rating: 5,
        description: "Sistema fotovoltaico de 5kW para empresa"
      }
    ]
  };

  // Componente de estrellas de rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FontAwesome key={i} name="star" size={16} color="#F59E0B" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FontAwesome key={i} name="star-half-full" size={16} color="#F59E0B" />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={16} color="#F59E0B" />);
      }
    }
    
    return (
      <View style={tw`flex-row items-center`}>
        {stars}
        <Text style={tw`ml-1 text-gray-600`}>({rating.toFixed(1)})</Text>
      </View>
    );
  };

  return (
    <ScrollView style={tw`bg-gray-50`}>
      {/* Header del perfil */}
      <View style={tw`py-10 bg-white pb-6 shadow-sm`}>
        <View style={tw`items-center mt-6`}>
          <Image
            source={{ uri: workerData.profilePhoto }}
            style={tw`w-32 h-32 rounded-full border-4 border-white shadow-md`}
          />
          <Text style={tw`mt-4 text-2xl font-bold text-gray-900`}>{workerData.name}</Text>
          <Text style={tw`text-lg text-blue-600`}>{workerData.profession}</Text>
          
          <View style={tw`flex-row items-center mt-2`}>
            {renderStars(workerData.rating)}
            <Text style={tw`ml-2 text-gray-500`}>{workerData.completedJobs} trabajos</Text>
          </View>
        </View>
      </View>

      {/* Sección de Hoja de Vida */}
      <View style={tw`mx-4 mt-6 bg-white rounded-xl p-5 shadow-sm`}>
        <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Hoja de Vida</Text>
        
        <View style={tw`mb-5`}>
          <Text style={tw`font-semibold text-gray-800 mb-1`}>Habilidades</Text>
          <View style={tw`flex-row flex-wrap`}>
            {workerData.skills.map((skill, index) => (
              <View key={index} style={tw`bg-blue-50 rounded-full px-3 py-1 mr-2 mb-2`}>
                <Text style={tw`text-blue-600 text-sm`}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={tw`mb-5`}>
          <Text style={tw`font-semibold text-gray-800 mb-1`}>Experiencia</Text>
          <Text style={tw`text-gray-600`}>{workerData.experience}</Text>
        </View>
        
        <View style={tw`mb-5`}>
          <Text style={tw`font-semibold text-gray-800 mb-1`}>Educación</Text>
          <Text style={tw`text-gray-600`}>{workerData.education}</Text>
        </View>
        
        <View>
          <Text style={tw`font-semibold text-gray-800 mb-1`}>Acerca de</Text>
          <Text style={tw`text-gray-600`}>{workerData.about}</Text>
        </View>
      </View>

      {/* Trabajos realizados */}
      <View style={tw`mx-4 my-6 bg-white rounded-xl p-5 shadow-sm`}>
        <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Trabajos Recientes</Text>
        
        {workerData.jobs.map((job) => (
          <View key={job.id} style={tw`mb-4 pb-4 border-b border-gray-100 last:border-0`}>
            <Text style={tw`font-semibold text-gray-800`}>{job.title}</Text>
            <Text style={tw`text-gray-500 text-sm`}>Para: {job.client} • {job.date}</Text>
            
            <View style={tw`mt-2`}>
              {renderStars(job.rating)}
            </View>
            
            <Text style={tw`mt-2 text-gray-600`}>{job.description}</Text>
          </View>
        ))}
        
        <TouchableOpacity style={tw`mt-3 flex-row items-center justify-center`}>
          <Text style={tw`text-blue-600 font-medium`}>Ver todos los trabajos</Text>
          <MaterialIcons name="arrow-forward" size={16} color="#3B82F6" style={tw`ml-1`} />
        </TouchableOpacity>
      </View>

      {/* Botón de contacto */}
      <View style={tw`px-4 pb-8`}>
        <TouchableOpacity 
          style={tw`bg-blue-600 py-3 rounded-full items-center justify-center shadow-md`}
          activeOpacity={0.9}
        >
          <Text style={tw`text-white font-bold text-lg`}>Contactar a {workerData.name.split(' ')[0]}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WorkerProfileScreen;