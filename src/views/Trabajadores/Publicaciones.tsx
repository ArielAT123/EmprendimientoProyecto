import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Image, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ContactRequest = {
    clientId: string;
    clientName: string;
    status: 'pending' | 'accepted';
};

type WorkerPost = {
    postId: string;
    title: string;
    postContent: string;
    isImage: boolean;
    description: string;
    tags: string[];
    contactRequests: ContactRequest[];
};

const fetchWorkerPosts = async (): Promise<WorkerPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
        {
            postId: 'POST-001',
            title: 'Instalación de Iluminación',
            postContent: 'https://marketplace.canva.com/EAGa5ws4r-E/1/0/1131w/canva-documento-anuncio-para-ofrecer-servicios-de-plomer%C3%ADa-y-electricidad-en-casa-e-instalaciones-promoci%C3%B3n-azul-khWe0uQ-ikY.jpg',
            isImage: true,
            description: 'Ofrezco instalación profesional de sistemas de iluminación para hogares.',
            tags: ['Electricidad', 'Iluminación', 'Instalación'],
            contactRequests: [
                { clientId: 'CLI-007', clientName: 'Laura Gómez', status: 'pending' },
                { clientId: 'CLI-008', clientName: 'Miguel Torres', status: 'accepted' },
            ],
        },
        {
            postId: 'POST-002',
            title: 'Reparación de Cortocircuitos',
            postContent: 'Servicio de reparación de cortocircuitos y fallos eléctricos.',
            isImage: false,
            description: 'Diagnóstico y reparación de problemas eléctricos en oficinas y hogares.',
            tags: ['Electricidad', 'Reparación', 'Diagnóstico'],
            contactRequests: [{ clientId: 'CLI-009', clientName: 'Ana Ruiz', status: 'pending' }],
        },
        {
            postId: 'POST-003',
            title: 'Mantenimiento Eléctrico',
            postContent: 'https://marketplace.canva.com/EAF_zqQcVoI/1/0/900w/canva-historia-de-instagram-t%C3%A9cnico-para-el-hogar-simple-gris-y-amarillo-SZ_J0B12OMk.jpg',
            isImage: true,
            description: 'Mantenimiento preventivo para instalaciones eléctricas en edificios.',
            tags: ['Electricidad', 'Mantenimiento', 'Edificio'],
            contactRequests: [],
        },
    ];
};

