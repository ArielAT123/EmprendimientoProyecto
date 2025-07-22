// Paleta de colores (puedes exportarla si la necesitas en otros archivos)
export const ORANGE_PRIMARY = '#FF6B35';
export const ORANGE_SECONDARY = '#FF8C42';
export const ORANGE_ACCENT = '#FFB347';
export const ORANGE_LIGHT = '#FFA366';
export const ORANGE_LIGHTER = '#FFD4B3';
export const ORANGE_DARK = '#FF4500';
export const ORANGE_DARKER = '#E55100';

// Nombres y apellidos típicos de Guayas
const nombresHombres = ['José', 'Luis', 'Thiago', 'Mathias', 'Dylan', 'Ángel', 'Santiago', 'Liam'];
const nombresMujeres = ['María', 'Mía', 'Danna', 'Ashley', 'Doménica', 'Emily'];
const apellidos = ['García', 'Sánchez', 'Zambrano', 'López', 'Vera', 'Castro', 'Alvarado', 'González', 'Moran'];
const ubicaciones = [
  'Guayaquil', 'Daule', 'Durán', 'Samborondón', 'Ceibos', 'Milagro', 'Yaguachi', 'Naranjal', 'Balao', 'Playas'
];

// Descripciones por tipo de trabajador/oficio
const professionDescriptions: { [key: string]: string } = {
  'Técnico de Aire Acondicionado': 'Especialista en instalación, reparación y mantenimiento de sistemas de aire acondicionado.',
  'Maestro de Construcción': 'Experto en obras civiles, remodelaciones y dirección de proyectos de construcción.',
  'Técnico en Computación': 'Soluciona problemas de hardware y software, instalación y mantenimiento de computadoras.',
  'Plomera': 'Instalación y reparación de tuberías, grifería y sistemas de agua potable.',
  'Electricista': 'Instalación, reparación y mantenimiento de sistemas eléctricos residenciales e industriales.',
  'Carpintera': 'Fabricación y reparación de muebles, puertas, ventanas y estructuras de madera.',
  'Jardinero': 'Diseño, mantenimiento y cuidado de jardines y áreas verdes.',
  'Pintora': 'Pintura de interiores y exteriores, acabados decorativos y mantenimiento de superficies.',
  'Gasfitero': 'Especialista en instalaciones de gas y mantenimiento de sistemas de gas domiciliario.',
  'Cerrajera': 'Apertura de cerraduras, cambio de llaves y sistemas de seguridad.',
  'Técnico en Refrigeración': 'Mantenimiento y reparación de refrigeradoras y sistemas de refrigeración.',
  'Técnico en Electrodomésticos': 'Reparación de lavadoras, cocinas, microondas y otros electrodomésticos.',
  'Técnico en Redes': 'Instalación y configuración de redes de datos y WiFi.',
  'Técnico en Celulares': 'Reparación y mantenimiento de teléfonos móviles y tablets.',
  'Plomero': 'Instalación y reparación de sistemas de agua y desagüe.',
  'Pintor': 'Pintura de casas, oficinas y fachadas.',
  'Técnico': 'Servicios técnicos generales para el hogar y la oficina.',
};

// Función para asignar imagen por género y rotar entre las URLs
export const hombreFotos = [
  'https://images.pexels.com/photos/30257405/pexels-photo-30257405.jpeg',
  'https://images.pexels.com/photos/29284315/pexels-photo-29284315.jpeg',
  'https://images.pexels.com/photos/31610843/pexels-photo-31610843.jpeg',
  'https://images.pexels.com/photos/29047759/pexels-photo-29047759.jpeg',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
];
export const mujerFotos = [
  'https://images.pexels.com/photos/10641053/pexels-photo-10641053.jpeg',
  'https://images.pexels.com/photos/31942700/pexels-photo-31942700.jpeg',
  'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
];

