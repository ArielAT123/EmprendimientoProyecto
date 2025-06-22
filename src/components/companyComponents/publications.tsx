import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking} from 'react-native';


const Publications = () => {

    const publicaciones = [
    { id: '1', autor: 'GitHub', titulo: '¡Lanzamos un nuevo servicio!', imagen:'https://linube.com/blog/wp-content/uploads/github-copilot.jpg' },
    { id: '2', autor: 'GitHub', titulo: 'Charlas internas sobre React Native', imagen:'https://repository-images.githubusercontent.com/481402797/0501c7cb-74eb-4c0d-bc6f-4634bd0bf709' },
    ];
    return (
        <ScrollView style={styles.container}>

            {/* Sección Publicaciones */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publicaciones recientes</Text>
            {publicaciones.map((post) => (
                <TouchableOpacity key={post.id} style={styles.card} onPress={() => Linking.openURL('https://github.com')}>
                <Image
                source={{ uri: post.imagen }}
                style={styles.img}
                />
                <Text style={styles.cardTitle}>{post.titulo}</Text>
                <Text style={styles.cardAuthor}>Por {post.autor}</Text>
                </TouchableOpacity>
            ))}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    img: {
    width: 300,
    height: 150,
    marginBottom: 8,
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
    card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    },
    cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    },
    cardAuthor: {
    fontSize: 12,
    color: '#666',
    },
});

export default Publications;