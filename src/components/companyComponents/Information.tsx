import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking} from 'react-native';

const Information = () => {
    return (
        <ScrollView style={styles.container}>

            {/* Sección Empresa */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>¿Qué hace la empresa?</Text>
                <Text style={styles.sectionText}>
                    Realizamos arreglos de sistemas electricos hasta de aparatos electricos que tenga el cliente
                </Text>
                <Text style={styles.sectionText}>
                    Nosotros buscamos mejorar la calidad de vida de los Ecuatorianos facilitandoles soluciones a sus problemas electricos al mejor precio
                </Text>
                <Text style={styles.sectionText}>
                    En 2026 buscamos llegar a 200 trabajadores.
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