import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Afiliates = () => {
  const afiliados = [
    {
      nombre: 'SMB Senior Account Executive',
      empresa: 'GitHub',
      ubicacion: 'India (En remoto)',
      fecha: 'hace 5 días',
      url: 'https://empresa-x.com/form',
    },
    {
      nombre: 'Senior Enterprise Account Executive II',
      empresa: 'GitHub',
      ubicacion: 'San Francisco, CA (En remoto)',
      fecha: 'hace 1 semana',
      url: 'https://empresa-y.com/registro',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Título y descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Quierés ser parte de nosotros?</Text>
        <Text style={styles.sectionText}>
          Aquí encontrarás las vacantes de empleo disponibles para que puedas unirte a nuestro equipo.
          Si estás interesado, completa el formulario correspondiente.
        </Text>
        <Text style={styles.subTitle}>Empleos publicados recientemente</Text>
      </View>

      {/* Lista de afiliados */}
      {afiliados.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => Linking.openURL(item.url)}
        >
          <Image
            source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.jobTitle}>{item.nombre}</Text>
            <Text style={styles.company}>{item.empresa}</Text>
            <Text style={styles.location}>{item.ubicacion}</Text>
            <Text style={styles.date}>{item.fecha}</Text>
          </View>
          <Entypo name="dots-three-vertical" size={18} color="#999" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 16,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 4,
  },
  info: {
    flex: 1,
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  company: {
    color: '#333',
    marginTop: 2,
    fontSize: 13,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default Afiliates;
