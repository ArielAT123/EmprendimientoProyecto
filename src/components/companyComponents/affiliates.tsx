// screens/CompanyScreen.js
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity} from 'react-native';

const Afiliates = () => {

    const afiliados = [
        { nombre: 'Afíliate a Empresa X', url: 'https://empresa-x.com/form' },
        { nombre: 'Formulario de Empresa Y', url: 'https://empresa-y.com/registro' },
    ];

    return (
    <ScrollView style={styles.container}>

      {/* Sección Afiliados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Afíliate</Text>
        {afiliados.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.linkButton}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={styles.linkText}>{item.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  linkButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});


export default Afiliates;