export default function MyPostsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [workerPosts, setWorkerPosts] = useState<WorkerPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<WorkerPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState<WorkerPost | null>(null);
    const [newPost, setNewPost] = useState({ title: '', description: '', tags: '', imageUrl: '' });

    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await fetchWorkerPosts();
                setWorkerPosts(posts);
                setFilteredPosts(posts);
            } catch (error) {
                console.error('Error fetching worker posts:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPosts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPosts(workerPosts);
        } else {
            const filtered = workerPosts.filter((post) =>
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    }, [searchQuery, workerPosts]);

    const addNewPost = () => {
        if (!newPost.title || !newPost.description) return;
        const newWorkerPost: WorkerPost = {
            postId: `POST-${Date.now()}`,
            title: newPost.title,
            postContent: newPost.imageUrl || 'Sin imagen',
            isImage: !!newPost.imageUrl,
            description: newPost.description,
            tags: newPost.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
            contactRequests: [],
        };
        setWorkerPosts([newWorkerPost, ...workerPosts]);
        setFilteredPosts([newWorkerPost, ...filteredPosts]);
        setNewPost({ title: '', description: '', tags: '', imageUrl: '' });
        setAddModalVisible(false);
    };

    const acceptContactRequest = (postId: string, clientId: string) => {
        setWorkerPosts((prev) =>
            prev.map((post) =>
                post.postId === postId
                    ? {
                        ...post,
                        contactRequests: post.contactRequests.map((req) =>
                            req.clientId === clientId ? { ...req, status: 'accepted' } : req
                        ),
                    }
                    : post
            )
        );
        setFilteredPosts((prev) =>
            prev.map((post) =>
                post.postId === postId
                    ? {
                        ...post,
                        contactRequests: post.contactRequests.map((req) =>
                            req.clientId === clientId ? { ...req, status: 'accepted' } : req
                        ),
                    }
                    : post
            )
        );
        if (selectedPost?.postId === postId) {
            setSelectedPost((prev) =>
                prev
                    ? {
                        ...prev,
                        contactRequests: prev.contactRequests.map((req) =>
                            req.clientId === clientId ? { ...req, status: 'accepted' } : req
                        ),
                    }
                    : null
            );
        }
    };

    return (
        <View style={tw`flex-1 bg-gray-50`}>
            {/* Header */}
            <View style={tw`bg-white px-5 py-4 rounded-b-lg shadow-sm py-5 mt-10`}>
                <Text style={tw`text-2xl font-bold text-gray-900`}>Mis Publicaciones</Text>
                <Text style={tw`text-gray-500 mt-1`}>Administra tus trabajos de electricidad</Text>
            </View>

            {/* Search Bar */}
            <View style={tw`px-5 py-4 bg-white`}>
                <View style={tw`relative`}>
                    <TextInput
                        placeholder="Buscar por etiqueta, título o descripción..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={tw`pl-4 pr-10 py-3 border border-gray-200 rounded-lg text-gray-900 bg-white`}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={tw`absolute right-3 top-3`}
                            onPress={() => setSearchQuery('')}
                        >
                            <Text style={tw`text-gray-400 text-lg`}>×</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={tw`pb-6 py-4`}>
                {isLoading ? (
                    <View style={tw`mt-6 px-5`}>
                        {[1, 2, 3].map((_, i) => (
                            <View key={i} style={tw`bg-white rounded-lg p-4 mb-4`}>
                                <View style={tw`flex-row`}>
                                    <View style={tw`w-16 h-16 bg-gray-200 rounded-lg mr-4`} />
                                    <View style={tw`flex-1`}>
                                        <View style={tw`h-5 bg-gray-200 rounded mb-2 w-3/4`} />
                                        <View style={tw`h-4 bg-gray-200 rounded mb-1 w-1/2`} />
                                        <View style={tw`h-4 bg-gray-200 rounded w-2/3`} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : filteredPosts.length === 0 ? (
                    <View style={tw`mx-5 mt-6 bg-white p-6 rounded-lg items-center`}>
                        <Text style={tw`text-gray-500 text-center`}>
                            No se encontraron resultados para "{searchQuery}"
                        </Text>
                        <TouchableOpacity
                            onPress={() => setSearchQuery('')}
                            style={tw`mt-3 px-4 py-2 bg-blue-50 rounded-lg`}
                        >
                            <Text style={tw`text-blue-600`}>Limpiar búsqueda</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={tw`px-5`}>
                        {filteredPosts.map((post, index) => (
                            <View
                                key={index}
                                style={tw`bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100`}
                            >
                                <View style={tw`mb-3`}>
                                    <Text style={tw`font-semibold text-gray-900`}>{post.title}</Text>
                                    <Text style={tw`text-xs text-gray-500`}>ID: {post.postId}</Text>
                                </View>

                                {post.isImage ? (
                                    <Image
                                        source={{ uri: post.postContent }}
                                        style={tw`w-full h-48 rounded-lg mb-3`}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Text style={tw`text-gray-700 mb-3`}>{post.postContent}</Text>
                                )}

                                <Text style={tw`text-gray-600 mb-3`}>{post.description}</Text>

                                {/* Tags */}
                                <View style={tw`flex-row flex-wrap mb-4`}>
                                    {post.tags.map((tag, tagIndex) => (
                                        <TouchableOpacity
                                            key={tagIndex}
                                            style={tw`bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2`}
                                            onPress={() => setSearchQuery(tag)}
                                        >
                                            <Text style={tw`text-gray-700 text-xs`}>{tag}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={tw`py-2 bg-blue-600 rounded-lg items-center justify-center`}
                                    onPress={() => {
                                        setSelectedPost(post);
                                        setDetailsModalVisible(true);
                                    }}
                                >
                                    <Text style={tw`text-white font-medium`}>Ver Detalles</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* FAB for Adding Post */}
            <TouchableOpacity
                style={tw`absolute bottom-5 right-5 bg-blue-600 rounded-full p-4 shadow-lg`}
                onPress={() => setAddModalVisible(true)}
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>

            {/* Add Post Modal */}
            <Modal
                visible={addModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
                    <ImageBackground
                        source={require('../../../assets/fondopublicaciones.jpg')}
                        style={tw`rounded-t-lg p-5`}
                    >

                        <Text style={tw`text-xl font-bold text-gray-900 mb-4`}>Nueva Publicación</Text>
                        <TextInput
                            placeholder="Título (ej. Instalación de Iluminación)"
                            placeholderTextColor="#9CA3AF"
                            value={newPost.title}
                            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
                            style={tw`pl-4 pr-4 py-3 border border-gray-200 rounded-lg mb-3 text-gray-900 bg-white`}
                        />
                        <TextInput
                            placeholder="Descripción"
                            placeholderTextColor="#9CA3AF"
                            value={newPost.description}
                            onChangeText={(text) => setNewPost({ ...newPost, description: text })}
                            style={tw`pl-4 pr-4 py-3 border border-gray-200 rounded-lg mb-3 text-gray-900 bg-white h-24`}
                            multiline
                        />
                        <TextInput
                            placeholder="Etiquetas (separadas por comas, ej. Electricidad, Reparación)"
                            placeholderTextColor="#9CA3AF"
                            value={newPost.tags}
                            onChangeText={(text) => setNewPost({ ...newPost, tags: text })}
                            style={tw`pl-4 pr-4 py-3 border border-gray-200 rounded-lg mb-3 text-gray-900 bg-white`}
                        />
                        <TextInput
                            placeholder="URL de imagen (opcional)"
                            placeholderTextColor="#9CA3AF"
                            value={newPost.imageUrl}
                            onChangeText={(text) => setNewPost({ ...newPost, imageUrl: text })}
                            style={tw`pl-4 pr-4 py-3 border border-gray-200 rounded-lg mb-3 text-gray-900 bg-white`}
                        />
                        <View style={tw`flex-row justify-around mt-4`}>
                            <TouchableOpacity
                                style={tw`py-2 px-4 bg-white rounded-lg`}
                                onPress={() => setAddModalVisible(false)}
                            >
                                <Text style={tw`text-blue-700`}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tw`py-2 px-4 bg-orange-400 rounded-lg`}
                                onPress={addNewPost}
                            >
                                <Text style={tw`text-white`}>Publicar</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                </View>
            </Modal>

            {/* Post Details Modal */}
            <Modal
                visible={detailsModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setDetailsModalVisible(false)}
            >
                <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
                    <View style={tw`bg-white rounded-t-lg p-5 max-h-3/4`}>
                        <ScrollView>
                            {selectedPost && (
                                <>
                                    <Text style={tw`text-xl font-bold text-gray-900 mb-2`}>{selectedPost.title}</Text>
                                    <Text style={tw`text-xs text-gray-500 mb-3`}>ID: {selectedPost.postId}</Text>
                                    {selectedPost.isImage ? (
                                        <Image
                                            source={{ uri: selectedPost.postContent }}
                                            style={tw`w-full h-48 rounded-lg mb-3`}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <Text style={tw`text-gray-700 mb-3`}>{selectedPost.postContent}</Text>
                                    )}
                                    <Text style={tw`text-gray-600 mb-3`}>{selectedPost.description}</Text>
                                    <View style={tw`flex-row flex-wrap mb-4`}>
                                        {selectedPost.tags.map((tag, tagIndex) => (
                                            <TouchableOpacity
                                                key={tagIndex}
                                                style={tw`bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2`}
                                                onPress={() => {
                                                    setSearchQuery(tag);
                                                    setDetailsModalVisible(false);
                                                }}
                                            >
                                                <Text style={tw`text-gray-700 text-xs`}>{tag}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <Text style={tw`text-lg font-semibold text-gray-900 mb-2`}>Solicitudes de Contacto</Text>
                                    {selectedPost.contactRequests.length === 0 ? (
                                        <Text style={tw`text-gray-500 text-center`}>No hay solicitudes de contacto.</Text>
                                    ) : (
                                        selectedPost.contactRequests.map((request, index) => (
                                            <View
                                                key={index}
                                                style={tw`flex-row items-center justify-between bg-gray-50 rounded-lg p-3 mb-2`}
                                            >
                                                <View>
                                                    <Text style={tw`text-gray-900`}>{request.clientName}</Text>
                                                    <Text style={tw`text-xs text-gray-500`}>ID: {request.clientId}</Text>
                                                </View>
                                                {request.status === 'pending' ? (
                                                    <TouchableOpacity
                                                        style={tw`py-1 px-3 bg-blue-600 rounded-lg`}
                                                        onPress={() => acceptContactRequest(selectedPost.postId, request.clientId)}
                                                    >
                                                        <Text style={tw`text-white text-sm`}>Aceptar</Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <Text style={tw`text-green-600 text-sm`}>Aceptado</Text>
                                                )}
                                            </View>
                                        ))
                                    )}
                                </>
                            )}
                            <TouchableOpacity
                                style={tw`mt-4 py-2 bg-gray-200 rounded-lg items-center`}
                                onPress={() => setDetailsModalVisible(false)}
                            >
                                <Text style={tw`text-gray-700`}>Cerrar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}