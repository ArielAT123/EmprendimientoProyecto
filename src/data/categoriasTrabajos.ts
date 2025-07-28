export interface WorkCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  tags: string[];
}

export const workCategories: WorkCategory[] = [
  {
    id: 'electricista',
    name: 'Electricista',
    icon: 'flash',
    color: '#F59E0B',
    tags: ['Electricista', 'Instalación', 'Ventiladores', 'Luces', 'Enchufes']
  },
  {
    id: 'plomeria',
    name: 'Plomería',
    icon: 'build',
    color: '#3B82F6',
    tags: ['Plomería', 'Filtración', 'Reparación', 'Tuberías', 'Grifos']
  },
  {
    id: 'construccion',
    name: 'Construcción',
    icon: 'home-repair-service',
    color: '#8B5CF6',
    tags: ['Construcción', 'Techo', 'Pisos', 'Impermeabilización', 'Albañilería']
  },
  {
    id: 'carpinteria',
    name: 'Carpintería',
    icon: 'carpenter',
    color: '#F97316',
    tags: ['Carpintería', 'Muebles', 'Closet', 'Puertas', 'Madera']
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    icon: 'cleaning-services',
    color: '#10B981',
    tags: ['Limpieza', 'Profunda', 'Desinfección', 'Tanque', 'Ventanas']
  },
  {
    id: 'jardineria',
    name: 'Jardinería',
    icon: 'grass',
    color: '#22C55E',
    tags: ['Jardinería', 'Poda', 'Mantenimiento', 'Césped', 'Plantas']
  },
  {
    id: 'tecnico',
    name: 'Técnico',
    icon: 'engineering',
    color: '#6366F1',
    tags: ['Técnico', 'Reparación', 'Electrodomésticos', 'Computadora', 'Motor']
  },
  {
    id: 'seguridad',
    name: 'Seguridad',
    icon: 'security',
    color: '#EF4444',
    tags: ['Seguridad', 'Alarma', 'Cámaras', 'Instalación', 'Portón']
  },
  {
    id: 'pintura',
    name: 'Pintura',
    icon: 'format-paint',
    color: '#EC4899',
    tags: ['Pintura', 'Exterior', 'Interior', 'Preparación', 'Acabados']
  }
];

export const urgencyLevels = [
  { value: 'Baja', label: 'Baja', color: '#22C55E' },
  { value: 'Media', label: 'Media', color: '#EAB308' },
  { value: 'Alta', label: 'Alta', color: '#F97316' },
  { value: 'Urgente', label: 'Urgente', color: '#EF4444' },
];

export const workTypes = [
  { value: 'Presencial', label: 'Presencial', icon: 'location-on' },
  { value: 'Remoto', label: 'Remoto', icon: 'laptop' },
  { value: 'Híbrido', label: 'Híbrido', icon: 'hybrid' },
];

export const getCategoryByTag = (tag: string): WorkCategory | undefined => {
  return workCategories.find(category => 
    category.tags.some(categoryTag => 
      categoryTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

export const getPostsByCategory = (categoryId: string) => {
  const category = workCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  // Esta función sería usada en combinación con el mock de posts
  return category.tags;
};
