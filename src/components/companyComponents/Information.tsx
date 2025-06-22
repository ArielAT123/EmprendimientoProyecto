import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking} from 'react-native';

const Information = () => {
    return (
        <ScrollView style={styles.container}>

            {/* Sección Empresa */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>¿Qué hace la empresa?</Text>
                <Text style={styles.sectionText}>
                    GitHub permite a desarrolladores y empresas colaborar, innovar y crear de forma segura. Con herramientas basadas en IA, pruebas de seguridad integradas e integración perfecta, ayuda a los equipos desde el primer commit hasta el desarrollo empresarial.
                </Text>
                <Text style={styles.sectionText}>
                    Más del 90% de las empresas de la lista Fortune 100 y más de 150 millones de desarrolladores confían en GitHub para ofrecer soluciones escalables, fiables y seguras a equipos de todos los tamaños.
                </Text>

                <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://support.github.com/request/landing')}>
                    <Text style={styles.linkText}>Contactanos</Text>
                </TouchableOpacity>
            </View>

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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    marginBottom: 12,
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

export default Information;