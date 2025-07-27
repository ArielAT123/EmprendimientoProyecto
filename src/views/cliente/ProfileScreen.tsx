import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
  TextInput,
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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  const [editedUser, setEditedUser] = useState({
    name: 'César Mera',
    email: 'cesar.mera@email.com',
    location: 'Guayaquil, Ecuador',
    phone: '+593 99 123 4567',
  });

  // Usuario fijo: César Mera
  const user = {
    id: 6,
    name: editedUser.name,
    email: editedUser.email,
    location: editedUser.location,
    phone: editedUser.phone,
  };

  const menuItems: MenuItem[] = [
    { icon: 'person', label: 'Información Personal' },
    { icon: 'verified-user', label: 'Verificación de Identidad' },
    { icon: 'help', label: 'Ayuda y Soporte' },
  ];

  const initials = user.name
    .split(' ')
    .map((name: string) => name[0])
    .join('');

  const handleMenuPress = (item: MenuItem) => {
    if (item.label === 'Verificación de Identidad') {
      setVerificationModalVisible(true);
      setVerificationStep(1);
    } else if (item.label === 'Ayuda y Soporte') {
      showSupportChat();
    } else if (item.label === 'Información Personal') {
      setEditModalVisible(true);
    } else {
      Alert.alert('Próximamente', `La función "${item.label}" estará disponible pronto.`);
    }
  };

  const handleEditProfile = () => {
    setEditModalVisible(true);
  };

  const saveProfileChanges = () => {
    setEditModalVisible(false);
    Alert.alert('Éxito', 'Tu información personal ha sido actualizada correctamente.');
  };

  const handleVerificationStep = (step: number) => {
    if (step === 2) {
      Alert.alert(
        'Subir Foto de Cédula',
        'Por favor, toma una foto clara de tu cédula de identidad ecuatoriana. Asegúrate de que todos los datos sean legibles.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Tomar Foto',
            onPress: () => {
              Alert.alert('Foto Capturada', 'Foto de cédula guardada correctamente.');
              setVerificationStep(3);
            },
          },
        ]
      );
    } else if (step === 3) {
      Alert.alert(
        'Subir Selfie con Cédula',
        'Toma una selfie sosteniendo tu cédula junto a tu rostro. Asegúrate de que tanto tu cara como la cédula sean visibles.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Tomar Selfie',
            onPress: () => {
              Alert.alert('Selfie Capturado', 'Selfie con cédula guardado correctamente.');
              setVerificationStep(4);
            },
          },
        ]
      );
    } else if (step === 4) {
      Alert.alert(
        'Verificación Enviada',
        'Hemos recibido tus documentos. El proceso de verificación toma entre 24-48 horas. Te notificaremos cuando esté completo.',
        [
          {
            text: 'Entendido',
            onPress: () => {
              setVerificationModalVisible(false);
              setVerificationStep(1);
            },
          },
        ]
      );
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 4 }}>{user.name}</Text>
            <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 2 }}>{user.email}</Text>
            <Text style={{ fontSize: 12, color: COLORS.gray }}>{user.location}</Text>
          </View>
          <TouchableOpacity style={{ padding: 8 }} onPress={handleEditProfile}>
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
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 }}>12</Text>
            <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: 'center' }}>Trabajos Publicados</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 }}>8</Text>
            <Text style={{ fontSize: 10, color: COLORS.gray, textAlign: 'center' }}>Contratados</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 4 }}>4.9</Text>
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
            <Text style={{ fontSize: 14, color: '#111', marginLeft: 8 }}>Identidad no verificada</Text>
          </View>
          <TouchableOpacity onPress={() => {
            setVerificationModalVisible(true);
            setVerificationStep(1);
          }}>
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
              borderWidth: 1,
              borderColor: ORANGE_LIGHTER,
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
                <Text style={{ fontSize: 16, color: '#111', marginLeft: 12, fontWeight: '500' }}>{item.label}</Text>
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
            borderWidth: 1,
            borderColor: '#ffcccb',
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

      {/* Modal de Edición de Perfil */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setEditModalVisible(false)}
        >
          <TouchableOpacity 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: 16, 
              padding: 24, 
              width: '90%', 
              maxHeight: '80%' 
            }}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 20, textAlign: 'center' }}>
              Editar Información Personal
            </Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>Nombre Completo</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: ORANGE_LIGHTER,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: '#111'
                  }}
                  value={editedUser.name}
                  onChangeText={(text) => setEditedUser({...editedUser, name: text})}
                />
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>Email</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: ORANGE_LIGHTER,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: '#111'
                  }}
                  value={editedUser.email}
                  onChangeText={(text) => setEditedUser({...editedUser, email: text})}
                  keyboardType="email-address"
                />
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>Teléfono</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: ORANGE_LIGHTER,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: '#111'
                  }}
                  value={editedUser.phone}
                  onChangeText={(text) => setEditedUser({...editedUser, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>Ubicación</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: ORANGE_LIGHTER,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    color: '#111'
                  }}
                  value={editedUser.location}
                  onChangeText={(text) => setEditedUser({...editedUser, location: text})}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 8,
                    padding: 12,
                    flex: 1,
                    marginRight: 8,
                  }}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={{ textAlign: 'center', color: COLORS.gray, fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={{
                    backgroundColor: ORANGE_PRIMARY,
                    borderRadius: 8,
                    padding: 12,
                    flex: 1,
                    marginLeft: 8,
                  }}
                  onPress={saveProfileChanges}
                >
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal de Verificación de Identidad */}
      <Modal
        visible={verificationModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setVerificationModalVisible(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setVerificationModalVisible(false)}
        >
          <TouchableOpacity 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: 16, 
              padding: 24, 
              width: '90%', 
              maxHeight: '80%' 
            }}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 20, textAlign: 'center' }}>
              Verificación de Identidad
            </Text>
            
            {verificationStep === 1 && (
              <View>
                <Text style={{ fontSize: 16, color: '#111', marginBottom: 16, textAlign: 'center' }}>
                  Para verificar tu identidad necesitamos:
                </Text>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>✓ Cédula de identidad ecuatoriana</Text>
                  <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>✓ Foto selfie con tu cédula</Text>
                  <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 8 }}>✓ Proceso toma 24-48 horas</Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: ORANGE_PRIMARY,
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 12,
                  }}
                  onPress={() => setVerificationStep(2)}
                >
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    Iniciar Verificación
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {verificationStep === 2 && (
              <View>
                <Icon name="credit-card" size={60} color={ORANGE_PRIMARY} style={{ alignSelf: 'center', marginBottom: 16 }} />
                <Text style={{ fontSize: 16, color: '#111', marginBottom: 16, textAlign: 'center' }}>
                  Paso 1: Foto de tu Cédula
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20, textAlign: 'center' }}>
                  Toma una foto clara de tu cédula de identidad. Asegúrate de que todos los datos sean legibles.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: ORANGE_PRIMARY,
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 12,
                  }}
                  onPress={() => handleVerificationStep(2)}
                >
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    📷 Tomar Foto de Cédula
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {verificationStep === 3 && (
              <View>
                <Icon name="face" size={60} color={ORANGE_PRIMARY} style={{ alignSelf: 'center', marginBottom: 16 }} />
                <Text style={{ fontSize: 16, color: '#111', marginBottom: 16, textAlign: 'center' }}>
                  Paso 2: Selfie con Cédula
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20, textAlign: 'center' }}>
                  Toma una selfie sosteniendo tu cédula junto a tu rostro. Asegúrate de que ambos sean visibles.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: ORANGE_PRIMARY,
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 12,
                  }}
                  onPress={() => handleVerificationStep(3)}
                >
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    🤳 Tomar Selfie
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {verificationStep === 4 && (
              <View>
                <Icon name="check-circle" size={60} color={COLORS.green} style={{ alignSelf: 'center', marginBottom: 16 }} />
                <Text style={{ fontSize: 16, color: '#111', marginBottom: 16, textAlign: 'center' }}>
                  ¡Documentos Enviados!
                </Text>
                <Text style={{ fontSize: 14, color: COLORS.gray, marginBottom: 20, textAlign: 'center' }}>
                  Hemos recibido tus documentos. El proceso de verificación toma entre 24-48 horas. Te notificaremos cuando esté completo.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.green,
                    borderRadius: 8,
                    padding: 16,
                    marginBottom: 12,
                  }}
                  onPress={() => handleVerificationStep(4)}
                >
                  <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                    Entendido
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.lightGray,
                borderRadius: 8,
                padding: 12,
              }}
              onPress={() => setVerificationModalVisible(false)}
            >
              <Text style={{ textAlign: 'center', color: COLORS.gray, fontWeight: 'bold' }}>Cerrar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;