// 10 verificados (5 originales + 5 nuevos)
const verifiedWorkers = [
  {
    id: 1,
    name: 'Miguel Pérez',
    profession: 'Técnico de Aire Acondicionado',
    location: 'Norte de Guayaquil',
    price: 25,
    rating: 4.8,
    totalJobs: 143,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Técnico de Aire Acondicionado'],
    photo: hombreFotos[0],
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    profession: 'Maestro de Construcción',
    location: 'Centro de Guayaquil',
    price: 35,
    rating: 4.7,
    totalJobs: 156,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Maestro de Construcción'],
    photo: hombreFotos[1],
  },
  {
    id: 3,
    name: 'Ana López',
    profession: 'Técnico en Computación',
    location: 'Alborada, Guayaquil',
    price: 15,
    rating: 4.9,
    totalJobs: 203,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Técnico en Computación'],
    photo: mujerFotos[0],
  },
  {
    id: 4,
    name: 'Sofía Herrera',
    profession: 'Plomera',
    location: 'Sur de Guayaquil',
    price: 20,
    rating: 4.8,
    totalJobs: 120,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Plomera'],
    photo: mujerFotos[1],
  },
  {
    id: 5,
    name: 'Luis Gómez',
    profession: 'Electricista',
    location: 'Samanes, Guayaquil',
    price: 30,
    rating: 4.9,
    totalJobs: 180,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Electricista'],
    photo: hombreFotos[2],
  },
  {
    id: 6,
    name: 'Patricia Salazar',
    profession: 'Carpintera',
    location: 'La Aurora',
    price: 28,
    rating: 4.8,
    totalJobs: 110,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Carpintera'],
    photo: mujerFotos[2],
  },
  {
    id: 7,
    name: 'Jorge Zambrano',
    profession: 'Jardinero',
    location: 'Daule',
    price: 18,
    rating: 4.7,
    totalJobs: 90,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Jardinero'],
    photo: hombreFotos[3],
  },
  {
    id: 8,
    name: 'María Torres',
    profession: 'Pintora',
    location: 'Samborondón',
    price: 22,
    rating: 4.9,
    totalJobs: 130,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Pintora'],
    photo: mujerFotos[3],
  },
  {
    id: 9,
    name: 'Pedro Mendoza',
    profession: 'Gasfitero',
    location: 'Durán',
    price: 19,
    rating: 4.8,
    totalJobs: 105,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Gasfitero'],
    photo: hombreFotos[4],
  },
  {
    id: 10,
    name: 'Gabriela Ruiz',
    profession: 'Cerrajera',
    location: 'Ceibos',
    price: 27,
    rating: 4.9,
    totalJobs: 115,
    isAvailable: true,
    isPremium: true,
    description: professionDescriptions['Cerrajera'],
    photo: mujerFotos[4],
  },
];

// 40 no verificados con nombres, apellidos y ubicaciones típicas y descripción
const profesionesExtras = [
  'Técnico en Refrigeración',
  'Técnico en Electrodomésticos',
  'Técnico en Redes',
  'Técnico en Celulares',
  'Plomero',
  'Jardinero',
  'Pintor',
  'Electricista',
  'Técnico'
];

const unverifiedWorkers = Array.from({ length: 40 }).map((_, i) => {
  const isMujer = i % 2 === 0;
  const nombre = isMujer
    ? nombresMujeres[i % nombresMujeres.length]
    : nombresHombres[i % nombresHombres.length];
  const apellido = apellidos[i % apellidos.length];
  const profesion = profesionesExtras[i % profesionesExtras.length];
  const location = ubicaciones[i % ubicaciones.length];
  const photo = isMujer
    ? mujerFotos[i % mujerFotos.length]
    : hombreFotos[i % hombreFotos.length];
  return {
    id: 11 + i,
    name: `${nombre} ${apellido}`,
    profession: profesion,
    location,
    price: 15 + (i % 5) * 5,
    rating: 4.2 + (i % 4) * 0.2,
    totalJobs: 20 + i * 2,
    isAvailable: true,
    isPremium: false,
    description: professionDescriptions[profesion] || 'Profesional con experiencia en su área y atención personalizada.',
    photo,
  };
});

export const mockWorkers = [
  ...verifiedWorkers,
  ...unverifiedWorkers,
];

