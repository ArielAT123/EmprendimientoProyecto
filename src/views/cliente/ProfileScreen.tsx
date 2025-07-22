import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ORANGE_PRIMARY, ORANGE_DARK, ORANGE_LIGHTER, ORANGE_ACCENT, ORANGE_DARKER, mockWorkers } from './Datos/datos';

const COLORS = {
  orange: ORANGE_PRIMARY,
  orangeDark: ORANGE_DARK,
  orangeLighter: ORANGE_LIGHTER,
  white: '#FFFFFF',
  gray: '#9E9E9E',
  lightGray: '#F5F5F5',
  darkGray: '#424242',
  red: '#F44336',
  green: '#4CAF50',
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

  const initials = user.name
    .split(' ')
    .map((name: string) => name[0])
    .join('');

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

  // Busca el usuario en mockWorkers por nombre (o id si lo prefieres)
  const userWorker = mockWorkers.find(w => w.name === user.name);

  // Usa la URL fija para la foto de perfil
  const profileImage = 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }} showsVerticalScrollIndicator={false}>
      {/* Header estilo ClienteHomeScreen */}
      <View
        style={{
          padding: 16,
          backgroundColor: COLORS.white,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: ORANGE_PRIMARY,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#111', fontSize: 24, fontWeight: 'bold' }}>
              Mi Perfil
            </Text>
            <Text style={{ color: '#111', fontSize: 14, opacity: 0.9 }}>
              📍 {user.location}
            </Text>
          </View>
          {/* Elimina TouchableOpacity y muestra solo la imagen */}
          <Image
            source={{ uri: profileImage }}
            style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 8 }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Profile Card */}
      <View style={{
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 24,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          {/* Elimina TouchableOpacity y muestra solo la imagen */}
          <Image
            source={{ uri: profileImage }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginRight: 16,
              borderWidth: 2,
              borderColor: ORANGE_PRIMARY,
            }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: ORANGE_DARK, marginBottom: 4 }}>{user.name}</Text>
            <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 2 }}>{user.email}</Text>
            <Text style={{ fontSize: 12, color: COLORS.gray }}>{user.location}</Text>
          </View>
          <TouchableOpacity style={{ padding: 8 }}>
            <Icon name="edit" size={20} color={ORANGE_PRIMARY} />
          </TouchableOpacity>
        </View>

        {/* User Stats */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: ORANGE_PRIMARY, marginBottom: 4 }}>12</Text>
            <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: 'center' }}>Trabajos Publicados</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: ORANGE_PRIMARY, marginBottom: 4 }}>8</Text>
            <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: 'center' }}>Completados</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: ORANGE_PRIMARY, marginBottom: 4 }}>4.9</Text>
            <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: 'center' }}>Calificación</Text>
          </View>
        </View>

        {/* Verification Status */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 16,
          marginTop: 16,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightGray,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="warning" size={16} color={ORANGE_PRIMARY} />
            <Text style={{ fontSize: 14, color: ORANGE_DARK, marginLeft: 8 }}>Identidad no verificada</Text>
          </View>
          <TouchableOpacity onPress={() => handleMenuPress({ icon: 'verified-user', label: 'Verificación de Identidad' })}>
            <Text style={{ fontSize: 14, color: ORANGE_PRIMARY, fontWeight: '500' }}>Verificar ahora</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 12,
              marginBottom: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
            onPress={() => handleMenuPress(item)}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 16,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={item.icon} size={24} color={ORANGE_PRIMARY} />
                <Text style={{ fontSize: 16, color: ORANGE_DARKER, marginLeft: 12, fontWeight: '500' }}>{item.label}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={COLORS.gray} />
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 12,
            marginTop: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
          onPress={handleLogout}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="logout" size={24} color={COLORS.red} />
              <Text style={{ fontSize: 16, color: COLORS.red, marginLeft: 12, fontWeight: '500' }}>
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

export default ProfileScreen;