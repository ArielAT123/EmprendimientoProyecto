import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import React, { useState, useEffect } from 'react';
import FloatingChatBot from '../../components/ChatBotComponent';
import { ORANGE_PRIMARY, ORANGE_LIGHTER, ORANGE_ACCENT, ORANGE_DARK, ORANGE_DARKER, hombreFotos, mujerFotos } from '../../views/cliente/Datos/datos';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchClientPosts, ClientPost } from '../../data/trabajosMock';
import { workCategories } from '../../data/categoriasTrabajos';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useChatBotServices = () => {
  const [services, setServices] = useState<string[]>([]);

  const updateServices = (newServices: string[] = []) => {
    setServices(prev => [...new Set([...prev, ...newServices])]);
  };

  const clearServices = () => {
    setServices([]);
  };

  return { services, updateServices, clearServices };
};

export default function TrabajadorHomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [clientPosts, setClientPosts] = useState<ClientPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ClientPost[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPost, setSelectedPost] = useState<ClientPost | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  
  // 🎯 NUEVAS FUNCIONALIDADES
  // A) Sistema de Favoritos
  const [favorites, setFavorites] = useState<string[]>(['cliente_001', 'cliente_003', 'cliente_007']); // IDs quemados
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  
  // B) Sistema de Aplicación Rápida - REMOVIDO
  // const [appliedJobs, setAppliedJobs] = useState<string[]>(['cliente_002', 'cliente_005']); // IDs quemados
  // const [quickApplyVisible, setQuickApplyVisible] = useState(false);
  // const [selectedJobForApply, setSelectedJobForApply] = useState<ClientPost | null>(null);

  // 🆕 NUEVO: Sistema de postulación completo
  const [appliedJobs, setAppliedJobs] = useState<string[]>(['cliente_002', 'cliente_005']);
  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<ClientPost | null>(null);
  
  // Estados del formulario de postulación
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedBudget: '',
    estimatedDuration: '',
    availableDate: '',
    experience: '',
    tools: ''
  });
  
  // C) Datos del Dashboard del Trabajador (datos quemados)
  const [workerStats] = useState({
    jobsApplied: 12,
    jobsAccepted: 8,
    jobsCompleted: 6,
    monthlyEarnings: 450,
    averageRating: 4.7,
    totalEarnings: 2340
  });

  // 🆕 NUEVO: Sistema de Historial de Trabajos
  const [jobProgressVisible, setJobProgressVisible] = useState(false);
  const [selectedProgressJob, setSelectedProgressJob] = useState<any>(null);
  const [evidenceImages, setEvidenceImages] = useState<string[]>([]);
  const [progressNote, setProgressNote] = useState('');

  // 🆕 NUEVO: Datos del trabajador
  const [workerProfile] = useState({
    name: 'José Martínez',
    profession: 'Técnico Electricista',
    rating: 4.8,
    completedJobs: 47
  });

  // 🆕 NUEVO: Propuestas recibidas de clientes
  const [clientProposals] = useState([
    {
      id: 'prop_001',
      clientName: 'María Fernández',
      clientPhoto: 'https://randomuser.me/api/portraits/women/32.jpg',
      jobTitle: 'Instalación de Sistema Eléctrico',
      description: 'Necesito instalar un nuevo sistema eléctrico en mi casa de dos pisos. Incluye revisión completa del cableado existente, instalación de nuevos breakers y tomacorrientes adicionales en ambos pisos.',
      location: 'Norte de Guayaquil',
      budget: '$450',
      proposedDate: '2025-01-25',
      priority: 'Alta',
      requirements: 'Certificación eléctrica, experiencia en casas residenciales',
      estimatedDuration: '3 días',
      status: 'Pendiente',
      clientPhone: '+593 99 555 1234',
      images: [
        'https://picsum.photos/400/300?random=201',
        'https://picsum.photos/400/300?random=202'
      ],
      clientRating: 4.6,
      previousJobs: 8
    },
    {
      id: 'prop_002',
      clientName: 'Carlos López',
      clientPhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
      jobTitle: 'Reparación de Tablero Eléctrico',
      description: 'El tablero principal está fallando y necesita revisión urgente. Se escuchan chisporroteos y algunos breakers no funcionan correctamente. Es un trabajo que requiere atención inmediata.',
      location: 'Centro de Guayaquil',
      budget: '$180',
      proposedDate: '2025-01-22',
      priority: 'Urgente',
      requirements: 'Disponibilidad inmediata, experiencia con tableros eléctricos',
      estimatedDuration: '1 día',
      status: 'Pendiente',
      clientPhone: '+593 98 444 5678',
      images: [
        'https://picsum.photos/400/300?random=203'
      ],
      clientRating: 4.9,
      previousJobs: 15
    },
    {
      id: 'prop_003',
      clientName: 'Ana Rodríguez',
      clientPhoto: 'https://randomuser.me/api/portraits/women/28.jpg',
      jobTitle: 'Mantenimiento Eléctrico Mensual',
      description: 'Contrato de mantenimiento para oficina comercial. Incluye revisión mensual de instalaciones, limpieza de contactos, verificación de voltajes y reporte detallado.',
      location: 'Sur de Guayaquil',
      budget: '$200/mes',
      proposedDate: '2025-02-01',
      priority: 'Media',
      requirements: 'Disponibilidad horarios flexibles, reportes detallados',
      estimatedDuration: 'Recurrente',
      status: 'En Negociación',
      clientPhone: '+593 97 333 9012',
      images: [
        'https://picsum.photos/400/300?random=204',
        'https://picsum.photos/400/300?random=205',
        'https://picsum.photos/400/300?random=206'
      ],
      clientRating: 4.3,
      previousJobs: 3
    }
  ]);

  // 🆕 NUEVO: Estados para filtros desplegables
  const [showBudgetFilter, setShowBudgetFilter] = useState(false);
  const [showDistanceFilter, setShowDistanceFilter] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  // 🆕 NUEVO: Estados para modal de propuestas
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [proposalModalVisible, setProposalModalVisible] = useState(false);

  // Datos quemados del historial de trabajos
  const [jobHistory] = useState({
    inProgress: [
      {
        id: 'prog_001',
        clientName: 'María González',
        clientPhoto: 'https://randomuser.me/api/portraits/women/45.jpg',
        jobTitle: 'Reparación de Instalación Eléctrica',
        description: 'Revisar y reparar tomacorrientes que no funcionan en la sala',
        location: 'Norte de Guayaquil',
        budget: '$85',
        startDate: '2025-01-20',
        estimatedCompletion: '2025-01-22',
        progress: 65,
        status: 'En Progreso',
        clientPhone: '+593 99 123 4567',
        evidences: [
          'https://picsum.photos/400/300?random=101',
          'https://picsum.photos/400/300?random=102'
        ],
        notes: 'Se identificó problema en breaker principal. Materiales adicionales requeridos.'
      },
      {
        id: 'prog_002',
        clientName: 'Carlos Mendoza',
        clientPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
        jobTitle: 'Instalación de Grifería',
        description: 'Cambio completo de grifería en baño principal',
        location: 'Centro de Guayaquil',
        budget: '$45',
        startDate: '2025-01-21',
        estimatedCompletion: '2025-01-21',
        progress: 90,
        status: 'Casi Terminado',
        clientPhone: '+593 98 765 4321',
        evidences: [
          'https://picsum.photos/400/300?random=103'
        ],
        notes: 'Instalación casi completa. Falta prueba final de presión.'
      }
    ],
    completed: [
      {
        id: 'comp_001',
        clientName: 'Ana Rodríguez',
        clientPhoto: 'https://randomuser.me/api/portraits/women/28.jpg',
        jobTitle: 'Pintura de Habitación',
        description: 'Pintura completa de dormitorio principal',
        location: 'Sur de Guayaquil',
        budget: '$120',
        completedDate: '2025-01-18',
        rating: 4.8,
        clientReview: 'Excelente trabajo, muy profesional y puntual.',
        status: 'Completado'
      },
      {
        id: 'comp_002',
        clientName: 'Luis Torres',
        clientPhoto: 'https://randomuser.me/api/portraits/men/55.jpg',
        jobTitle: 'Reparación de Computadora',
        description: 'Limpieza y optimización de PC de escritorio',
        location: 'Norte de Guayaquil',
        budget: '$35',
        completedDate: '2025-01-15',
        rating: 4.9,
        clientReview: 'Muy rápido y eficiente. Recomendado.',
        status: 'Completado'
      },
      {
        id: 'comp_003',
        clientName: 'Patricia Silva',
        clientPhoto: 'https://randomuser.me/api/portraits/women/42.jpg',
        jobTitle: 'Instalación de Ventilador',
        description: 'Instalación de ventilador de techo en sala',
        location: 'Este de Guayaquil',
        budget: '$25',
        completedDate: '2025-01-12',
        rating: 4.7,
        clientReview: 'Buen trabajo, llegó puntual.',
        status: 'Completado'
      }
    ],
    applied: [
      {
        id: 'app_001',
        clientName: 'Roberto Vega',
        jobTitle: 'Reparación de Puerta',
        description: 'Ajuste de puerta principal que no cierra bien',
        location: 'Centro de Guayaquil',
        budget: '$30',
        appliedDate: '2025-01-19',
        status: 'En Revisión'
      },
      {
        id: 'app_002',
        clientName: 'Elena Castro',
        jobTitle: 'Limpieza de Canaletas',
        description: 'Limpieza completa de sistema de canaletas',
        location: 'Norte de Guayaquil',
        budget: '$60',
        appliedDate: '2025-01-18',
        status: 'Pendiente'
      }
    ]
  });
  
  // D) Filtros adicionales
  const [budgetFilter, setBudgetFilter] = useState('Todos');
  const [distanceFilter, setDistanceFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('recent'); // recent, budget, distance
  
  // F) Templates de mensajes rápidos - REMOVIDO ya no se usan
  // const messageTemplates = [...];
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job_available',
      title: 'Nuevo Trabajo Disponible',
      message: 'César Morales publicó un trabajo de electricidad en Guayaquil',
      time: 'Hace 5 min',
      isRead: false,
      icon: 'work',
      color: '#10B981'
    },
    {
      id: 2,
      type: 'job_available',
      title: 'Trabajo Urgente',
      message: 'Ana López necesita reparación de computadora urgente',
      time: 'Hace 15 min',
      isRead: false,
      icon: 'priority-high',
      color: '#EF4444'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Trabajo Recomendado',
      message: 'Hay un trabajo de pintura que coincide con tu perfil',
      time: 'Hace 1 hora',
      isRead: true,
      icon: 'thumb-up',
      color: '#3B82F6'
    }
  ]);

  const chatBotServices = useChatBotServices();

  const categories = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Urgentes', value: 'Urgente' },
    { label: 'Electricidad', value: 'Electricista' },
    { label: 'Plomería', value: 'Plomero' },
    { label: 'Construcción', value: 'Construcción' },
    { label: 'Servicios', value: 'Servicios' },
    { label: 'Climatización', value: 'Climatización' },
    { label: 'Tecnología', value: 'Técnico' },
    { label: 'Seguridad', value: 'Seguridad' },
    { label: 'Limpieza', value: 'Limpieza' },
    { label: 'Jardinería', value: 'Jardinería' },
    { label: 'Soldadura', value: 'Soldador' },
  ];

  const budgetRanges = [
    { label: 'Todos', value: 'Todos' },
    { label: '$5-15', value: '5-15' },
    { label: '$15-30', value: '15-30' },
    { label: '$30+', value: '30+' },
  ];

  const distanceOptions = [
    { label: 'Todos', value: 'Todos' },
    { label: 'Cerca', value: 'Cerca' },
    { label: 'Mediana', value: 'Mediana' },
    { label: 'Lejos', value: 'Lejos' },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Datos simulados con campos más realistas
        const mockPosts = [
          {
            clientId: 'cliente_001',
            clientName: 'María González',
            postContent: 'Necesito instalar un sistema eléctrico completo en mi casa nueva',
            description: 'Casa de 120m², 3 habitaciones, 2 baños. Requiere instalación completa de cableado, tablero eléctrico, tomacorrientes e interruptores. Trabajo urgente.',
            location: 'Norte de Guayaquil - Alborada',
            workType: 'Electricista',
            budget: '$450 - $600',
            estimatedTime: '3-4 días',
            urgency: 'Alta',
            isImage: false,
            postedDate: '2025-01-20',
            tags: ['electricidad', 'instalación', 'casa', 'cableado'],
            requirements: {
              experience: 'Mínimo 2 años en instalaciones residenciales',
              tools: 'Herramientas eléctricas propias, multímetro',
              certifications: 'Licencia eléctrica vigente',
              timeline: 'Disponibilidad inmediata',
              materials: 'Cliente proporciona materiales'
            },
            clientPreferences: {
              budget: '$450 - $600',
              timeframe: 'Esta semana',
              workHours: 'Lunes a sábado, 8am-5pm',
              paymentMethod: 'Efectivo al completar'
            }
          },
          {
            clientId: 'cliente_002', 
            clientName: 'Carlos Mendoza',
            postContent: 'Reparación urgente de plomería - fuga en tubería principal',
            description: 'Fuga importante en tubería principal que está afectando la estructura. Necesito reparación inmediata con garantía.',
            location: 'Centro de Guayaquil - 9 de Octubre',
            workType: 'Plomero',
            budget: '$80 - $120',
            estimatedTime: '1-2 días',
            urgency: 'Urgente',
            isImage: false,
            postedDate: '2025-01-21',
            tags: ['plomería', 'reparación', 'urgente', 'fuga'],
            requirements: {
              experience: 'Experiencia en reparaciones de emergencia',
              tools: 'Herramientas de plomería completas',
              certifications: 'Preferible certificación en plomería',
              timeline: 'Disponibilidad hoy o mañana',
              materials: 'Trabajador debe traer materiales básicos'
            },
            clientPreferences: {
              budget: '$80 - $120',
              timeframe: 'Inmediato',
              workHours: 'Flexible, incluso fines de semana',
              paymentMethod: 'Transferencia o efectivo'
            }
          },
          {
            clientId: 'cliente_003',
            clientName: 'Ana Rodríguez',
            postContent: 'Pintura completa de apartamento 80m²',
            description: 'Apartamento de 2 habitaciones que necesita pintura completa. Paredes en buen estado, solo necesita lijado menor y pintura.',
            location: 'Sur de Guayaquil - Urdesa',
            workType: 'Pintor',
            budget: '$200 - $280',
            estimatedTime: '4-5 días',
            urgency: 'Media',
            isImage: false,
            postedDate: '2025-01-19',
            tags: ['pintura', 'apartamento', 'residencial'],
            requirements: {
              experience: 'Mínimo 1 año en pintura residencial',
              tools: 'Brochas, rodillos, escalera',
              certifications: 'No requerido',
              timeline: 'Próxima semana',
              materials: 'Cliente proporciona pintura'
            },
            clientPreferences: {
              budget: '$200 - $280',
              timeframe: 'Próxima semana',
              workHours: 'Lunes a viernes, 9am-4pm',
              paymentMethod: '50% adelanto, 50% al finalizar'
            }
          },
          {
            clientId: 'cliente_004',
            clientName: 'Roberto Silva',
            postContent: 'Instalación y mantenimiento de aire acondicionado',
            description: 'Necesito instalar 2 aires acondicionados de 18000 BTU en casa de dos plantas. Incluye instalación de tubería, cableado eléctrico y puesta en marcha.',
            location: 'Este de Guayaquil - Vía a la Costa',
            workType: 'Climatización',
            budget: '$350 - $450',
            estimatedTime: '2-3 días',
            urgency: 'Alta',
            isImage: false,
            postedDate: '2025-01-22',
            tags: ['aire acondicionado', 'climatización', 'instalación', 'refrigeración'],
            requirements: {
              experience: 'Mínimo 3 años en climatización',
              tools: 'Herramientas de refrigeración, bomba de vacío',
              certifications: 'Certificación en refrigeración requerida',
              timeline: 'Esta semana',
              materials: 'Cliente proporciona equipos'
            },
            clientPreferences: {
              budget: '$350 - $450',
              timeframe: 'Esta semana',
              workHours: 'Lunes a sábado, 7am-4pm',
              paymentMethod: '30% adelanto, 70% al completar'
            }
          },
          {
            clientId: 'cliente_005',
            clientName: 'Patricia Morales',
            postContent: 'Reparación de computadora de escritorio - NO ENCIENDE',
            description: 'Mi PC no enciende desde ayer. Necesito diagnóstico y reparación urgente. Es mi herramienta de trabajo y tengo archivos importantes.',
            location: 'Norte de Guayaquil - Los Ceibos',
            workType: 'Técnico en Computación',
            budget: '$25 - $45',
            estimatedTime: '2-4 horas',
            urgency: 'Urgente',
            isImage: false,
            postedDate: '2025-01-22',
            tags: ['computadora', 'reparación', 'técnico', 'diagnóstico'],
            requirements: {
              experience: 'Experiencia en hardware de PC',
              tools: 'Herramientas básicas de técnico',
              certifications: 'No requerido',
              timeline: 'Hoy mismo',
              materials: 'Según diagnóstico'
            },
            clientPreferences: {
              budget: '$25 - $45',
              timeframe: 'Inmediato',
              workHours: 'Flexible, todo el día',
              paymentMethod: 'Efectivo'
            }
          },
          {
            clientId: 'cliente_006',
            clientName: 'Luis Vega',
            postContent: 'Construcción de muro divisorio en patio',
            description: 'Necesito construir un muro de bloques de 15 metros de largo por 2.5 metros de alto para dividir mi patio. Incluye cimientos y acabados.',
            location: 'Oeste de Guayaquil - Mapasingue',
            workType: 'Construcción',
            budget: '$800 - $1200',
            estimatedTime: '1-2 semanas',
            urgency: 'Media',
            isImage: false,
            postedDate: '2025-01-21',
            tags: ['construcción', 'muro', 'albañilería', 'patio'],
            requirements: {
              experience: 'Mínimo 2 años en construcción',
              tools: 'Herramientas de albañilería completas',
              certifications: 'No requerido',
              timeline: 'Próximo mes',
              materials: 'Cliente proporciona materiales'
            },
            clientPreferences: {
              budget: '$800 - $1200',
              timeframe: 'Próximo mes',
              workHours: 'Lunes a sábado, 7am-4pm',
              paymentMethod: '40% adelanto, 60% al completar'
            }
          },
          {
            clientId: 'cliente_007',
            clientName: 'Carmen Torres',
            postContent: 'Instalación de sistema de seguridad con cámaras',
            description: 'Necesito instalar 6 cámaras de seguridad IP en mi casa, con grabación en DVR y visualización remota desde el celular.',
            location: 'Centro de Guayaquil - Las Peñas',
            workType: 'Seguridad',
            budget: '$300 - $400',
            estimatedTime: '1-2 días',
            urgency: 'Alta',
            isImage: false,
            postedDate: '2025-01-22',
            tags: ['seguridad', 'cámaras', 'instalación', 'vigilancia'],
            requirements: {
              experience: 'Experiencia en sistemas de seguridad',
              tools: 'Herramientas de instalación, taladro',
              certifications: 'Conocimiento en redes IP',
              timeline: 'Esta semana',
              materials: 'Cliente proporciona equipos'
            },
            clientPreferences: {
              budget: '$300 - $400',
              timeframe: 'Esta semana',
              workHours: 'Lunes a viernes, 8am-5pm',
              paymentMethod: 'Transferencia bancaria'
            }
          },
          {
            clientId: 'cliente_008',
            clientName: 'Diego Ramírez',
            postContent: 'Reparación de lavadora - no centrifuga',
            description: 'Mi lavadora Whirlpool de 18kg no está centrifugando bien. Se queda con agua y la ropa sale muy mojada. Necesito revisión.',
            location: 'Sur de Guayaquil - Guasmo Sur',
            workType: 'Técnico en Electrodomésticos',
            budget: '$35 - $60',
            estimatedTime: '2-3 horas',
            urgency: 'Media',
            isImage: false,
            postedDate: '2025-01-21',
            tags: ['lavadora', 'electrodomésticos', 'reparación', 'centrifugado'],
            requirements: {
              experience: 'Experiencia en electrodomésticos',
              tools: 'Herramientas básicas de técnico',
              certifications: 'No requerido',
              timeline: 'Esta semana',
              materials: 'Según diagnóstico'
            },
            clientPreferences: {
              budget: '$35 - $60',
              timeframe: 'Esta semana',
              workHours: 'Tardes, 2pm-6pm',
              paymentMethod: 'Efectivo'
            }
          },
          {
            clientId: 'cliente_009',
            clientName: 'Elena Castro',
            postContent: 'Instalación de red WiFi empresarial',
            description: 'Oficina de 200m² necesita instalación de red WiFi empresarial con 3 access points, cableado estructurado y configuración completa.',
            location: 'Norte de Guayaquil - Kennedy Norte',
            workType: 'Técnico en Redes',
            budget: '$250 - $350',
            estimatedTime: '1-2 días',
            urgency: 'Alta',
            isImage: false,
            postedDate: '2025-01-22',
            tags: ['redes', 'wifi', 'empresarial', 'cableado'],
            requirements: {
              experience: 'Experiencia en redes empresariales',
              tools: 'Herramientas de redes, ponchadora',
              certifications: 'Conocimiento en redes TCP/IP',
              timeline: 'Esta semana',
              materials: 'Cliente proporciona equipos'
            },
            clientPreferences: {
              budget: '$250 - $350',
              timeframe: 'Esta semana',
              workHours: 'Lunes a viernes, 8am-5pm',
              paymentMethod: 'Transferencia o cheque'
            }
          },
          {
            clientId: 'cliente_010',
            clientName: 'Fernando López',
            postContent: 'Limpieza profunda de oficina después de remodelación',
            description: 'Oficina de 150m² necesita limpieza profunda post-remodelación. Incluye limpieza de polvo, vidrios, pisos y sanitización general.',
            location: 'Centro de Guayaquil - Malecón 2000',
            workType: 'Limpieza',
            budget: '$80 - $120',
            estimatedTime: '1 día',
            urgency: 'Media',
            isImage: false,
            postedDate: '2025-01-20',
            tags: ['limpieza', 'oficina', 'profunda', 'post-remodelación'],
            requirements: {
              experience: 'Experiencia en limpieza comercial',
              tools: 'Equipos y productos de limpieza',
              certifications: 'No requerido',
              timeline: 'Próxima semana',
              materials: 'Trabajador debe traer productos'
            },
            clientPreferences: {
              budget: '$80 - $120',
              timeframe: 'Próxima semana',
              workHours: 'Fines de semana preferible',
              paymentMethod: 'Efectivo o transferencia'
            }
          },
          {
            clientId: 'cliente_011',
            clientName: 'Sandra Villacrés',
            postContent: 'Jardinería y paisajismo para casa nueva',
            description: 'Casa nueva con jardín de 100m² necesita diseño paisajístico, siembra de césped, plantas ornamentales y sistema de riego.',
            location: 'Norte de Guayaquil - Samborondón',
            workType: 'Jardinería',
            budget: '$400 - $600',
            estimatedTime: '3-5 días',
            urgency: 'Baja',
            isImage: false,
            postedDate: '2025-01-19',
            tags: ['jardinería', 'paisajismo', 'césped', 'riego'],
            requirements: {
              experience: 'Experiencia en jardinería y paisajismo',
              tools: 'Herramientas de jardinería',
              certifications: 'No requerido',
              timeline: 'Próximo mes',
              materials: 'Cliente proporciona plantas'
            },
            clientPreferences: {
              budget: '$400 - $600',
              timeframe: 'Próximo mes',
              workHours: 'Mañanas, 7am-12pm',
              paymentMethod: '50% adelanto, 50% al finalizar'
            }
          },
          {
            clientId: 'cliente_012',
            clientName: 'Miguel Andrade',
            postContent: 'Soldadura de portón metálico - reparación urgente',
            description: 'Portón de garaje se quebró en las bisagras. Necesito soldadura de refuerzo y ajuste completo. Trabajo urgente.',
            location: 'Este de Guayaquil - Pascuales',
            workType: 'Soldador',
            budget: '$45 - $75',
            estimatedTime: '3-4 horas',
            urgency: 'Urgente',
            isImage: false,
            postedDate: '2025-01-22',
            tags: ['soldadura', 'portón', 'metálico', 'reparación'],
            requirements: {
              experience: 'Experiencia en soldadura de estructuras',
              tools: 'Equipo de soldadura, electrodos',
              certifications: 'Certificación en soldadura',
              timeline: 'Hoy o mañana',
              materials: 'Trabajador debe traer materiales'
            },
            clientPreferences: {
              budget: '$45 - $75',
              timeframe: 'Inmediato',
              workHours: 'Flexible, incluso fines de semana',
              paymentMethod: 'Efectivo'
            }
          }
        ];
        
        setClientPosts(mockPosts as ClientPost[]);
        setFilteredPosts(mockPosts as ClientPost[]);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };
    loadPosts();
  }, []);

  // Filtrado mejorado con nuevas funcionalidades
  useEffect(() => {
    let filtered = clientPosts.filter(post => {
      const matchesSearch = searchText === '' || 
        post.postContent.toLowerCase().includes(searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(searchText.toLowerCase()) ||
        post.location.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));

      // Filtro por categoría
      let matchesCategory = true;
      if (selectedCategory !== 'Todos') {
        if (selectedCategory === 'Urgente') {
          matchesCategory = post.urgency === 'Urgente';
        } else {
          matchesCategory = post.tags.some(tag => 
            tag.toLowerCase().includes(selectedCategory.toLowerCase())
          );
        }
      }

      // Filtro por presupuesto
      let matchesBudget = true;
      if (budgetFilter !== 'Todos' && post.budget) {
        const budget = parseInt(post.budget.replace(/[^0-9]/g, ''));
        switch(budgetFilter) {
          case '5-15':
            matchesBudget = budget >= 5 && budget <= 15;
            break;
          case '15-30':
            matchesBudget = budget >= 15 && budget <= 30;
            break;
          case '30+':
            matchesBudget = budget >= 30;
            break;
        }
      }

      // Filtro por distancia (simulado basado en ubicación)
      let matchesDistance = true;
      if (distanceFilter !== 'Todos') {
        const isNearby = post.location.includes('Centro') || post.location.includes('Norte');
        const isMedium = post.location.includes('Sur') || post.location.includes('Este');
        
        switch(distanceFilter) {
          case 'Cerca':
            matchesDistance = isNearby;
            break;
          case 'Mediana':
            matchesDistance = isMedium;
            break;
          case 'Lejos':
            matchesDistance = !isNearby && !isMedium;
            break;
        }
      }

      return matchesSearch && matchesCategory && matchesBudget && matchesDistance;
    });

    // Ordenamiento
    switch(sortBy) {
      case 'budget':
        filtered.sort((a, b) => {
          const budgetA = a.budget ? parseInt(a.budget.replace(/[^0-9]/g, '')) : 0;
          const budgetB = b.budget ? parseInt(b.budget.replace(/[^0-9]/g, '')) : 0;
          return budgetB - budgetA;
        });
        break;
      case 'recent':
        // Ya están ordenados por fecha por defecto
        break;
      case 'distance':
        filtered.sort((a, b) => {
          const scoreA = a.location.includes('Centro') ? 3 : a.location.includes('Norte') ? 2 : 1;
          const scoreB = b.location.includes('Centro') ? 3 : b.location.includes('Norte') ? 2 : 1;
          return scoreB - scoreA;
        });
        break;
    }

    setFilteredPosts(filtered);
  }, [searchText, selectedCategory, clientPosts, budgetFilter, distanceFilter, sortBy]);

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // 🎯 FUNCIONES PARA NUEVAS FUNCIONALIDADES
  
  // A) Sistema de Favoritos
  const toggleFavorite = (postId: string) => {
    setFavorites(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const getFavoriteJobs = () => {
    return clientPosts.filter(post => favorites.includes(post.clientId));
  };

  // B) Sistema de Aplicación Completa
  const submitJobApplication = (post: ClientPost) => {
    setAppliedJobs(prev => [...prev, post.clientId]);
    setApplicationFormVisible(false);
    
    // Reset form data
    setApplicationData({
      coverLetter: '',
      proposedBudget: '',
      estimatedDuration: '',
      availableDate: '',
      experience: '',
      tools: ''
    });
    
    console.log(`Aplicación enviada para trabajo de ${post.clientName}:`, applicationData);
  };

  const hasApplied = (postId: string) => {
    return appliedJobs.includes(postId);
  };

  // C) Funciones para mostrar estadísticas
  const getDistanceLabel = (location: string) => {
    if (location.includes('Centro') || location.includes('Norte')) return 'Cerca';
    if (location.includes('Sur') || location.includes('Este')) return 'Mediana';
    return 'Lejos';
  };

  // 🆕 NUEVAS FUNCIONES PARA HISTORIAL DE TRABAJOS
  
  // Función para agregar evidencia
  const addEvidence = (imageUrl: string) => {
    setEvidenceImages(prev => [...prev, imageUrl]);
  };

  // Función para contactar cliente
  const contactClient = (phone: string) => {
    console.log(`Contactando cliente: ${phone}`);
    // Aquí iría la lógica para abrir WhatsApp o llamada
  };

  // Función para marcar trabajo como completado
  const markJobComplete = (jobId: string) => {
    console.log(`Marcando trabajo ${jobId} como completado`);
    setJobProgressVisible(false);
    // Aquí iría la lógica para actualizar el estado del trabajo
  };

  // Función para actualizar progreso
  const updateJobProgress = (jobId: string, progress: number, note: string) => {
    console.log(`Actualizando progreso del trabajo ${jobId}: ${progress}% - ${note}`);
    // Aquí iría la lógica para guardar el progreso
  };

  const handlePostPress = (post: ClientPost) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const getRandomClientPhoto = (clientId: string) => {
    const seed = clientId.charCodeAt(0) % 2;
    const photos = seed === 0 ? hombreFotos : mujerFotos;
    const index = clientId.charCodeAt(clientId.length - 1) % photos.length;
    return photos[index];
  };

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'Urgente': return '#EF4444';
      case 'Alta': return '#F97316';
      case 'Media': return '#EAB308';
      case 'Baja': return '#22C55E';
      default: return ORANGE_PRIMARY;
    }
  };

  const renderPostCard = (post: ClientPost) => (
    <TouchableOpacity
      key={post.clientId}
      style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-[${ORANGE_LIGHTER}]`}
      onPress={() => handlePostPress(post)}
    >
      <View style={tw`flex-row`}>
        <Image
          source={{ uri: getRandomClientPhoto(post.clientId) }}
          style={tw`w-12 h-12 rounded-full`}
          resizeMode="cover"
        />
        <View style={tw`flex-1 ml-3`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-gray-900 font-semibold text-base flex-1`}>{post.clientName}</Text>
            <View style={tw`flex-row items-center`}>
              {/* A) Botón de Favoritos */}
              <TouchableOpacity
                style={tw`p-2 mr-1`}
                onPress={() => toggleFavorite(post.clientId)}
              >
                <MaterialIcons 
                  name={favorites.includes(post.clientId) ? "favorite" : "favorite-border"} 
                  size={20} 
                  color={favorites.includes(post.clientId) ? "#EF4444" : "#9CA3AF"} 
                />
              </TouchableOpacity>
              <View style={[
                tw`px-2 py-1 rounded-full`,
                { backgroundColor: getUrgencyColor(post.urgency) + '20' }
              ]}>
                <Text style={[tw`text-xs font-bold`, { color: getUrgencyColor(post.urgency) }]}>
                  {post.urgency.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <Text style={tw`text-gray-600 text-sm mt-1 leading-4`} numberOfLines={2}>
            {post.postContent}
          </Text>
          <View style={tw`flex-row items-center mt-2`}>
            <MaterialIcons name="location-on" size={14} color="#666" />
            <Text style={tw`text-gray-500 text-sm ml-1`}>📍 {post.location}</Text>
            <Text style={tw`text-gray-400 text-sm mx-2`}>•</Text>
            <Text style={tw`text-blue-500 text-xs`}>{getDistanceLabel(post.location)}</Text>
            {post.estimatedTime && (
              <>
                <Text style={tw`text-gray-400 text-sm mx-2`}>•</Text>
                <MaterialIcons name="schedule" size={14} color="#666" />
                <Text style={tw`text-gray-500 text-sm ml-1`}>{post.estimatedTime}</Text>
              </>
            )}
          </View>
        </View>
        <View style={tw`items-end justify-center`}>
          {post.budget && (
            <>
              <Text style={tw`text-black font-bold text-lg`}>{post.budget}</Text>
              <Text style={tw`text-gray-500 text-xs`}>presupuesto</Text>
            </>
          )}
        </View>
      </View>
      
      {/* Botón de Aplicación */}
      <View style={tw`flex-row mt-3 pt-3 border-t border-gray-100`}>
        {hasApplied(post.clientId) ? (
          <View style={tw`flex-1 bg-green-100 py-2 rounded-lg flex-row items-center justify-center`}>
            <MaterialIcons name="check-circle" size={16} color="#10B981" />
            <Text style={tw`text-green-700 font-medium ml-2`}>Ya Aplicaste</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={tw`flex-1 bg-[${ORANGE_PRIMARY}] py-2 rounded-lg flex-row items-center justify-center`}
            onPress={() => {
              setSelectedJobForApplication(post);
              setApplicationFormVisible(true);
            }}
          >
            <MaterialIcons name="work" size={16} color="#FFFFFF" />
            <Text style={tw`text-white font-medium ml-2`}>Postular</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Espacio arriba del header */}
      <View style={tw`h-6`} />
      
      {/* Header: mismo estilo que ClienteHomeScreen */}
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
          <View>
            <Text style={{ color: '#111', fontSize: 24, fontWeight: 'bold' }}>
              Buenos días, {workerProfile.name}
            </Text>
            <Text style={{ color: '#666', fontSize: 14, opacity: 0.9 }}>
              {workerProfile.profession} • ⭐ {workerProfile.rating} ({workerProfile.completedJobs} trabajos)
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              style={tw`p-2 relative`}
              onPress={() => setNotificationsVisible(true)}
            >
              <MaterialIcons name="notifications" size={24} color={ORANGE_PRIMARY} />
              {notifications.filter(n => !n.isRead).length > 0 && (
                <View style={tw`absolute -top-1 -right-1 bg-[${ORANGE_DARK}] w-5 h-5 rounded-full items-center justify-center`}>
                  <Text style={tw`text-white text-xs font-bold`}>{notifications.filter(n => !n.isRead).length}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            {/* A) Botón de Favoritos en Header */}
            <TouchableOpacity
              style={tw`p-2 relative ml-2`}
              onPress={() => setFavoritesVisible(true)}
            >
              <MaterialIcons name="favorite" size={24} color={ORANGE_PRIMARY} />
              {favorites.length > 0 && (
                <View style={tw`absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center`}>
                  <Text style={tw`text-white text-xs font-bold`}>{favorites.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1️⃣ DASHBOARD DEL TRABAJADOR - PRIMERA SECCIÓN */}
        <View 
          style={tw`mx-4 mt-4 mb-6 p-4 bg-white rounded-xl border-l-4 border-[${ORANGE_PRIMARY}]`}
        >
          <View style={tw`flex-row items-center justify-between mb-3`}>
            <Text style={tw`text-[${ORANGE_PRIMARY}] font-bold text-base`}>📊 Tu Dashboard Personal</Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-black`}>{workerStats.jobsApplied}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Aplicados</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-green-500`}>{workerStats.jobsAccepted}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Aceptados</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-2xl font-bold text-blue-500`}>{workerStats.jobsCompleted}</Text>
              <Text style={tw`text-gray-600 text-sm`}>Completados</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-xl font-bold text-green-600`}>${workerStats.monthlyEarnings}</Text>
              <Text style={tw`text-gray-600 text-xs`}>Este mes</Text>
            </View>
            <View style={tw`items-center`}>
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="star" size={16} color="#FFBF00" />
                <Text style={tw`text-xl font-bold text-yellow-600 ml-1`}>{workerStats.averageRating}</Text>
              </View>
              <Text style={tw`text-gray-600 text-xs`}>Rating</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-xl font-bold text-black`}>${workerStats.totalEarnings}</Text>
              <Text style={tw`text-gray-600 text-xs`}>Total ganado</Text>
            </View>
          </View>
          
          {/* 🆕 Sección de Trabajos en Progreso */}
          {jobHistory.inProgress.length > 0 && (
            <View style={tw`mt-4 pt-4 border-t border-gray-200`}>
              <Text style={tw`text-[${ORANGE_DARK}] font-bold text-sm mb-2`}>🚧 Trabajos en Progreso ({jobHistory.inProgress.length})</Text>
              {jobHistory.inProgress.slice(0, 2).map((job, index) => (
                <TouchableOpacity
                  key={job.id}
                  style={tw`bg-blue-50 p-3 rounded-lg mb-2 border border-blue-200`}
                  onPress={() => {
                    setSelectedProgressJob(job);
                    setJobProgressVisible(true);
                  }}
                >
                  <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-1`}>
                      <Text style={tw`font-bold text-gray-800 text-sm`}>{job.jobTitle}</Text>
                      <Text style={tw`text-gray-600 text-xs`}>{job.clientName}</Text>
                      <View style={tw`flex-row items-center mt-1`}>
                        <View style={tw`flex-1 bg-gray-200 rounded-full h-1.5 mr-2`}>
                          <View 
                            style={[tw`bg-blue-500 h-1.5 rounded-full`, { width: `${job.progress}%` }]} 
                          />
                        </View>
                        <Text style={tw`text-blue-600 text-xs font-bold`}>{job.progress}%</Text>
                      </View>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={14} color="#3B82F6" />
                  </View>
                </TouchableOpacity>
              ))}
              {jobHistory.inProgress.length > 2 && (
                <Text style={tw`text-gray-600 text-xs text-center`}>
                  Toca para ver todos los trabajos en progreso
                </Text>
              )}
            </View>
          )}
        </View>

        {/* 2️⃣ PROPUESTAS DE CLIENTES - SEGUNDA SECCIÓN */}
        <View style={tw`mx-4 mb-6 p-4 bg-white rounded-xl border-l-4 border-[${ORANGE_PRIMARY}]`}>
          <Text style={tw`text-[${ORANGE_PRIMARY}] font-bold text-base mb-3`}>💼 Propuestas de Clientes</Text>
          <Text style={tw`text-gray-600 text-sm mb-4`}>Clientes que te han contactado directamente</Text>
          
          {clientProposals.length === 0 ? (
            <View style={tw`items-center py-6`}>
              <Text style={tw`text-4xl mb-2`}>📩</Text>
              <Text style={tw`text-gray-500 text-center`}>No tienes propuestas pendientes</Text>
            </View>
          ) : (
            clientProposals.slice(0, 2).map((proposal) => (
              <TouchableOpacity
                key={proposal.id}
                style={tw`bg-purple-50 border border-purple-200 rounded-xl p-4 mb-3`}
                onPress={() => {
                  setSelectedProposal(proposal);
                  setProposalModalVisible(true);
                }}
              >
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={{ uri: proposal.clientPhoto }}
                    style={tw`w-12 h-12 rounded-full`}
                    resizeMode="cover"
                  />
                  <View style={tw`flex-1 ml-3`}>
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`font-bold text-gray-800`}>{proposal.clientName}</Text>
                    </View>
                    <Text style={tw`font-medium text-purple-700 text-sm`}>{proposal.jobTitle}</Text>
                    <View style={tw`flex-row items-center justify-between mt-2`}>
                      <Text style={tw`text-gray-500 text-xs`}>{proposal.location}</Text>
                      <Text style={tw`text-purple-600 font-bold`}>{proposal.budget}</Text>
                    </View>
                  </View>
                  <MaterialIcons name="arrow-forward-ios" size={16} color="#8B5CF6" />
                </View>
              </TouchableOpacity>
            ))
          )}
          
          {clientProposals.length > 2 && (
            <TouchableOpacity
              style={tw`bg-purple-100 p-3 rounded-lg items-center`}
            >
              <Text style={tw`text-purple-600 font-medium`}>
                Ver todas las propuestas ({clientProposals.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 3️⃣ BÚSQUEDA Y EXPLORACIÓN - TERCERA SECCIÓN */}
        <View style={tw`mx-4 mb-4`}>
          <Text style={tw`text-[${ORANGE_PRIMARY}] font-bold text-lg mb-3`}>🔍 Explorar Trabajos</Text>
        </View>

        {/* Búsqueda */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row items-center bg-white rounded-lg px-3 py-3 shadow-sm border border-[${ORANGE_ACCENT}]`}>
            <MaterialIcons name="search" size={20} color={ORANGE_PRIMARY} />
            <TextInput
              style={tw`flex-1 ml-2 text-base text-gray-700`}
              placeholder="Buscar trabajos por ubicación, tipo..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#A3A3A3"
            />
          </View>
        </View>

        {/* Categorías */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`px-4 mb-4`}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={tw`${selectedCategory === category.value
                ? `bg-[${ORANGE_PRIMARY}]`
                : `bg-white border border-[${ORANGE_LIGHTER}]`} px-4 py-2 rounded-full mr-2`}
              onPress={() => setSelectedCategory(category.value)}>
              <Text style={tw`${selectedCategory === category.value
                ? 'text-white'
                : `text-[${ORANGE_PRIMARY}]`} font-medium`}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtros y Ordenamiento - MEJORADOS CON DESPLEGABLES */}
        <View style={tw`px-4 mb-4`}>
          <Text style={tw`text-[${ORANGE_DARK}] text-sm font-bold mb-3`}>🔧 Filtros Avanzados</Text>
          
          {/* Filtros de Presupuesto - DESPLEGABLE */}
          <View style={tw`mb-3`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-3`}
              onPress={() => setShowBudgetFilter(!showBudgetFilter)}
            >
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="attach-money" size={20} color={ORANGE_PRIMARY} />
                <Text style={tw`text-gray-700 ml-2`}>
                  Presupuesto: {budgetFilter === 'Todos' ? 'Todos los rangos' : budgetFilter}
                </Text>
              </View>
              <MaterialIcons 
                name={showBudgetFilter ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {showBudgetFilter && (
              <View style={tw`bg-white border border-gray-200 rounded-lg mt-2 overflow-hidden`}>
                {budgetRanges.map((budget) => (
                  <TouchableOpacity
                    key={budget.value}
                    style={tw`p-3 border-b border-gray-100 ${budgetFilter === budget.value ? 'bg-orange-50' : ''}`}
                    onPress={() => {
                      setBudgetFilter(budget.value);
                      setShowBudgetFilter(false);
                    }}
                  >
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`${budgetFilter === budget.value ? `text-[${ORANGE_PRIMARY}] font-bold` : 'text-gray-700'}`}>
                        {budget.label}
                      </Text>
                      {budgetFilter === budget.value && (
                        <MaterialIcons name="check" size={20} color={ORANGE_PRIMARY} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Filtros de Distancia - DESPLEGABLE */}
          <View style={tw`mb-3`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-3`}
              onPress={() => setShowDistanceFilter(!showDistanceFilter)}
            >
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="location-on" size={20} color={ORANGE_PRIMARY} />
                <Text style={tw`text-gray-700 ml-2`}>
                  Distancia: {distanceFilter === 'Todos' ? 'Todas las ubicaciones' : distanceFilter}
                </Text>
              </View>
              <MaterialIcons 
                name={showDistanceFilter ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {showDistanceFilter && (
              <View style={tw`bg-white border border-gray-200 rounded-lg mt-2 overflow-hidden`}>
                {distanceOptions.map((distance) => (
                  <TouchableOpacity
                    key={distance.value}
                    style={tw`p-3 border-b border-gray-100 ${distanceFilter === distance.value ? 'bg-orange-50' : ''}`}
                    onPress={() => {
                      setDistanceFilter(distance.value);
                      setShowDistanceFilter(false);
                    }}
                  >
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`${distanceFilter === distance.value ? `text-[${ORANGE_PRIMARY}] font-bold` : 'text-gray-700'}`}>
                        {distance.label}
                      </Text>
                      {distanceFilter === distance.value && (
                        <MaterialIcons name="check" size={20} color={ORANGE_PRIMARY} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Ordenamiento - DESPLEGABLE */}
          <View style={tw`mb-3`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between bg-white border border-gray-300 rounded-lg p-3`}
              onPress={() => setShowSortOptions(!showSortOptions)}
            >
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="sort" size={20} color={ORANGE_PRIMARY} />
                <Text style={tw`text-gray-700 ml-2`}>
                  Ordenar por: {sortBy === 'recent' ? 'Recientes' : sortBy === 'budget' ? 'Presupuesto' : 'Distancia'}
                </Text>
              </View>
              <MaterialIcons 
                name={showSortOptions ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {showSortOptions && (
              <View style={tw`bg-white border border-gray-200 rounded-lg mt-2 overflow-hidden`}>
                {[
                  { key: 'recent', label: 'Más Recientes' },
                  { key: 'budget', label: 'Mayor Presupuesto' },
                  { key: 'distance', label: 'Más Cercanos' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={tw`p-3 border-b border-gray-100 ${sortBy === option.key ? 'bg-orange-50' : ''}`}
                    onPress={() => {
                      setSortBy(option.key);
                      setShowSortOptions(false);
                    }}
                  >
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`${sortBy === option.key ? `text-[${ORANGE_PRIMARY}] font-bold` : 'text-gray-700'}`}>
                        {option.label}
                      </Text>
                      {sortBy === option.key && (
                        <MaterialIcons name="check" size={20} color={ORANGE_PRIMARY} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Lista de trabajos filtrados */}
        <View style={tw`px-4 pb-6`}>
          <Text style={tw`text-[${ORANGE_DARKER}] text-lg font-bold mb-4`}>
            Oportunidades para Ti ({filteredPosts.length})
          </Text>
          {filteredPosts.length === 0 ? (
            <View style={tw`bg-white p-8 rounded-xl items-center`}>
              <Text style={tw`text-6xl mb-4`}>🔍</Text>
              <Text style={tw`text-center text-lg mb-2 font-bold text-gray-700`}>
                No se encontraron trabajos
              </Text>
              <Text style={tw`text-center text-gray-500`}>
                {searchText ? `para "${searchText}"` : 'No hay trabajos disponibles'}
              </Text>
            </View>
          ) : (
            filteredPosts.map(renderPostCard)
          )}
        </View>
      </ScrollView>

      {/* Modal de detalle del trabajo */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[85%]`}>
            {selectedPost && (
              <>
                {/* Header con botón cerrar */}
                <View style={tw`relative p-4 border-b border-gray-200`}>
                  <TouchableOpacity
                    style={tw`absolute top-2 right-2 p-2`}
                    onPress={() => setModalVisible(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  <View style={tw`items-center pt-2`}>
                    <Image
                      source={{ uri: getRandomClientPhoto(selectedPost.clientId) }}
                      style={tw`w-24 h-24 rounded-full mb-3`}
                      resizeMode="cover"
                    />
                    <Text style={tw`text-xl font-bold text-gray-800`}>{selectedPost.clientName}</Text>
                    <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium`}>Cliente verificado</Text>
                    <View style={tw`flex-row items-center mt-2`}>
                      <View style={[
                        tw`px-3 py-1 rounded-full`,
                        { backgroundColor: getUrgencyColor(selectedPost.urgency) + '20' }
                      ]}>
                        <Text style={[tw`text-sm font-bold`, { color: getUrgencyColor(selectedPost.urgency) }]}>
                          {selectedPost.urgency}
                        </Text>
                      </View>
                    </View>
                    <Text style={tw`text-gray-500 mt-1`}>📍 {selectedPost.location}</Text>
                  </View>
                </View>

                {/* Contenido scrolleable */}
                <ScrollView style={tw`p-4`} showsVerticalScrollIndicator={false}>
                  {/* Descripción del trabajo */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2 text-lg`}>Descripción del Trabajo:</Text>
                    <Text style={tw`text-gray-700 leading-5`}>{selectedPost.postContent}</Text>
                    {selectedPost.description && (
                      <Text style={tw`text-gray-600 mt-2 leading-5`}>{selectedPost.description}</Text>
                    )}
                  </View>

                  {/* Imagen si existe */}
                  {selectedPost.isImage && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Imagen de Referencia:</Text>
                      <Image
                        source={{ uri: selectedPost.postContent }}
                        style={tw`w-full h-48 rounded-xl`}
                        resizeMode="cover"
                      />
                    </View>
                  )}

                  {/* Detalles del trabajo */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Detalles del Trabajo:</Text>
                    {selectedPost.estimatedTime && (
                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="schedule" size={16} color={ORANGE_PRIMARY} />
                        <Text style={tw`text-gray-600 ml-2`}>Tiempo estimado: {selectedPost.estimatedTime}</Text>
                      </View>
                    )}
                    <View style={tw`flex-row items-center mb-2`}>
                      <MaterialIcons name="work" size={16} color={ORANGE_PRIMARY} />
                      <Text style={tw`text-gray-600 ml-2`}>Tipo: {selectedPost.workType}</Text>
                    </View>
                    <View style={tw`flex-row items-center mb-2`}>
                      <MaterialIcons name="location-on" size={16} color={ORANGE_PRIMARY} />
                      <Text style={tw`text-gray-600 ml-2`}>Ubicación: {selectedPost.location}</Text>
                    </View>
                  </View>

                  {/* 🆕 NUEVOS: Preferencias del cliente */}
                  {(selectedPost as any).clientPreferences && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-3`}>⚙️ Preferencias del Cliente:</Text>
                      
                      <View style={tw`bg-gray-50 p-3 rounded-lg mb-2`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="access-time" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-700 font-medium ml-2`}>Horarios preferidos:</Text>
                        </View>
                        <Text style={tw`text-gray-700 ml-6`}>{(selectedPost as any).clientPreferences.workHours}</Text>
                      </View>

                      <View style={tw`bg-gray-50 p-3 rounded-lg mb-2`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="event" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-700 font-medium ml-2`}>Marco de tiempo:</Text>
                        </View>
                        <Text style={tw`text-gray-700 ml-6`}>{(selectedPost as any).clientPreferences.timeframe}</Text>
                      </View>

                      <View style={tw`bg-gray-50 p-3 rounded-lg`}>
                        <View style={tw`flex-row items-center mb-1`}>
                          <MaterialIcons name="payment" size={16} color="#6B7280" />
                          <Text style={tw`text-gray-700 font-medium ml-2`}>Método de pago:</Text>
                        </View>
                        <Text style={tw`text-gray-700 ml-6`}>{(selectedPost as any).clientPreferences.paymentMethod}</Text>
                      </View>
                    </View>
                  )}

                  {/* Tags */}
                  {selectedPost.tags.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-[${ORANGE_DARK}] mb-2`}>Etiquetas:</Text>
                      <View style={tw`flex-row flex-wrap`}>
                        {selectedPost.tags.map((tag, index) => (
                          <Text key={index} style={tw`bg-white text-gray-800 px-2 py-1 rounded text-xs mr-2 mb-1 border border-gray-300`}>
                            #{tag}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}
                  
                  {/* Presupuesto */}
                  {selectedPost.budget && (
                    <View style={tw`bg-white p-3 rounded-lg mb-4 border border-gray-200`}>
                      <Text style={tw`font-bold text-[${ORANGE_PRIMARY}] mb-2`}>Presupuesto Propuesto:</Text>
                      <Text style={tw`text-gray-700`}>
                        <Text style={tw`font-bold text-black text-xl`}>{selectedPost.budget}</Text>
                      </Text>
                    </View>
                  )}
                </ScrollView>

                {/* Botón postular */}
                <View style={tw`p-4 border-t border-gray-200`}>
                  {hasApplied(selectedPost.clientId) ? (
                    <View style={tw`bg-green-100 py-3 rounded-lg flex-row items-center justify-center`}>
                      <MaterialIcons name="check-circle" size={20} color="#10B981" />
                      <Text style={tw`text-green-700 font-bold text-center text-base ml-2`}>Ya has postulado a este trabajo</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={tw`bg-[${ORANGE_PRIMARY}] py-3 rounded-lg`}
                      onPress={() => {
                        setModalVisible(false);
                        setSelectedJobForApplication(selectedPost);
                        setApplicationFormVisible(true);
                      }}
                    >
                      <Text style={tw`text-white font-bold text-center text-base`}>Postular a este Trabajo</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal de notificaciones */}
      <Modal
        visible={notificationsVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setNotificationsVisible(false)}>
          <View style={tw`flex-1 bg-black bg-opacity-40 justify-start`}>
            <TouchableWithoutFeedback>
              <View style={[tw`bg-white rounded-b-2xl mx-4 mt-20`, { minHeight: '60%', maxHeight: '80%' }]}>
                {/* Header del modal */}
                <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}>
                  <Text style={tw`text-xl font-bold text-[${ORANGE_PRIMARY}]`}>Notificaciones</Text>
                  <TouchableOpacity 
                    onPress={markAllAsRead}
                    style={tw`bg-white px-3 py-1 rounded-full border border-gray-300`}
                  >
                    <Text style={tw`text-gray-700 text-sm font-medium`}>Marcar todas</Text>
                  </TouchableOpacity>
                </View>

                {/* Lista de notificaciones */}
                <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
                  {notifications.length === 0 ? (
                    <View style={tw`items-center py-8`}>
                      <MaterialIcons name="notifications-none" size={48} color="#9CA3AF" />
                      <Text style={tw`text-gray-500 text-center mt-3`}>No tienes notificaciones nuevas</Text>
                    </View>
                  ) : (
                    notifications.map((notif) => (
                      <View 
                        key={notif.id} 
                        style={tw`${!notif.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'} p-4 rounded-2xl mb-3 border-2`}
                      >
                        <View style={tw`flex-row`}>
                          {/* Icono */}
                          <View style={tw`mr-3 mt-1`}>
                            <MaterialIcons name={notif.icon} size={24} color={notif.color} />
                            {!notif.isRead && (
                              <View style={tw`absolute -top-1 -right-1 w-3 h-3 bg-[${ORANGE_PRIMARY}] rounded-full`} />
                            )}
                          </View>
                          
                          {/* Contenido */}
                          <View style={tw`flex-1`}>
                            <Text style={tw`${!notif.isRead ? 'font-bold' : 'font-medium'} text-gray-900 text-base mb-1`}>
                              {notif.title}
                            </Text>
                            <Text style={tw`text-gray-600 text-sm leading-5 mb-2`}>
                              {notif.message}
                            </Text>
                            <Text style={tw`text-gray-400 text-xs`}>
                              {notif.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de Favoritos */}
      <Modal
        visible={favoritesVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFavoritesVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setFavoritesVisible(false)}>
          <View style={tw`flex-1 bg-black bg-opacity-40 justify-start`}>
            <TouchableWithoutFeedback>
              <View style={[tw`bg-white rounded-b-2xl mx-4 mt-20`, { minHeight: '60%', maxHeight: '80%' }]}>
                {/* Header del modal */}
                <View style={tw`flex-row justify-between items-center p-4 border-b border-gray-200`}>
                  <Text style={tw`text-xl font-bold text-[${ORANGE_PRIMARY}]`}>❤️ Trabajos Favoritos</Text>
                  <TouchableOpacity 
                    onPress={() => setFavoritesVisible(false)}
                    style={tw`bg-white px-3 py-1 rounded-full border border-gray-300`}
                  >
                    <Text style={tw`text-gray-700 text-sm font-medium`}>Cerrar</Text>
                  </TouchableOpacity>
                </View>

                {/* Lista de favoritos */}
                <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
                  {getFavoriteJobs().length === 0 ? (
                    <View style={tw`items-center py-8`}>
                      <Text style={tw`text-6xl mb-4`}>💔</Text>
                      <Text style={tw`text-gray-500 text-center mt-3`}>No tienes trabajos favoritos</Text>
                      <Text style={tw`text-gray-400 text-center text-sm mt-1`}>Toca el corazón en cualquier trabajo para guardarlo</Text>
                    </View>
                  ) : (
                    getFavoriteJobs().map((post) => (
                      <TouchableOpacity
                        key={post.clientId}
                        style={tw`bg-white border border-[${ORANGE_LIGHTER}] rounded-xl p-4 mb-3 shadow-sm`}
                        onPress={() => {
                          setFavoritesVisible(false);
                          handlePostPress(post);
                        }}
                      >
                        <View style={tw`flex-row`}>
                          <Image
                            source={{ uri: getRandomClientPhoto(post.clientId) }}
                            style={tw`w-12 h-12 rounded-full`}
                            resizeMode="cover"
                          />
                          <View style={tw`flex-1 ml-3`}>
                            <Text style={tw`text-gray-900 font-semibold text-base`}>{post.clientName}</Text>
                            <Text style={tw`text-gray-600 text-sm mt-1`} numberOfLines={2}>
                              {post.postContent}
                            </Text>
                            <Text style={tw`text-gray-500 text-xs mt-1`}>📍 {post.location}</Text>
                          </View>
                          <View style={tw`items-end`}>
                            <TouchableOpacity
                              style={tw`p-1`}
                              onPress={() => toggleFavorite(post.clientId)}
                            >
                              <MaterialIcons name="favorite" size={20} color="#EF4444" />
                            </TouchableOpacity>
                            {post.budget && (
                              <Text style={tw`text-black font-bold mt-1`}>{post.budget}</Text>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* 🆕 MODAL DE FORMULARIO DE POSTULACIÓN COMPLETO */}
      <Modal
        visible={applicationFormVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setApplicationFormVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[90%] min-h-[70%] flex-1`}>
            {selectedJobForApplication && (
              <>
                {/* Header */}
                <View style={tw`relative p-4 border-b border-gray-200`}>
                  <TouchableOpacity
                    style={tw`absolute top-2 right-2 p-2`}
                    onPress={() => setApplicationFormVisible(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  <View style={tw`items-center pt-2`}>
                    <Text style={tw`text-xl font-bold text-gray-800`}>📝 Postular al Trabajo</Text>
                    <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium mt-1`}>
                      {selectedJobForApplication.postContent.slice(0, 40)}...
                    </Text>
                    <Text style={tw`text-gray-600 text-sm`}>Cliente: {selectedJobForApplication.clientName}</Text>
                  </View>
                </View>

                {/* Formulario scrolleable */}
                <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
                  
                  {/* Carta de presentación */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-2`}>💼 Carta de Presentación *</Text>
                    <TextInput
                      style={tw`border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[100px]`}
                      placeholder="Describe por qué eres el candidato ideal para este trabajo..."
                      multiline
                      numberOfLines={4}
                      value={applicationData.coverLetter}
                      onChangeText={(text) => setApplicationData({...applicationData, coverLetter: text})}
                      textAlignVertical="top"
                    />
                  </View>

                  {/* Presupuesto propuesto */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-2`}>💰 Tu Presupuesto Propuesto *</Text>
                    <TextInput
                      style={tw`border border-gray-300 rounded-lg p-3 text-gray-700`}
                      placeholder="Ej: $85 - $120"
                      value={applicationData.proposedBudget}
                      onChangeText={(text) => setApplicationData({...applicationData, proposedBudget: text})}
                    />
                    <Text style={tw`text-gray-500 text-xs mt-1`}>Propón un rango de precios justo</Text>
                  </View>

                  {/* Tiempo estimado */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-2`}>⏱️ Duración Estimada *</Text>
                    <TextInput
                      style={tw`border border-gray-300 rounded-lg p-3 text-gray-700`}
                      placeholder="Ej: 2-3 días, 1 semana, etc."
                      value={applicationData.estimatedDuration}
                      onChangeText={(text) => setApplicationData({...applicationData, estimatedDuration: text})}
                    />
                  </View>

                  {/* Fecha disponible */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-2`}>📅 Disponibilidad *</Text>
                    <TextInput
                      style={tw`border border-gray-300 rounded-lg p-3 text-gray-700`}
                      placeholder="Ej: Inmediata, A partir del lunes, etc."
                      value={applicationData.availableDate}
                      onChangeText={(text) => setApplicationData({...applicationData, availableDate: text})}
                    />
                  </View>

                  {/* Experiencia relevante */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-2`}>🎯 Experiencia Relevante</Text>
                    <TextInput
                      style={tw`border border-gray-300 rounded-lg p-3 text-gray-700 min-h-[80px]`}
                      placeholder="Describe tu experiencia en trabajos similares..."
                      multiline
                      numberOfLines={3}
                      value={applicationData.experience}
                      onChangeText={(text) => setApplicationData({...applicationData, experience: text})}
                      textAlignVertical="top"
                    />
                  </View>

                  {/* Herramientas y equipos */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-2`}>🔧 Herramientas y Equipos</Text>
                    <TextInput
                      style={tw`border border-gray-300 rounded-lg p-3 text-gray-700`}
                      placeholder="Ej: Taladro, martillo, kit eléctrico, etc."
                      value={applicationData.tools}
                      onChangeText={(text) => setApplicationData({...applicationData, tools: text})}
                    />
                    <Text style={tw`text-gray-500 text-xs mt-1`}>Lista las herramientas que tienes disponibles</Text>
                  </View>

                </ScrollView>

                {/* Botones de acción */}
                <View style={tw`p-4 border-t border-gray-200`}>
                  <TouchableOpacity
                    style={tw`bg-[${ORANGE_PRIMARY}] py-3 rounded-lg mb-3`}
                    onPress={() => submitJobApplication(selectedJobForApplication)}
                  >
                    <Text style={tw`text-white font-bold text-center text-base`}>Enviar Postulación</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={tw`bg-gray-200 py-3 rounded-lg`}
                    onPress={() => setApplicationFormVisible(false)}
                  >
                    <Text style={tw`text-gray-700 font-medium text-center text-base`}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <FloatingChatBot chatBotServices={chatBotServices} />

      {/* 🆕 MODAL DE PROPUESTA DETALLADA */}
      <Modal
        visible={proposalModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setProposalModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[90%]`}>
            {selectedProposal && (
              <>
                {/* Header */}
                <View style={tw`relative p-4 border-b border-gray-200`}>
                  <TouchableOpacity
                    style={tw`absolute top-2 right-2 p-2`}
                    onPress={() => setProposalModalVisible(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                  
                  <View style={tw`items-center pt-2`}>
                    <Image
                      source={{ uri: selectedProposal.clientPhoto }}
                      style={tw`w-20 h-20 rounded-full mb-3`}
                      resizeMode="cover"
                    />
                    <Text style={tw`text-xl font-bold text-gray-800`}>{selectedProposal.clientName}</Text>
                    <View style={tw`flex-row items-center mt-1`}>
                      <MaterialIcons name="star" size={16} color="#FFBF00" />
                      <Text style={tw`text-yellow-600 font-bold ml-1`}>{selectedProposal.clientRating}</Text>
                      <Text style={tw`text-gray-500 text-sm ml-2`}>({selectedProposal.previousJobs} trabajos)</Text>
                    </View>
                  </View>
                </View>

                {/* Contenido scrolleable */}
                <ScrollView style={tw`p-4`} showsVerticalScrollIndicator={false}>
                  {/* Título del trabajo */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-purple-600 mb-2 text-lg`}>💼 {selectedProposal.jobTitle}</Text>
                    <Text style={tw`text-gray-700 leading-5`}>{selectedProposal.description}</Text>
                  </View>

                  {/* Imágenes del proyecto */}
                  {selectedProposal.images && selectedProposal.images.length > 0 && (
                    <View style={tw`mb-4`}>
                      <Text style={tw`font-bold text-gray-800 mb-3`}>📷 Fotos del Proyecto</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {selectedProposal.images.map((image: string, index: number) => (
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

                  {/* Detalles del trabajo */}
                  <View style={tw`mb-4`}>
                    <Text style={tw`font-bold text-gray-800 mb-3`}>📋 Detalles del Trabajo</Text>
                    
                    <View style={tw`bg-gray-50 p-3 rounded-lg mb-3`}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="location-on" size={16} color="#8B5CF6" />
                        <Text style={tw`text-gray-600 ml-2 font-medium`}>Ubicación:</Text>
                      </View>
                      <Text style={tw`text-gray-700 ml-6`}>{selectedProposal.location}</Text>
                    </View>

                    <View style={tw`bg-gray-50 p-3 rounded-lg mb-3`}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="schedule" size={16} color="#8B5CF6" />
                        <Text style={tw`text-gray-600 ml-2 font-medium`}>Duración Estimada:</Text>
                      </View>
                      <Text style={tw`text-gray-700 ml-6`}>{selectedProposal.estimatedDuration}</Text>
                    </View>

                    <View style={tw`bg-gray-50 p-3 rounded-lg mb-3`}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="event" size={16} color="#8B5CF6" />
                        <Text style={tw`text-gray-600 ml-2 font-medium`}>Fecha Propuesta:</Text>
                      </View>
                      <Text style={tw`text-gray-700 ml-6`}>{selectedProposal.proposedDate}</Text>
                    </View>

                    <View style={tw`bg-gray-50 p-3 rounded-lg mb-3`}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <MaterialIcons name="assignment" size={16} color="#8B5CF6" />
                        <Text style={tw`text-gray-600 ml-2 font-medium`}>Requisitos:</Text>
                      </View>
                      <Text style={tw`text-gray-700 ml-6`}>{selectedProposal.requirements}</Text>
                    </View>
                  </View>

                  {/* Presupuesto */}
                  <View style={tw`bg-purple-50 p-4 rounded-lg mb-4 border-2 border-purple-200`}>
                    <Text style={tw`font-bold text-purple-600 mb-2 text-center`}>💰 Presupuesto Ofrecido</Text>
                    <Text style={tw`text-3xl font-bold text-purple-700 text-center`}>{selectedProposal.budget}</Text>
                    <Text style={tw`text-purple-600 text-center text-sm mt-1`}>Estado: {selectedProposal.status}</Text>
                  </View>

                  {/* Información de contacto */}
                  <View style={tw`bg-blue-50 p-3 rounded-lg mb-4`}>
                    <Text style={tw`font-bold text-blue-600 mb-2`}>📞 Información de Contacto</Text>
                    <Text style={tw`text-blue-700`}>{selectedProposal.clientPhone}</Text>
                  </View>
                </ScrollView>

                {/* Botones de acción */}
                <View style={tw`p-4 border-t border-gray-200`}>
                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      style={tw`flex-1 bg-green-500 py-3 rounded-lg mr-2 flex-row items-center justify-center`}
                      onPress={() => {
                        console.log('Aceptando propuesta:', selectedProposal.id);
                        setProposalModalVisible(false);
                      }}
                    >
                      <MaterialIcons name="check" size={20} color="#FFFFFF" />
                      <Text style={tw`text-white font-bold ml-2`}>Aceptar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={tw`flex-1 bg-blue-500 py-3 rounded-lg mx-1 flex-row items-center justify-center`}
                      onPress={() => {
                        console.log('Negociando propuesta:', selectedProposal.id);
                        setProposalModalVisible(false);
                      }}
                    >
                      <MaterialIcons name="chat" size={20} color="#FFFFFF" />
                      <Text style={tw`text-white font-bold ml-2`}>Negociar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={tw`flex-1 bg-gray-500 py-3 rounded-lg ml-2 flex-row items-center justify-center`}
                      onPress={() => {
                        console.log('Rechazando propuesta:', selectedProposal.id);
                        setProposalModalVisible(false);
                      }}
                    >
                      <MaterialIcons name="close" size={20} color="#FFFFFF" />
                      <Text style={tw`text-white font-bold ml-2`}>Rechazar</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Botón de contacto directo */}
                  <TouchableOpacity
                    style={tw`bg-green-600 py-3 rounded-lg mt-3 flex-row items-center justify-center`}
                    onPress={() => contactClient(selectedProposal.clientPhone)}
                  >
                    <MaterialIcons name="phone" size={20} color="#FFFFFF" />
                    <Text style={tw`text-white font-bold ml-2`}>Llamar al Cliente</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* 🆕 MODAL DE TRABAJO EN PROGRESO */}
      <Modal
        visible={jobProgressVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setJobProgressVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center p-4`}>
          <View style={tw`bg-white rounded-xl max-h-[90%]`}>
            {/* Header */}
            <View style={tw`relative p-4 border-b border-gray-200`}>
              <TouchableOpacity
                style={tw`absolute top-2 right-2 p-2`}
                onPress={() => setJobProgressVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
              
              <View style={tw`items-center pt-2`}>
                <Text style={tw`text-xl font-bold text-gray-800`}>📊 Mi Historial de Trabajos</Text>
                <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium mt-1`}>
                  Gestiona todos tus proyectos
                </Text>
              </View>
            </View>

            <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
              {/* Estadísticas generales */}
              <View style={tw`p-4 border-b border-gray-100`}>
                <View style={tw`flex-row justify-between mb-4`}>
                  <View style={tw`items-center flex-1`}>
                    <Text style={tw`text-2xl font-bold text-black`}>{jobHistory.applied.length}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>Aplicados</Text>
                  </View>
                  <View style={tw`items-center flex-1`}>
                    <Text style={tw`text-2xl font-bold text-blue-500`}>{jobHistory.inProgress.length}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>En Progreso</Text>
                  </View>
                  <View style={tw`items-center flex-1`}>
                    <Text style={tw`text-2xl font-bold text-green-500`}>{jobHistory.completed.length}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>Completados</Text>
                  </View>
                </View>
              </View>

              {/* Trabajos en Progreso - PRIORIDAD */}
              {jobHistory.inProgress.length > 0 && (
                <View style={tw`p-4 border-b border-gray-100`}>
                  <Text style={tw`text-lg font-bold text-blue-600 mb-3 flex-row items-center`}>
                    🚧 Trabajos en Progreso ({jobHistory.inProgress.length})
                  </Text>
                  {jobHistory.inProgress.map((job) => (
                    <TouchableOpacity
                      key={job.id}
                      style={tw`bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3`}
                      onPress={() => {
                        setSelectedProgressJob(job);
                        setJobProgressVisible(true);
                      }}
                    >
                      <View style={tw`flex-row`}>
                        <Image
                          source={{ uri: job.clientPhoto }}
                          style={tw`w-12 h-12 rounded-full`}
                          resizeMode="cover"
                        />
                        <View style={tw`flex-1 ml-3`}>
                          <Text style={tw`font-bold text-gray-800`}>{job.jobTitle}</Text>
                          <Text style={tw`text-gray-600 text-sm`}>{job.clientName}</Text>
                          <Text style={tw`text-gray-500 text-xs mt-1`}>📍 {job.location}</Text>
                          
                          {/* Barra de progreso */}
                          <View style={tw`flex-row items-center mt-2`}>
                            <View style={tw`flex-1 bg-gray-200 rounded-full h-2 mr-2`}>
                              <View 
                                style={[tw`bg-blue-500 h-2 rounded-full`, { width: `${job.progress}%` }]} 
                              />
                            </View>
                            <Text style={tw`text-blue-600 text-sm font-bold`}>{job.progress}%</Text>
                          </View>
                          
                          <Text style={tw`text-blue-600 text-xs mt-1`}>
                            Termina: {job.estimatedCompletion}
                          </Text>
                        </View>
                        <View style={tw`items-end justify-between`}>
                          <Text style={tw`text-black font-bold`}>{job.budget}</Text>
                          <View style={tw`bg-blue-500 px-2 py-1 rounded-full`}>
                            <Text style={tw`text-white text-xs font-bold`}>{job.status}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Trabajos Completados */}
              {jobHistory.completed.length > 0 && (
                <View style={tw`p-4 border-b border-gray-100`}>
                  <Text style={tw`text-lg font-bold text-green-600 mb-3`}>
                    ✅ Trabajos Completados ({jobHistory.completed.length})
                  </Text>
                  {jobHistory.completed.map((job) => (
                    <View
                      key={job.id}
                      style={tw`bg-green-50 border border-green-200 rounded-xl p-4 mb-3`}
                    >
                      <View style={tw`flex-row`}>
                        <Image
                          source={{ uri: job.clientPhoto }}
                          style={tw`w-12 h-12 rounded-full`}
                          resizeMode="cover"
                        />
                        <View style={tw`flex-1 ml-3`}>
                          <Text style={tw`font-bold text-gray-800`}>{job.jobTitle}</Text>
                          <Text style={tw`text-gray-600 text-sm`}>{job.clientName}</Text>
                          <Text style={tw`text-gray-500 text-xs mt-1`}>📍 {job.location}</Text>
                          
                          {/* Rating y reseña */}
                          <View style={tw`flex-row items-center mt-2`}>
                            <MaterialIcons name="star" size={16} color="#FFBF00" />
                            <Text style={tw`text-yellow-600 font-bold ml-1`}>{job.rating}</Text>
                            <Text style={tw`text-gray-500 text-xs ml-2`}>
                              Completado: {job.completedDate}
                            </Text>
                          </View>
                          
                          {job.clientReview && (
                            <Text style={tw`text-gray-600 text-xs mt-1 italic`}>
                              "{job.clientReview}"
                            </Text>
                          )}
                        </View>
                        <View style={tw`items-end justify-between`}>
                          <Text style={tw`text-green-600 font-bold`}>{job.budget}</Text>
                          <View style={tw`bg-green-500 px-2 py-1 rounded-full`}>
                            <Text style={tw`text-white text-xs font-bold`}>{job.status}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Trabajos Aplicados */}
              {jobHistory.applied.length > 0 && (
                <View style={tw`p-4`}>
                  <Text style={tw`text-lg font-bold text-[${ORANGE_PRIMARY}] mb-3`}>
                    📋 Trabajos Aplicados ({jobHistory.applied.length})
                  </Text>
                  {jobHistory.applied.map((job) => (
                    <View
                      key={job.id}
                      style={tw`bg-white border border-gray-200 rounded-xl p-4 mb-3`}
                    >
                      <View style={tw`flex-row justify-between items-start`}>
                        <View style={tw`flex-1`}>
                          <Text style={tw`font-bold text-gray-800`}>{job.jobTitle}</Text>
                          <Text style={tw`text-gray-600 text-sm`}>{job.clientName}</Text>
                          <Text style={tw`text-gray-500 text-xs mt-1`}>📍 {job.location}</Text>
                          <Text style={tw`text-gray-500 text-xs`}>
                            Aplicado: {job.appliedDate}
                          </Text>
                        </View>
                        <View style={tw`items-end`}>
                          <Text style={tw`text-black font-bold mb-2`}>{job.budget}</Text>
                          <View style={tw`bg-[${ORANGE_PRIMARY}] px-2 py-1 rounded-full`}>
                            <Text style={tw`text-white text-xs font-bold`}>{job.status}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* 🆕 MODAL DE TRABAJO EN PROGRESO */}
      <Modal
        visible={jobProgressVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setJobProgressVisible(false)}
      >
        <SafeAreaView style={tw`flex-1 bg-white`}>
          {selectedProgressJob && (
            <>
              {/* Header */}
              <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-200`}>
                <TouchableOpacity
                  style={tw`p-2`}
                  onPress={() => setJobProgressVisible(false)}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#666" />
                </TouchableOpacity>
                <Text style={tw`text-lg font-bold text-gray-800`}>Trabajo en Progreso</Text>
                <TouchableOpacity
                  style={tw`p-2`}
                  onPress={() => contactClient(selectedProgressJob.clientPhone)}
                >
                  <MaterialIcons name="phone" size={24} color={ORANGE_PRIMARY} />
                </TouchableOpacity>
              </View>

              <ScrollView style={tw`flex-1 p-4`}>
                {/* Info del cliente y trabajo */}
                <View style={tw`bg-white rounded-xl p-4 mb-4 border border-gray-200`}>
                  <View style={tw`flex-row items-center mb-4`}>
                    <Image
                      source={{ uri: selectedProgressJob.clientPhoto }}
                      style={tw`w-16 h-16 rounded-full`}
                      resizeMode="cover"
                    />
                    <View style={tw`flex-1 ml-4`}>
                      <Text style={tw`text-xl font-bold text-gray-800`}>{selectedProgressJob.clientName}</Text>
                      <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium`}>{selectedProgressJob.jobTitle}</Text>
                      <Text style={tw`text-gray-600 text-sm mt-1`}>📍 {selectedProgressJob.location}</Text>
                    </View>
                    <Text style={tw`text-2xl font-bold text-black`}>{selectedProgressJob.budget}</Text>
                  </View>

                  <Text style={tw`text-gray-700 mb-4`}>{selectedProgressJob.description}</Text>

                  {/* Progreso */}
                  <View style={tw`mb-4`}>
                    <View style={tw`flex-row justify-between items-center mb-2`}>
                      <Text style={tw`font-bold text-gray-800`}>Progreso del Trabajo</Text>
                      <Text style={tw`text-blue-600 font-bold`}>{selectedProgressJob.progress}%</Text>
                    </View>
                    <View style={tw`bg-gray-200 rounded-full h-3`}>
                      <View 
                        style={[tw`bg-blue-500 h-3 rounded-full`, { width: `${selectedProgressJob.progress}%` }]} 
                      />
                    </View>
                    <View style={tw`flex-row justify-between mt-2`}>
                      <Text style={tw`text-gray-500 text-sm`}>Inicio: {selectedProgressJob.startDate}</Text>
                      <Text style={tw`text-gray-500 text-sm`}>Estimado: {selectedProgressJob.estimatedCompletion}</Text>
                    </View>
                  </View>

                  {/* Notas actuales */}
                  {selectedProgressJob.notes && (
                    <View style={tw`bg-blue-50 p-3 rounded-lg mb-4`}>
                      <Text style={tw`font-bold text-blue-800 mb-1`}>📝 Notas del Progreso:</Text>
                      <Text style={tw`text-blue-700 text-sm`}>{selectedProgressJob.notes}</Text>
                    </View>
                  )}
                </View>

                {/* Evidencias del trabajo */}
                <View style={tw`bg-white rounded-xl p-4 mb-4 border border-gray-200`}>
                  <Text style={tw`font-bold text-gray-800 mb-3`}>📷 Evidencias del Trabajo</Text>
                  
                  {/* Evidencias existentes */}
                  {selectedProgressJob.evidences && selectedProgressJob.evidences.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
                      {selectedProgressJob.evidences.map((evidence: string, index: number) => (
                        <Image
                          key={index}
                          source={{ uri: evidence }}
                          style={tw`w-24 h-24 rounded-lg mr-3`}
                          resizeMode="cover"
                        />
                      ))}
                    </ScrollView>
                  )}

                  {/* Botón para agregar evidencia */}
                  <TouchableOpacity
                    style={tw`bg-white border-2 border-dashed border-[${ORANGE_PRIMARY}] rounded-lg p-4 items-center mb-4`}
                    onPress={() => {
                      // Simular agregar nueva evidencia
                      const newEvidence = `https://picsum.photos/400/300?random=${Date.now()}`;
                      addEvidence(newEvidence);
                    }}
                  >
                    <MaterialIcons name="add-a-photo" size={32} color={ORANGE_PRIMARY} />
                    <Text style={tw`text-[${ORANGE_PRIMARY}] font-medium mt-2`}>Agregar Foto</Text>
                    <Text style={tw`text-gray-500 text-xs text-center mt-1`}>
                      Documenta el progreso del trabajo
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Actualizar progreso */}
                <View style={tw`bg-white rounded-xl p-4 mb-4 border border-gray-200`}>
                  <Text style={tw`font-bold text-gray-800 mb-3`}>🔄 Actualizar Progreso</Text>
                  
                  <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-gray-700`}
                    placeholder="Agregar nota sobre el progreso..."
                    multiline
                    numberOfLines={3}
                    value={progressNote}
                    onChangeText={setProgressNote}
                  />

                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      style={tw`flex-1 bg-blue-500 py-3 rounded-lg mr-2`}
                      onPress={() => updateJobProgress(selectedProgressJob.id, selectedProgressJob.progress + 10, progressNote)}
                    >
                      <Text style={tw`text-white font-bold text-center`}>Actualizar Progreso</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={tw`flex-1 bg-green-500 py-3 rounded-lg ml-2`}
                      onPress={() => markJobComplete(selectedProgressJob.id)}
                    >
                      <Text style={tw`text-white font-bold text-center`}>Marcar Completo</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Contacto con el cliente */}
                <View style={tw`bg-white rounded-xl p-4 mb-6 border border-gray-200`}>
                  <Text style={tw`font-bold text-gray-800 mb-3`}>📞 Contactar Cliente</Text>
                  
                  <View style={tw`flex-row`}>
                    <TouchableOpacity
                      style={tw`flex-1 bg-green-500 py-3 rounded-lg mr-2 flex-row items-center justify-center`}
                      onPress={() => contactClient(selectedProgressJob.clientPhone)}
                    >
                      <MaterialIcons name="phone" size={20} color="#FFFFFF" />
                      <Text style={tw`text-white font-bold ml-2`}>Llamar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={tw`flex-1 bg-green-600 py-3 rounded-lg ml-2 flex-row items-center justify-center`}
                      onPress={() => contactClient(selectedProgressJob.clientPhone)}
                    >
                      <MaterialIcons name="message" size={20} color="#FFFFFF" />
                      <Text style={tw`text-white font-bold ml-2`}>WhatsApp</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={tw`text-gray-500 text-center text-xs mt-2`}>
                    {selectedProgressJob.clientPhone}
                  </Text>
                </View>
              </ScrollView>
            </>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
