// screens/CompanyScreen.js
import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Linking, TextInput} from 'react-native';
import Information from '../../components/companyComponents/Information';
import Publications from '../../components/companyComponents/publications';
import Affiliates from '../../components/companyComponents/affiliates';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Summary from '../../components/companyComponents/summary';
import { useNavigation } from '@react-navigation/native'; 

const CompanyScreen = () => {
const [selected, setSelected] = useState<'acerca' | 'publicaciones' | 'afiliados' | 'resumen'>('resumen');
const navigation = useNavigation(); // ← Permite navegar hacia atrás
const [searchText, setSearchText] = useState('');

  const renderComponent = () => {
    switch (selected) {
      case 'resumen':
        return <Summary />;
      case 'acerca':
        return <Information />;
      case 'publicaciones':
        return <Publications />;
      case 'afiliados':
        return <Affiliates />;
    }
  }

  return (
    <ScrollView style={styles.container}>
      
      {/* Barra de navegación */}

      {/* Portada */}
      <View style={styles.header}>
<View style={styles.topBar}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="#000" />
  </TouchableOpacity>
  <TextInput
    style={styles.searchInput}
    placeholder="Buscar..."
    value={searchText}
    onChangeText={setSearchText}
  />
</View>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/R.5f43e12b606cd289921756a4e015fc2c?rik=9Xl90CA4%2bykp3g&pid=ImgRaw&r=0' }}
          style={styles.cover}
        />
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10057/10057811.png' }}
          style={styles.avatar}
        />
      </View>

      {/* Información principal */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name}>Empresa</Text>
          <Ionicons name="checkmark-circle" size={20} color="#0A66C2" style={{ marginLeft: 5 }} />
        </View>
        <Text style={styles.description}>Somos una empresa dedicada a mejorar la vida de los Ecuatorianos</Text>
        <Text style={styles.meta}>Empresa de solcuciones electricas</Text>
        <Text style={styles.meta}>150 trabajadores en la empresa</Text>

        {/* Botones */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followText}>+ Seguir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.siteBtn}
            onPress={() => Linking.openURL('https://github.com')}
          >
            <Text style={styles.siteText}>Ir al sitio web</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={20} />
          </TouchableOpacity>
        </View>

        {/* Tabs simulados */}
        <View style={styles.tabs}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setSelected('resumen')}>
            <Text style={selected === 'resumen' ? styles.activeTab : styles.tab}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected('acerca')}>
            <Text style={selected === 'acerca' ? styles.activeTab : styles.tab}>Acerca de</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected('publicaciones')}>
            <Text style={selected === 'publicaciones' ? styles.activeTab : styles.tab}>Publicaciones</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected('afiliados')}>
            <Text style={selected === 'afiliados' ? styles.activeTab : styles.tab}>Empleos</Text>
          </TouchableOpacity>
          <Text style={styles.tab}>Producto</Text>
          </ScrollView>
        </View>

        {renderComponent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navigatorBar:{ backgroundColor: 'white', width: 'auto', marginTop:40, marginBottom: 20, display: 'flex', alignContent: 'center', alignItems:'center'},
  navigationtext: {fontSize: 20, fontWeight: 'bold'},
  container: { flex: 1, backgroundColor: '#fff' },
  header: { position: 'relative' },
  cover: { width: '100%', height: 150 },
  avatar: {
    width: 70, height: 70, borderRadius: 35,
    position: 'absolute', bottom: -35, left: 20, borderWidth: 3, borderColor: '#fff',
  },
  content: { paddingTop: 50, paddingHorizontal: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold' },
  description: { marginTop: 5, fontSize: 14, color: '#333' },
  meta: { marginTop: 5, fontSize: 12, color: '#666' },
  actions: {
    flexDirection: 'row', marginTop: 15, alignItems: 'center', gap: 10,
    flexWrap: 'wrap'
  },
  followBtn: {
    backgroundColor: '#0A66C2', paddingVertical: 6, paddingHorizontal: 16,
    borderRadius: 5,
  },
  followText: { color: 'white', fontWeight: 'bold' },
  siteBtn: {
    borderWidth: 1, borderColor: '#0A66C2',
    paddingVertical: 6, paddingHorizontal: 16,
    borderRadius: 5,
  },
  siteText: { color: '#0A66C2', fontWeight: 'bold' },
  tabs: {
    flexDirection: 'row', marginTop: 25,
    borderBottomWidth: 1, borderColor: '#ddd',
    paddingBottom: 5, gap: 15
  },
  tab: { color: '#666', marginHorizontal: 12 },
  activeTab: { fontWeight: 'bold', borderBottomWidth: 2, borderColor: '#0A66C2', color: '#0A66C2' },
  sectionTitle: { fontWeight: 'bold', marginTop: 20, fontSize: 16 },
  summary: { marginTop: 8, color: '#444', fontSize: 13 },
  showMore: { marginTop: 10, color: '#0A66C2', fontWeight: '500' },
  topBar: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 10,
  marginTop: 40,
  marginBottom: 10,
  backgroundColor: '#fff',
},
searchInput: {
  flex: 1,
  marginLeft: 10,
  backgroundColor: '#f0f0f0',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 20,
  fontSize: 14,
},


});

export default CompanyScreen;