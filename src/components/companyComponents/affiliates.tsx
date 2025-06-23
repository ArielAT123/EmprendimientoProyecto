import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Image} from 'react-native';

const Afiliates = () => {

    const afiliados = [
        { nombre: 'Programador Senior /n Hola', url: 'https://empresa-x.com/form' },
        { nombre: 'Programador Junior', url: 'https://empresa-y.com/registro' },
    ];

    return (
    <ScrollView style={styles.container}>

      {/* Sección Afiliados */}
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Quierés ser parte de nosotros?</Text>
            <Text style={styles.sectionText}>
              Aqui encontraras las vacantes de empleos disponibles para que puedas unirte a nuestro equipo. Si estás interesado en unirte a nosotros, por favor completa el formulario de afiliación correspondiente.
            </Text>

            <Text>
              Empleos publicados recientemente
            </Text>
        {afiliados.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.linkButton}
            onPress={() => Linking.openURL(item.url)}
          >
            <Image
              source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
              style={styles.avatar}
            />
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
    sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ddd',

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
    backgroundColor: '#eee',
    padding: 12,
    marginTop: 15,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    
  },
  linkText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
    avatar: {
    width: 35, height: 35, borderRadius: 35,
  },
});


export default Afiliates;