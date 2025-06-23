import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClienteJobsScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const mockJobs = [
    {
      id: 1,
      title: 'Reparación de Aire Acondicionado',
      description: 'Necesito reparar el aire acondicionado de mi oficina',
      budget: 25,
      status: 'in_progress',
      proposalsCount: 0,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      worker: {
        name: 'Miguel Pérez',
        profession: 'Técnico de A/C',
      },
    },
    {
      id: 2,
      title: 'Instalación de Lavadora',
      description: 'Compré una lavadora nueva y necesito instalación',
      budget: 15,
      status: 'waiting',
      proposalsCount: 3,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      worker: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return '#1976D2'; // Azul fuerte
      case 'waiting': return '#FFC107';     // Amarillo
      case 'completed': return '#43A047';   // Verde
      default: return '#757575';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress': return 'En Progreso';
      case 'waiting': return 'Esperando';
      case 'completed': return 'Completado';
      default: return status;
    }
  };

  const renderJobCard = ({ item }: { item: any }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.jobDescription}>{item.description}</Text>
      
      <View style={styles.jobMeta}>
        <Text style={styles.jobDate}>
          Publicado hace {Math.floor((Date.now() - item.createdAt.getTime()) / (1000 * 60 * 60 * 24))} días
        </Text>
        <Text style={styles.jobBudget}>${item.budget}</Text>
      </View>

      <View style={styles.jobFooter}>
        {item.worker ? (
          <View style={styles.workerInfo}>
            <View style={styles.workerAvatar}>
              <Text style={styles.workerInitials}>
                {item.worker.name.split(' ').map((n: string) => n[0]).join('')}
              </Text>
            </View>
            <Text style={styles.workerName}>{item.worker.name}</Text>
          </View>
        ) : (
          <Text style={styles.proposalsText}>
            {item.proposalsCount} propuestas recibidas
          </Text>
        )}
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            if (!item.worker && item.proposalsCount > 0) {
              navigation.navigate('JobProposals', { jobId: item.id, jobTitle: item.title });
            }
          }}>
          <Text style={styles.actionButtonText}>
            {item.worker ? 'Ver Detalles' : 'Ver Propuestas'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const activeJobs = mockJobs.filter(job => job.status !== 'completed');
  const completedJobs = mockJobs.filter(job => job.status === 'completed');

  return (
    <SafeAreaView style={styles.container}>
      {/* Espacio arriba del header */}
      <View style={{ height: 24 }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Trabajos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateJob')}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}>
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Activos ({activeJobs.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}>
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completados ({completedJobs.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'active' ? activeJobs : completedJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2196F3', // Cambiado de naranja a azul
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    margin: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  activeTabText: {
    color: '#2196F3',
  },
  jobsList: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  jobDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  jobMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  jobDate: {
    fontSize: 12,
    color: '#757575',
  },
  jobBudget: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  workerAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#2196F3',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  workerInitials: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  workerName: {
    fontSize: 14,
    color: '#000000',
  },
  proposalsText: {
    fontSize: 14,
    color: '#757575',
    flex: 1,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3', // Cambiado de naranja a azul
  },
});

export default ClienteJobsScreen;