import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

const Publications = () => {
  const publicaciones = [
    {
      id: '1',
      autor: 'Empresa',
      titulo: '¡Lanzamos un nuevo servicio!',
      imagen: 'https://linube.com/blog/wp-content/uploads/github-copilot.jpg',
      likes: 273,
      comentarios: 20,
      compartido: 22,
    },
    {
      id: '2',
      autor: 'Empresa',
      titulo: 'Nos asociamos con la Joya',
      imagen:
        'https://repository-images.githubusercontent.com/481402797/0501c7cb-74eb-4c0d-bc6f-4634bd0bf709',
      likes: 365,
      comentarios: 23,
      compartido: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => Alert.alert('Nuevo comentario', 'Funcionalidad aún no implementada')}
      >
        <Text style={styles.commentButtonText}>Agregar nuevo comentario</Text>
      </TouchableOpacity>

      {publicaciones.map((post) => (
        <View key={post.id} style={styles.card}>
          {/* Encabezado */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10057/10057811.png' }}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={styles.authorName}>{post.autor}</Text>
              <Text style={styles.followers}>4.976.844 seguidores</Text>
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>+ Seguir</Text>
            </TouchableOpacity>
          </View>

          {/* Imagen */}
          <Image source={{ uri: post.imagen }} style={styles.img} />

          {/* Título */}
          <Text style={styles.cardTitle}>{post.titulo}</Text>

          {/* Estadísticas */}
          <View style={styles.statsRow}>
            <Text style={styles.statText}>❤️ {post.likes}</Text>
            <Text style={styles.statText}>• {post.comentarios} comentarios</Text>
            <Text style={styles.statText}>• {post.compartido} veces compartido</Text>
          </View>

          {/* Íconos sociales */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="thumbs-up" size={18} color="#555" />
              <Text style={styles.actionText}>Me gusta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={18} color="#555" />
              <Text style={styles.actionText}>Comentar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Entypo name="share" size={18} color="#555" />
              <Text style={styles.actionText}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  commentButton: {
    backgroundColor: '#0A66C2',
    padding: 10,
    marginTop: 15 ,
    borderRadius: 8,
    marginBottom: 25,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  followers: {
    fontSize: 12,
    color: '#666',
  },
  followBtn: {
    backgroundColor: '#0A66C2',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  img: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  statText: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 5,
  },
});

export default Publications;