// Mocks de trabajos del cliente
export const mockJobs = [
  {
    id: 1,
    title: 'Reparación de Aire Acondicionado',
    description: 'Necesito reparar el aire acondicionado de mi oficina',
    details: 'El aire acondicionado hace ruido y no enfría. Es un modelo LG de 12000 BTU. El problema comenzó hace 2 días.',
    address: 'Av. Principal 123 y Calle 10, Norte de Guayaquil',
    date: '2025-07-20',
    budget: 25,
    status: 'in_progress',
    proposalsCount: 0,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    worker: mockWorkers.find(w => w.name === 'Miguel Pérez'),
  },
  {
    id: 2,
    title: 'Instalación de Lavadora',
    description: 'Compré una lavadora nueva y necesito instalación',
    details: 'Lavadora Samsung automática, requiere instalación de toma de agua y desagüe. El espacio ya cuenta con toma eléctrica.',
    address: 'Cdla. Alborada, Mz 5, Villa 8',
    date: '2025-07-18',
    budget: 15,
    status: 'waiting',
    proposalsCount: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    worker: null,
  },
  {
    id: 3,
    title: 'Reparación de Computadora',
    description: 'Mi laptop no enciende, necesito diagnóstico y reparación.',
    details: 'Laptop HP Pavilion, pantalla negra al encender. No responde ni con cargador conectado. Se requiere revisión urgente.',
    address: 'Av. 9 de Octubre y Boyacá, Centro',
    date: '2025-07-17',
    budget: 20,
    status: 'in_progress',
    proposalsCount: 1,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    worker: mockWorkers.find(w => w.name === 'Ana López'),
  },
  {
    id: 4,
    title: 'Instalación de Lámparas',
    description: 'Instalar 4 lámparas LED en la sala y comedor.',
    details: 'Las lámparas ya están compradas. Se requiere instalación y revisión de cableado. El techo es de concreto.',
    address: 'Samanes 5, Calle 3ra, Casa 12',
    date: '2025-07-21',
    budget: 18,
    status: 'waiting',
    proposalsCount: 2,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    worker: null,
  },
  {
    id: 5,
    title: 'Pintura de Habitación',
    description: 'Pintar una habitación de 12m2, color blanco.',
    details: 'La habitación está vacía y las paredes limpias. Se requiere dos capas de pintura y retoque en el techo.',
    address: 'Urdesa Central, Calle 2da 456',
    date: '2025-07-10',
    budget: 22,
    status: 'completed',
    proposalsCount: 0,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    worker: mockWorkers.find(w => w.name === 'María Torres'),
  },
  {
    id: 6,
    title: 'Cambio de Grifería',
    description: 'Cambiar la grifería del baño principal.',
    details: 'La grifería nueva es marca FV. Se debe retirar la anterior y revisar posibles fugas en la tubería.',
    address: 'La Aurora, Villa 23',
    date: '2025-07-08',
    budget: 17,
    status: 'completed',
    proposalsCount: 0,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    worker: mockWorkers.find(w => w.name === 'Sofía Herrera'),
  },
  {
    id: 7,
    title: 'Mantenimiento de Jardín',
    description: 'Cortar césped y podar arbustos en el patio.',
    details: 'El área es de 40m2. Hay 3 arbustos y césped alto. Llevar herramientas propias.',
    address: 'Daule, Urb. La Joya, Etapa Rubí',
    date: '2025-07-15',
    budget: 19,
    status: 'in_progress',
    proposalsCount: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    worker: mockWorkers.find(w => w.name === 'Jorge Zambrano'),
  },
  {
    id: 8,
    title: 'Instalación de Router WiFi',
    description: 'Configurar e instalar un nuevo router en casa.',
    details: 'Router TP-Link Archer C6. Se requiere configuración de red y cambio de contraseña. Hay dos pisos en la casa.',
    address: 'Ceibos, Calle 8, Casa 34',
    date: '2025-07-05',
    budget: 16,
    status: 'completed',
    proposalsCount: 0,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    worker: mockWorkers.find(w => w.name === 'Luis Gómez'),
  },
];