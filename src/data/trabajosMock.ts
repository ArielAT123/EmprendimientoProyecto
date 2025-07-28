export interface ClientPost {
  clientName: string;
  clientId: string;
  postContent: string;
  isImage: boolean;
  description: string;
  tags: string[];
  urgency: 'Baja' | 'Media' | 'Alta' | 'Urgente';
  budget?: string;
  location: string;
  contactInfo?: string;
  estimatedTime?: string;
  workType: 'Presencial' | 'Remoto' | 'Híbrido';
  postedDate: string;
}

export const mockClientPosts: ClientPost[] = [
  {
    clientName: 'María González',
    clientId: '001',
    postContent: 'Necesito un electricista urgente para revisar instalación.',
    isImage: false,
    description: 'Instalación eléctrica con problemas en la sala. Se van las luces constantemente y hay chispas en algunos enchufes.',
    tags: ['Electricista', 'Urgente', 'Domicilio', 'Instalación'],
    urgency: 'Urgente',
    budget: '$80-120',
    location: 'Norte de Guayaquil',
    contactInfo: '+593 98 765 4321',
    estimatedTime: '2-3 horas',
    workType: 'Presencial',
    postedDate: '2025-07-28',
  },
  {
    clientName: 'Carlos Mendoza',
    clientId: '002',
    postContent: 'Reparación de plomería en cocina.',
    isImage: false,
    description: 'Filtración de agua bajo el fregadero. El agua se acumula y ya hay daños en el mueble.',
    tags: ['Plomería', 'Cocina', 'Filtración', 'Reparación'],
    urgency: 'Alta',
    budget: '$50-80',
    location: 'Centro de Guayaquil',
    contactInfo: '+593 99 123 4567',
    estimatedTime: '1-2 horas',
    workType: 'Presencial',
    postedDate: '2025-07-27',
  },
  {
    clientName: 'Ana López',
    clientId: '003',
    postContent: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
    isImage: true,
    description: 'Pintura de casa exterior. Casa de dos pisos necesita pintura completa, incluye preparación de superficie.',
    tags: ['Pintura', 'Exterior', 'Casa', 'Preparación'],
    urgency: 'Media',
    budget: '$400-600',
    location: 'Vía a la Costa',
    contactInfo: '+593 96 789 0123',
    estimatedTime: '3-5 días',
    workType: 'Presencial',
    postedDate: '2025-07-26',
  },
  {
    clientName: 'Roberto Silva',
    clientId: '004',
    postContent: 'Reparación de aire acondicionado.',
    isImage: false,
    description: 'Aire acondicionado no enfría correctamente. Hace ruidos extraños y consume mucha energía.',
    tags: ['Técnico', 'Aire acondicionado', 'Reparación', 'Mantenimiento'],
    urgency: 'Alta',
    budget: '$60-100',
    location: 'Urdesa',
    contactInfo: '+593 97 456 7890',
    estimatedTime: '2-4 horas',
    workType: 'Presencial',
    postedDate: '2025-07-28',
  },
  {
    clientName: 'Elena Castro',
    clientId: '005',
    postContent: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    isImage: true,
    description: 'Limpieza profunda de apartamento de 3 habitaciones. Incluye ventanas, pisos y baños.',
    tags: ['Limpieza', 'Apartamento', 'Profunda', 'Ventanas'],
    urgency: 'Media',
    budget: '$40-70',
    location: 'Ceibos',
    contactInfo: '+593 95 234 5678',
    estimatedTime: '4-6 horas',
    workType: 'Presencial',
    postedDate: '2025-07-25',
  },
  {
    clientName: 'Luis Martínez',
    clientId: '006',
    postContent: 'Instalación de sistema de alarma.',
    isImage: false,
    description: 'Necesito instalación completa de sistema de seguridad con cámaras y sensores en casa.',
    tags: ['Seguridad', 'Instalación', 'Cámaras', 'Alarma'],
    urgency: 'Media',
    budget: '$200-350',
    location: 'Samborondón',
    contactInfo: '+593 94 567 8901',
    estimatedTime: '1-2 días',
    workType: 'Presencial',
    postedDate: '2025-07-27',
  },
  {
    clientName: 'Patricia Vega',
    clientId: '007',
    postContent: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    isImage: true,
    description: 'Reparación de techo con goteras. El techo de la terraza tiene varias filtraciones.',
    tags: ['Construcción', 'Techo', 'Goteras', 'Impermeabilización'],
    urgency: 'Urgente',
    budget: '$150-250',
    location: 'Mapasingue',
    contactInfo: '+593 93 678 9012',
    estimatedTime: '1-2 días',
    workType: 'Presencial',
    postedDate: '2025-07-28',
  },
  {
    clientName: 'Fernando Ruiz',
    clientId: '008',
    postContent: 'Mantenimiento de jardín y poda de árboles.',
    isImage: false,
    description: 'Jardín grande necesita mantenimiento completo, poda de árboles altos y arreglo de césped.',
    tags: ['Jardinería', 'Poda', 'Mantenimiento', 'Césped'],
    urgency: 'Baja',
    budget: '$80-120',
    location: 'Entre Ríos',
    contactInfo: '+593 92 789 0123',
    estimatedTime: '1 día',
    workType: 'Presencial',
    postedDate: '2025-07-24',
  },
  {
    clientName: 'Sofía Herrera',
    clientId: '009',
    postContent: 'Reparación de computadora portátil.',
    isImage: false,
    description: 'Laptop no enciende, posible problema con la fuente de poder o placa madre.',
    tags: ['Técnico', 'Computadora', 'Reparación', 'Hardware'],
    urgency: 'Media',
    budget: '$30-60',
    location: 'Kennedy',
    contactInfo: '+593 91 890 1234',
    estimatedTime: '2-3 horas',
    workType: 'Presencial',
    postedDate: '2025-07-26',
  },
  {
    clientName: 'Diego Morales',
    clientId: '010',
    postContent: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    isImage: true,
    description: 'Instalación de pisos laminados en sala y comedor. Área aproximada de 40 metros cuadrados.',
    tags: ['Construcción', 'Pisos', 'Instalación', 'Laminado'],
    urgency: 'Media',
    budget: '$180-280',
    location: 'Alborada',
    contactInfo: '+593 90 901 2345',
    estimatedTime: '2-3 días',
    workType: 'Presencial',
    postedDate: '2025-07-27',
  },
  {
    clientName: 'Carmen Delgado',
    clientId: '011',
    postContent: 'Reparación de lavadora automática.',
    isImage: false,
    description: 'Lavadora no centrifuga correctamente y hace ruidos extraños durante el lavado.',
    tags: ['Técnico', 'Electrodomésticos', 'Lavadora', 'Reparación'],
    urgency: 'Alta',
    budget: '$40-80',
    location: 'Garzota',
    contactInfo: '+593 98 012 3456',
    estimatedTime: '1-2 horas',
    workType: 'Presencial',
    postedDate: '2025-07-28',
  },
  {
    clientName: 'Javier Campos',
    clientId: '012',
    postContent: 'Instalación de ventiladores de techo.',
    isImage: false,
    description: 'Necesito instalar 3 ventiladores de techo en diferentes habitaciones de la casa.',
    tags: ['Electricista', 'Instalación', 'Ventiladores', 'Techo'],
    urgency: 'Media',
    budget: '$60-100',
    location: 'Bastión Popular',
    contactInfo: '+593 97 123 4567',
    estimatedTime: '3-4 horas',
    workType: 'Presencial',
    postedDate: '2025-07-25',
  },
  {
    clientName: 'Isabella Torres',
    clientId: '013',
    postContent: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
    isImage: true,
    description: 'Diseño e instalación de closet personalizado para dormitorio principal.',
    tags: ['Carpintería', 'Closet', 'Diseño', 'Personalizado'],
    urgency: 'Baja',
    budget: '$300-500',
    location: 'La Puntilla',
    contactInfo: '+593 96 234 5678',
    estimatedTime: '4-6 días',
    workType: 'Presencial',
    postedDate: '2025-07-23',
  },
  {
    clientName: 'Andrés Peña',
    clientId: '014',
    postContent: 'Reparación de portón automático.',
    isImage: false,
    description: 'Portón eléctrico no abre ni cierra. Problema posiblemente en el motor o control remoto.',
    tags: ['Técnico', 'Portón', 'Automático', 'Motor'],
    urgency: 'Alta',
    budget: '$70-120',
    location: 'Villa Club',
    contactInfo: '+593 95 345 6789',
    estimatedTime: '2-3 horas',
    workType: 'Presencial',
    postedDate: '2025-07-28',
  },
  {
    clientName: 'Mónica Sánchez',
    clientId: '015',
    postContent: 'Limpieza de tanque de agua.',
    isImage: false,
    description: 'Tanque de agua potable necesita limpieza y desinfección profunda.',
    tags: ['Limpieza', 'Tanque', 'Agua', 'Desinfección'],
    urgency: 'Media',
    budget: '$35-55',
    location: 'Flor de Bastión',
    contactInfo: '+593 94 456 7890',
    estimatedTime: '2-3 horas',
    workType: 'Presencial',
    postedDate: '2025-07-26',
  }
];

export const fetchClientPosts = async (): Promise<ClientPost[]> => {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockClientPosts;
};

export const getPostsByTag = (tag: string): ClientPost[] => {
  return mockClientPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export const getPostsByUrgency = (urgency: ClientPost['urgency']): ClientPost[] => {
  return mockClientPosts.filter(post => post.urgency === urgency);
};

export const getRecentPosts = (days: number = 7): ClientPost[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mockClientPosts.filter(post => {
    const postDate = new Date(post.postedDate);
    return postDate >= cutoffDate;
  });
};
