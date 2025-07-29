// screens/CompanyScreen.js
import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Linking, TextInput, Alert} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const pastelOrange = '#FFB074';
const pastelOrangeDark = '#FF8C42';
const pastelOrangeLight = '#ffe5cf17';

const CompanyScreen = () => {
  const [selected, setSelected] = useState<'inicio' | 'acerca' | 'postulaciones' | 'proyectos'>('inicio');
  const navigation = useNavigation();

  // Postulaciones creadas por la empresa
  const jobPostings = [
    {
      id: 1,
      title: 'Maestro de Obras - Construcción Residencial',
      location: 'Guayaquil, Ecuador',
      salary: '$800 - $1200',
      type: 'Tiempo completo',
      experience: '3+ años',
      created: 'Hace 2 días',
      applicants: 24,
      active: true,
      urgent: true
    },
    {
      id: 2,
      title: 'Supervisor de Construcción',
      location: 'Quito, Ecuador',
      salary: '$1000 - $1500',
      type: 'Tiempo completo',
      experience: '5+ años',
      created: 'Hace 1 semana',
      applicants: 18,
      active: true,
      urgent: false
    },
    {
      id: 3,
      title: 'Maestro Electricista',
      location: 'Cuenca, Ecuador',
      salary: '$700 - $1000',
      type: 'Tiempo completo',
      experience: '2+ años',
      created: 'Hace 3 días',
      applicants: 31,
      active: true,
      urgent: true
    }
  ];

  // Candidatos que han aplicado (los premium aparecen primero)
  const applicants = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      title: 'Maestro de Obras Senior',
      experience: '8 años',
      location: 'Guayaquil',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isPremium: true,
      appliedFor: 'Maestro de Obras - Construcción Residencial',
      appliedDate: 'Hace 1 día'
    },
    {
      id: 2,
      name: 'María González',
      title: 'Supervisora de Construcción',
      experience: '6 años',
      location: 'Quito',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6d6edc8?w=100&h=100&fit=crop&crop=face',
      isPremium: true,
      appliedFor: 'Supervisor de Construcción',
      appliedDate: 'Hace 2 días'
    },
    {
      id: 3,
      name: 'Luis Herrera',
      title: 'Electricista Certificado',
      experience: '4 años',
      location: 'Cuenca',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isPremium: false,
      appliedFor: 'Maestro Electricista',
      appliedDate: 'Hace 3 días'
    },
    {
      id: 4,
      name: 'Ana Morales',
      title: 'Ingeniera Civil',
      experience: '5 años',
      location: 'Guayaquil',
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isPremium: false,
      appliedFor: 'Supervisor de Construcción',
      appliedDate: 'Hace 4 días'
    }
  ];

  const projects = [
    {
      name: 'Residencial Los Álamos',
      status: 'En construcción',
      progress: '75%',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    },
    {
      name: 'Centro Comercial Plaza Norte',
      status: 'Completado',
      progress: '100%',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    },
    {
      name: 'Conjunto Habitacional Vista Mar',
      status: 'En planificación',
      progress: '25%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'
    }
  ];

  const handleCreateJobPosting = () => {
    Alert.alert(
      'Crear Nueva Postulación',
      '¿Deseas crear una nueva postulación de trabajo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Crear', onPress: () => Alert.alert('¡Postulación creada!', 'Tu oferta laboral está ahora activa.') }
      ]
    );
  };

  const handleViewApplicants = (jobTitle, applicantCount) => {
    Alert.alert(
      'Ver Candidatos',
      `${applicantCount} personas han aplicado para ${jobTitle}`,
      [
        { text: 'Cerrar', style: 'cancel' },
        { text: 'Ver Candidatos', onPress: () => setSelected('postulaciones') }
      ]
    );
  };

  const handleContactApplicant = (applicantName) => {
    Alert.alert(
      'Contactar Candidato',
      `¿Deseas contactar a ${applicantName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar Mensaje', onPress: () => Alert.alert('Mensaje enviado', `Se ha enviado un mensaje a ${applicantName}`) }
      ]
    );
  };

  const renderJobPostingCard = (posting) => (
    <View key={posting.id} style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{posting.title}</Text>
          {posting.urgent && <View style={styles.urgentBadge}><Text style={styles.urgentText}>URGENTE</Text></View>}
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: posting.active ? '#28a745' : '#dc3545' }]} />
          <Text style={styles.statusText}>{posting.active ? 'Activa' : 'Inactiva'}</Text>
        </View>
      </View>
      
      <View style={styles.jobInfo}>
        <View style={styles.jobDetail}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.jobDetailText}>{posting.location}</Text>
        </View>
        <View style={styles.jobDetail}>
          <FontAwesome5 name="money-bill-wave" size={14} color="#666" />
          <Text style={styles.jobDetailText}>{posting.salary}</Text>
        </View>
        <View style={styles.jobDetail}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.jobDetailText}>{posting.type}</Text>
        </View>
      </View>
      
      <View style={styles.jobFooter}>
        <Text style={styles.experienceText}>Experiencia: {posting.experience}</Text>
        <Text style={styles.postedText}>{posting.created}</Text>
      </View>
      
      <View style={styles.applicantInfo}>
        <View style={styles.applicantCount}>
          <Ionicons name="people" size={16} color={pastelOrangeDark} />
          <Text style={styles.applicantCountText}>{posting.applicants} candidatos</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewApplicantsBtn}
          onPress={() => handleViewApplicants(posting.title, posting.applicants)}
        >
          <Text style={styles.viewApplicantsBtnText}>Ver Candidatos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderApplicantCard = (applicant) => (
    <View key={applicant.id} style={[styles.applicantCard, applicant.isPremium && styles.premiumApplicantCard]}>
      {applicant.isPremium && (
        <View style={styles.premiumBadge}>
          <MaterialIcons name="verified" size={20} color="#FFD700" />
          <Text style={styles.premiumText}>PREMIUM</Text>
        </View>
      )}
      
      <View style={styles.applicantHeader}>
        <Image source={{ uri: applicant.avatar }} style={styles.applicantAvatar} />
        <View style={styles.applicantInfo}>
          <View style={styles.applicantNameRow}>
            <Text style={styles.applicantName}>{applicant.name}</Text>
            {applicant.isPremium && <MaterialIcons name="verified" size={16} color={pastelOrangeDark} />}
          </View>
          <Text style={styles.applicantTitle}>{applicant.title}</Text>
          <View style={styles.applicantDetails}>
            <View style={styles.applicantDetail}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.applicantDetailText}>{applicant.location}</Text>
            </View>
            <View style={styles.applicantDetail}>
              <Ionicons name="briefcase-outline" size={14} color="#666" />
              <Text style={styles.applicantDetailText}>{applicant.experience}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{applicant.rating}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.appliedForText}>Aplicó para: {applicant.appliedFor}</Text>
      <Text style={styles.appliedDateText}>{applicant.appliedDate}</Text>
      
      <View style={styles.applicantActions}>
        <TouchableOpacity 
          style={styles.contactBtn}
          onPress={() => handleContactApplicant(applicant.name)}
        >
          <Ionicons name="mail-outline" size={16} color="white" />
          <Text style={styles.contactBtnText}>Contactar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewProfileBtn}>
          <Text style={styles.viewProfileBtnText}>Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProjectCard = (project, index) => (
    <View key={index} style={styles.projectCard}>
      <Image source={{ uri: project.image }} style={styles.projectImage} />
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{project.name}</Text>
        <Text style={styles.projectStatus}>{project.status}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: project.progress }]} />
          </View>
          <Text style={styles.progressText}>{project.progress}</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (selected) {
      case 'inicio':
        return (
          <View style={styles.tabContent}>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <FontAwesome5 name="briefcase" size={24} color={pastelOrangeDark} />
                <Text style={styles.statNumber}>{jobPostings.length}</Text>
                <Text style={styles.statLabel}>Postulaciones Activas</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="people" size={24} color={pastelOrangeDark} />
                <Text style={styles.statNumber}>{applicants.length}</Text>
                <Text style={styles.statLabel}>Candidatos</Text>
              </View>
              <View style={styles.statCard}>
                <MaterialIcons name="verified" size={24} color={pastelOrangeDark} />
                <Text style={styles.statNumber}>{applicants.filter(a => a.isPremium).length}</Text>
                <Text style={styles.statLabel}>Premium</Text>
              </View>
            </View>
            
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.createJobBtn}
                onPress={handleCreateJobPosting}
              >
                <Ionicons name="add-circle" size={20} color="white" />
                <Text style={styles.createJobBtnText}>Crear Nueva Postulación</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.sectionTitle}>Postulaciones Recientes</Text>
            {jobPostings.slice(0, 2).map(renderJobPostingCard)}
            
            <TouchableOpacity 
              style={styles.seeAllBtn}
              onPress={() => setSelected('postulaciones')}
            >
              <Text style={styles.seeAllText}>Ver todas las postulaciones</Text>
            </TouchableOpacity>
            
            <Text style={styles.sectionTitle}>Candidatos Premium Recientes</Text>
            {applicants.filter(a => a.isPremium).slice(0, 2).map(renderApplicantCard)}
          </View>
        );
        
      case 'acerca':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.aboutTitle}>Sobre Constructora Horizonte</Text>
            <Text style={styles.aboutText}>
              Somos una empresa ecuatoriana con más de 12 años de experiencia en el sector de la construcción. 
              Nos especializamos en proyectos residenciales, comerciales e industriales, siempre comprometidos 
              con la calidad, seguridad y transparencia en cada obra.
            </Text>
            
            <View style={styles.valuesContainer}>
              <Text style={styles.valuesTitle}>Nuestros Valores</Text>
              <View style={styles.valueItem}>
                <Ionicons name="shield-checkmark" size={20} color={pastelOrangeDark} />
                <Text style={styles.valueText}>Transparencia en todos nuestros procesos</Text>
              </View>
              <View style={styles.valueItem}>
                <Ionicons name="people" size={20} color={pastelOrangeDark} />
                <Text style={styles.valueText}>Respeto y valoración de nuestro equipo</Text>
              </View>
              <View style={styles.valueItem}>
                <Ionicons name="star" size={20} color={pastelOrangeDark} />
                <Text style={styles.valueText}>Excelencia en cada proyecto</Text>
              </View>
              <View style={styles.valueItem}>
                <Ionicons name="leaf" size={20} color={pastelOrangeDark} />
                <Text style={styles.valueText}>Construcción sustentable</Text>
              </View>
            </View>
            
            <View style={styles.contactContainer}>
              <Text style={styles.contactTitle}>Información de Contacto</Text>
              <View style={styles.contactItem}>
                <Ionicons name="location" size={16} color={pastelOrangeDark} />
                <Text style={styles.contactText}>Av. 9 de Octubre 123, Guayaquil</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="call" size={16} color={pastelOrangeDark} />
                <Text style={styles.contactText}>+593 4 123-4567</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={16} color={pastelOrangeDark} />
                <Text style={styles.contactText}>info@constructorahorizonte.ec</Text>
              </View>
            </View>
          </View>
        );
        
      case 'postulaciones':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Gestión de Postulaciones</Text>
              <TouchableOpacity 
                style={styles.createJobBtnSmall}
                onPress={handleCreateJobPosting}
              >
                <Ionicons name="add" size={16} color="white" />
                <Text style={styles.createJobBtnSmallText}>Nueva</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.sectionSubtitle}>
              Administra tus ofertas laborales y revisa candidatos
            </Text>
            
            {jobPostings.map(renderJobPostingCard)}
            
            <Text style={styles.sectionTitle}>Todos los Candidatos</Text>
            <Text style={styles.premiumNote}>
              💡 Los candidatos Premium aparecen primero y tienen verificación completa
            </Text>
            {applicants
              .sort((a, b) => b.isPremium - a.isPremium) // Premium primero
              .map(renderApplicantCard)}
          </View>
        );
        
      case 'proyectos':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Nuestros Proyectos</Text>
            <Text style={styles.sectionSubtitle}>
              Conoce los proyectos que estamos desarrollando
            </Text>
            {projects.map(renderProjectCard)}
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Panel de Empresa</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Header de la empresa */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1541976590-713941681591?w=800&h=300&fit=crop' }}
          style={styles.cover}
        />
        <View style={styles.companyLogoContainer}>
          <View style={styles.companyLogo}>
            <FontAwesome5 name="building" size={30} color={pastelOrangeDark} />
          </View>
        </View>
      </View>

      {/* Información de la empresa */}
      <View style={styles.content}>
        <View style={styles.companyHeader}>
          <View style={styles.companyTitleRow}>
            <Text style={styles.companyName}>Constructora Horizonte</Text>
            <MaterialIcons name="verified" size={24} color={pastelOrangeDark} />
          </View>
          <Text style={styles.companySlogan}>
            "Construyendo el futuro del Ecuador con transparencia y calidad"
          </Text>
          <Text style={styles.companyType}>Empresa de Construcción • Fundada en 2012</Text>
          <Text style={styles.companyLocation}>📍 Guayaquil, Ecuador</Text>
        </View>

        {/* Botones de acción de empresa */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.websiteButton}
            onPress={() => Linking.openURL('https://constructorahorizonte.ec')}
          >
            <Ionicons name="globe-outline" size={20} color={pastelOrangeDark} />
            <Text style={styles.websiteButtonText}>Sitio Web</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={20} color={pastelOrangeDark} />
            <Text style={styles.shareButtonText}>Compartir</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs de navegación */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[styles.tab, selected === 'inicio' && styles.activeTab]}
              onPress={() => setSelected('inicio')}
            >
              <Text style={[styles.tabText, selected === 'inicio' && styles.activeTabText]}>
                Inicio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selected === 'acerca' && styles.activeTab]}
              onPress={() => setSelected('acerca')}
            >
              <Text style={[styles.tabText, selected === 'acerca' && styles.activeTabText]}>
                Acerca de
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selected === 'postulaciones' && styles.activeTab]}
              onPress={() => setSelected('postulaciones')}
            >
              <Text style={[styles.tabText, selected === 'postulaciones' && styles.activeTabText]}>
                Postulaciones
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selected === 'proyectos' && styles.activeTab]}
              onPress={() => setSelected('proyectos')}
            >
              <Text style={[styles.tabText, selected === 'proyectos' && styles.activeTabText]}>
                Proyectos
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Contenido de las tabs */}
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  cover: {
    width: '100%',
    height: 180,
  },
  companyLogoContainer: {
    position: 'absolute',
    bottom: -30,
    left: 20,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  companyHeader: {
    marginBottom: 20,
  },
  companyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  companySlogan: {
    fontSize: 16,
    color: pastelOrangeDark,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  companyType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  companyLocation: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: pastelOrangeDark,
    gap: 8,
  },
  websiteButtonText: {
    color: pastelOrangeDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: pastelOrangeDark,
    gap: 8,
  },
  shareButtonText: {
    color: pastelOrangeDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: pastelOrangeDark,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: pastelOrangeDark,
    fontWeight: 'bold',
  },
  tabContent: {
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    backgroundColor: pastelOrangeLight,
    borderRadius: 15,
    paddingVertical: 20,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: pastelOrangeDark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  actionSection: {
    marginBottom: 30,
  },
  createJobBtn: {
    backgroundColor: pastelOrangeDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  createJobBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  createJobBtnSmall: {
    backgroundColor: pastelOrangeDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  createJobBtnSmallText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  premiumNote: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: pastelOrange,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  urgentBadge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  urgentText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  jobInfo: {
    gap: 8,
    marginBottom: 12,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  jobDetailText: {
    fontSize: 14,
    color: '#666',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  experienceText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  postedText: {
    fontSize: 12,
    color: '#999',
  },
  applicantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicantCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  applicantCountText: {
    fontSize: 14,
    color: pastelOrangeDark,
    fontWeight: '500',
  },
  viewApplicantsBtn: {
    backgroundColor: pastelOrangeDark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewApplicantsBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  applicantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  premiumApplicantCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#fffef7',
  },
  premiumBadge: {
    position: 'absolute',
    top: 12,
    right: 22,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  premiumText: {
    color: '#333',
    fontSize: 10,
    fontWeight: 'bold',
  },
  applicantHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  applicantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  applicantTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  applicantDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 6,
  },
  applicantDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applicantDetailText: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  appliedForText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  appliedDateText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  applicantActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactBtn: {
    backgroundColor: pastelOrangeDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    gap: 6,
    flex: 1,
    justifyContent: 'center',
  },
  contactBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  viewProfileBtn: {
    borderWidth: 1,
    borderColor: pastelOrangeDark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileBtnText: {
    color: pastelOrangeDark,
    fontWeight: 'bold',
    fontSize: 12,
  },
  seeAllBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: pastelOrangeDark,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 30,
  },
  seeAllText: {
    color: pastelOrangeDark,
    fontWeight: 'bold',
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  valuesContainer: {
    marginBottom: 24,
  },
  valuesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  contactContainer: {
    backgroundColor: pastelOrangeLight,
    borderRadius: 12,
    padding: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectImage: {
    width: '100%',
    height: 150,
  },
  projectInfo: {
    padding: 16,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  projectStatus: {
    fontSize: 14,
    color: pastelOrangeDark,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: pastelOrangeDark,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default CompanyScreen;