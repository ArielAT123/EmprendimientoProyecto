import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COLORS = {
  orange: '#FF5722',
  blue: '#2196F3',
  blueLight: '#64B5F6',
  white: '#FFFFFF',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  darkGray: '#424242',
  red: '#F44336',
  green: '#4CAF50',
  yellow: '#FFC107',
};

interface MenuItem {
  icon: string;
  label: string;
}

const ProfileScreen: React.FC = () => {
  // Usuario fijo: César Mera
  const user = {
    id: 6,
    name: 'César Mera',
    email: 'cesar.mera@email.com',
    location: 'Guayaquil, Ecuador',
  };

  const menuItems: MenuItem[] = [
    { icon: 'person', label: 'Información Personal' },
    { icon: 'verified-user', label: 'Verificación de Identidad' },
    { icon: 'notifications', label: 'Notificaciones' },
    { icon: 'help', label: 'Ayuda y Soporte' },
  ];

  const handleMenuPress = (item: MenuItem) => {
    if (item.label === 'Verificación de Identidad') {
      showVerificationModal();
    } else if (item.label === 'Ayuda y Soporte') {
      showSupportChat();
    } else {
      Alert.alert('Próximamente', `La función "${item.label}" estará disponible pronto.`);
    }
  };

  const showVerificationModal = () => {
    Alert.alert(
      'Verificación de Identidad',
      'Para verificar tu identidad necesitamos:\n\n• Cédula de identidad ecuatoriana\n• Foto selfie con tu cédula\n\n¿Deseas continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () => {
            Alert.alert('Próximamente', 'La función de verificación estará disponible pronto.');
          },
        },
      ]
    );
  };

  const showSupportChat = () => {
    Alert.alert(
      'Chat de Soporte',
      '¡Hola! Soy María del equipo de soporte de JOBBY 👋\n\n¿En qué puedo ayudarte hoy?\n\n• Problemas con trabajadores\n• Dudas sobre pagos\n• Reportar un problema\n• Otra consulta',
      [
        { text: 'Cerrar', style: 'cancel' },
        {
          text: 'Escribir mensaje',
          onPress: () => {
            Alert.alert('Chat Iniciado', 'María está escribiendo... Te responderá en unos momentos.');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sesión Cerrada', 'Has cerrado sesión exitosamente.');
          },
        },
      ]
    );
  };

  const initials = user.name
    .split(' ')
    .map((name: string) => name[0])
    .join('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userLocation}>{user.location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={20} color={COLORS.blue} />
          </TouchableOpacity>
        </View>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trabajos Publicados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Calificación</Text>
          </View>
        </View>

        {/* Verification Status */}
        <View style={styles.verificationStatus}>
          <View style={styles.verificationItem}>
            <Icon name="warning" size={16} color={COLORS.orange} />
            <Text style={styles.verificationText}>Identidad no verificada</Text>
          </View>
          <TouchableOpacity onPress={showVerificationModal}>
            <Text style={styles.verifyButton}>Verificar ahora</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}>
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color={COLORS.blue} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.gray} />
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <View style={styles.menuItemContent}>
            <View style={styles.menuItemLeft}>
              <Icon name="logout" size={24} color={COLORS.red} />
              <Text style={[styles.menuItemText, styles.logoutText]}>
                Cerrar Sesión
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.orange,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 12,
    color: COLORS.gray,
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.blue,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.gray,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginLeft: 12,
    fontWeight: '500',
  },
  logoutText: {
    color: COLORS.red,
  },
  errorText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 16,
    marginTop: 50,
  },
  verificationStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  verifyButton: {
    fontSize: 14,
    color: COLORS.blue,
    fontWeight: '500',
  },
});

export default ProfileScreen;