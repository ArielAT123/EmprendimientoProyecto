// screens/CompanyScreen.js
import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Information from '../../components/companyComponents/Information';
import Publications from '../../components/companyComponents/publications';
import Affiliates from '../../components/companyComponents/affiliates';

const CompanyScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selected, setSelected] = useState<'empresa' | 'publicaciones' | 'afiliados'>('empresa');

  const renderComponent = () => {
    switch (selected) {
      case 'empresa':
        return <Information />;
      case 'publicaciones':
        return <Publications />;
      case 'afiliados':
        return <Affiliates />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con imagen y nombre de empresa */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://pngimg.com/uploads/github/github_PNG40.png' }}
          style={styles.logo}
        />
        <Text style={styles.companyName}>GITHUB</Text>
      </View>

      {/* Botones horizontales */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selected === 'empresa' && styles.buttonActive]}
          onPress={() => setSelected('empresa')}
        >
          <Text style={[styles.buttonText, selected === 'empresa' && styles.buttonTextActive]}>Empresa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selected === 'publicaciones' && styles.buttonActive]}
          onPress={() => setSelected('publicaciones')}
        >
          <Text style={[styles.buttonText, selected === 'publicaciones' && styles.buttonTextActive]}>Publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selected === 'afiliados' && styles.buttonActive]}
          onPress={() => setSelected('afiliados')}
        >
          <Text style={[styles.buttonText, selected === 'afiliados' && styles.buttonTextActive]}>Afiliados</Text>
        </TouchableOpacity>
      </View>

      {/* Render dinámico del contenido */}
      <View style={styles.content}>
        {renderComponent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  // Header con logo y nombre
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // opcional, si es un logo circular
    marginBottom: 8,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  buttonActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderRadius: 20,
  },
  buttonText: {
    color: '#333',
    fontWeight: '600',
  },
  buttonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  content: {
    flex: 1,
  },
});

export default CompanyScreen;