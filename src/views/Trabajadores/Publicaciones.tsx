import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Image, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Orange Color Palette
const ORANGE_PRIMARY = '#FF6B35';
const ORANGE_SECONDARY = '#FF8C42';
const ORANGE_ACCENT = '#FFB347';
const ORANGE_LIGHTER = '#FFD4B3';
const ORANGE_DARK = '#FF4500';
const ORANGE_DARKER = '#E55100';

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
    
    // Hover states for better interactions
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [hoveredTag, setHoveredTag] = useState<string | null>(null);

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

    const getButtonStyle = (buttonId: string, baseStyle: string, hoverStyle: string) => {
        return `${baseStyle} ${hoveredButton === buttonId ? hoverStyle : ''}`;
    };

    const getTagStyle = (tagId: string) => {
        return hoveredTag === tagId 
            ? `rounded-full px-3 py-1 mr-2 mb-2 shadow-md transform scale-105`
            : `rounded-full px-3 py-1 mr-2 mb-2`;
    };

    return (
        <View style={tw`flex-1 bg-gray-50`}>
            {/* Header with Orange Gradient */}
            <View style={[tw`px-5 py-4 rounded-b-lg shadow-lg py-5 mt-10`, { backgroundColor: ORANGE_PRIMARY }]}>
                <Text style={tw`text-2xl font-bold text-white`}>Mis Publicaciones</Text>
                <Text style={[tw`mt-1`, { color: ORANGE_LIGHTER }]}>Administra tus trabajos de electricidad</Text>
            </View>

            {/* Search Bar with Orange Accent */}
            <View style={tw`px-5 py-4 bg-white shadow-sm`}>
                <View style={tw`relative`}>
                    <TextInput
                        placeholder="Buscar por etiqueta, título o descripción..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={[tw`pl-4 pr-10 py-3 border-2 rounded-lg text-gray-900 bg-white`, 
                               { borderColor: searchQuery ? ORANGE_ACCENT : '#E5E7EB' }]}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={tw`absolute right-3 top-3`}
                            onPress={() => setSearchQuery('')}
                            onPressIn={() => setHoveredButton('clear-search')}
                            onPressOut={() => setHoveredButton(null)}
                        >
                            <Text style={[tw`text-lg`, 
                                        { color: hoveredButton === 'clear-search' ? ORANGE_PRIMARY : '#9CA3AF' }]}>×</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={tw`pb-6 py-4`}>
                {isLoading ? (
                    <View style={tw`mt-6 px-5`}>
                        {[1, 2, 3].map((_, i) => (
                            <View key={i} style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm`}>
                                <View style={tw`flex-row`}>
                                    <View style={[tw`w-16 h-16 rounded-lg mr-4`, { backgroundColor: ORANGE_LIGHTER }]} />
                                    <View style={tw`flex-1`}>
                                        <View style={[tw`h-5 rounded mb-2 w-3/4`, { backgroundColor: ORANGE_LIGHTER }]} />
                                        <View style={tw`h-4 bg-gray-200 rounded mb-1 w-1/2`} />
                                        <View style={tw`h-4 bg-gray-200 rounded w-2/3`} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : filteredPosts.length === 0 ? (
                    <View style={tw`mx-5 mt-6 bg-white p-6 rounded-lg items-center shadow-sm`}>
                        <Text style={tw`text-gray-500 text-center`}>
                            No se encontraron resultados para "{searchQuery}"
                        </Text>
                        <TouchableOpacity
                            onPress={() => setSearchQuery('')}
                            onPressIn={() => setHoveredButton('clear-all')}
                            onPressOut={() => setHoveredButton(null)}
                            style={[tw`mt-3 px-4 py-2 rounded-lg shadow-sm`, 
                                   { backgroundColor: hoveredButton === 'clear-all' ? ORANGE_ACCENT : ORANGE_LIGHTER }]}
                        >
                            <Text style={[tw`font-medium`, { color: ORANGE_DARKER }]}>Limpiar búsqueda</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={tw`px-5`}>
                        {filteredPosts.map((post, index) => (
                            <View
                                key={index}
                                style={[tw`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4`, 
                                       { borderLeftColor: ORANGE_PRIMARY }]}
                            >
                                <View style={tw`mb-3`}>
                                    <Text style={tw`font-semibold text-gray-900 text-lg`}>{post.title}</Text>
                                    <Text style={[tw`text-xs`, { color: ORANGE_SECONDARY }]}>ID: {post.postId}</Text>
                                </View>

                                {post.isImage ? (
                                    <Image
                                        source={{ uri: post.postContent }}
                                        style={tw`w-full h-48 rounded-lg mb-3 shadow-sm`}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={[tw`p-4 rounded-lg mb-3`, { backgroundColor: ORANGE_LIGHTER }]}>
                                        <Text style={tw`text-gray-700`}>{post.postContent}</Text>
                                    </View>
                                )}

                                <Text style={tw`text-gray-600 mb-3 leading-5`}>{post.description}</Text>

                                {/* Tags with Orange Theme */}
                                <View style={tw`flex-row flex-wrap mb-4`}>
                                    {post.tags.map((tag, tagIndex) => (
                                        <TouchableOpacity
                                            key={tagIndex}
                                            style={[tw`${getTagStyle(`${index}-${tagIndex}`)}`, 
                                                   { backgroundColor: hoveredTag === `${index}-${tagIndex}` ? ORANGE_ACCENT : ORANGE_LIGHTER }]}
                                            onPress={() => setSearchQuery(tag)}
                                            onPressIn={() => setHoveredTag(`${index}-${tagIndex}`)}
                                            onPressOut={() => setHoveredTag(null)}
                                        >
                                            <Text style={[tw`text-xs font-medium`, { color: ORANGE_DARKER }]}>{tag}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    style={[tw`py-3 rounded-lg items-center justify-center shadow-sm`, 
                                           { backgroundColor: hoveredButton === `details-${index}` ? ORANGE_SECONDARY : ORANGE_PRIMARY }]}
                                    onPress={() => {
                                        setSelectedPost(post);
                                        setDetailsModalVisible(true);
                                    }}
                                    onPressIn={() => setHoveredButton(`details-${index}`)}
                                    onPressOut={() => setHoveredButton(null)}
                                >
                                    <Text style={tw`text-white font-semibold`}>Ver Detalles</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* FAB for Adding Post with Orange Theme */}
            <TouchableOpacity
                style={[tw`absolute bottom-5 right-5 rounded-full p-4 shadow-lg`, 
                       { backgroundColor: hoveredButton === 'fab' ? ORANGE_SECONDARY : ORANGE_PRIMARY }]}
                onPress={() => setAddModalVisible(true)}
                onPressIn={() => setHoveredButton('fab')}
                onPressOut={() => setHoveredButton(null)}
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>

            {/* Add Post Modal with Orange Theme */}
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
                        <View style={[tw`rounded-t-lg p-5`, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]}>
                            <Text style={[tw`text-xl font-bold mb-4`, { color: ORANGE_DARKER }]}>Nueva Publicación</Text>
                            
                            <TextInput
                                placeholder="Título (ej. Instalación de Iluminación)"
                                placeholderTextColor="#9CA3AF"
                                value={newPost.title}
                                onChangeText={(text) => setNewPost({ ...newPost, title: text })}
                                style={[tw`pl-4 pr-4 py-3 border-2 rounded-lg mb-3 text-gray-900 bg-white`, 
                                       { borderColor: ORANGE_LIGHTER }]}
                            />
                            
                            <TextInput
                                placeholder="Descripción"
                                placeholderTextColor="#9CA3AF"
                                value={newPost.description}
                                onChangeText={(text) => setNewPost({ ...newPost, description: text })}
                                style={[tw`pl-4 pr-4 py-3 border-2 rounded-lg mb-3 text-gray-900 bg-white h-24`, 
                                       { borderColor: ORANGE_LIGHTER }]}
                                multiline
                            />
                            
                            <TextInput
                                placeholder="Etiquetas (separadas por comas, ej. Electricidad, Reparación)"
                                placeholderTextColor="#9CA3AF"
                                value={newPost.tags}
                                onChangeText={(text) => setNewPost({ ...newPost, tags: text })}
                                style={[tw`pl-4 pr-4 py-3 border-2 rounded-lg mb-3 text-gray-900 bg-white`, 
                                       { borderColor: ORANGE_LIGHTER }]}
                            />
                            
                            <TextInput
                                placeholder="URL de imagen (opcional)"
                                placeholderTextColor="#9CA3AF"
                                value={newPost.imageUrl}
                                onChangeText={(text) => setNewPost({ ...newPost, imageUrl: text })}
                                style={[tw`pl-4 pr-4 py-3 border-2 rounded-lg mb-3 text-gray-900 bg-white`, 
                                       { borderColor: ORANGE_LIGHTER }]}
                            />
                            
                            <View style={tw`flex-row justify-around mt-4`}>
                                <TouchableOpacity
                                    style={[tw`py-3 px-6 rounded-lg shadow-sm`, 
                                           { backgroundColor: hoveredButton === 'cancel' ? '#F3F4F6' : 'white' }]}
                                    onPress={() => setAddModalVisible(false)}
                                    onPressIn={() => setHoveredButton('cancel')}
                                    onPressOut={() => setHoveredButton(null)}
                                >
                                    <Text style={[tw`font-medium`, { color: ORANGE_PRIMARY }]}>Cancelar</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[tw`py-3 px-6 rounded-lg shadow-sm`, 
                                           { backgroundColor: hoveredButton === 'publish' ? ORANGE_SECONDARY : ORANGE_PRIMARY }]}
                                    onPress={addNewPost}
                                    onPressIn={() => setHoveredButton('publish')}
                                    onPressOut={() => setHoveredButton(null)}
                                >
                                    <Text style={tw`text-white font-semibold`}>Publicar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>

            {/* Post Details Modal with Orange Theme */}
            <Modal
                visible={detailsModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setDetailsModalVisible(false)}
            >
                <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
                    <View style={tw`bg-white rounded-t-lg p-5 max-h-3/4`}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {selectedPost && (
                                <>
                                    <View style={[tw`border-l-4 pl-4 mb-4`, { borderLeftColor: ORANGE_PRIMARY }]}>
                                        <Text style={tw`text-xl font-bold text-gray-900`}>{selectedPost.title}</Text>
                                        <Text style={[tw`text-xs mt-1`, { color: ORANGE_SECONDARY }]}>ID: {selectedPost.postId}</Text>
                                    </View>
                                    
                                    {selectedPost.isImage ? (
                                        <Image
                                            source={{ uri: selectedPost.postContent }}
                                            style={tw`w-full h-48 rounded-lg mb-3 shadow-sm`}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <View style={[tw`p-4 rounded-lg mb-3`, { backgroundColor: ORANGE_LIGHTER }]}>
                                            <Text style={tw`text-gray-700`}>{selectedPost.postContent}</Text>
                                        </View>
                                    )}
                                    
                                    <Text style={tw`text-gray-600 mb-3 leading-5`}>{selectedPost.description}</Text>
                                    
                                    <View style={tw`flex-row flex-wrap mb-4`}>
                                        {selectedPost.tags.map((tag, tagIndex) => (
                                            <TouchableOpacity
                                                key={tagIndex}
                                                style={[tw`${getTagStyle(`modal-${tagIndex}`)}`, 
                                                       { backgroundColor: hoveredTag === `modal-${tagIndex}` ? ORANGE_ACCENT : ORANGE_LIGHTER }]}
                                                onPress={() => {
                                                    setSearchQuery(tag);
                                                    setDetailsModalVisible(false);
                                                }}
                                                onPressIn={() => setHoveredTag(`modal-${tagIndex}`)}
                                                onPressOut={() => setHoveredTag(null)}
                                            >
                                                <Text style={[tw`text-xs font-medium`, { color: ORANGE_DARKER }]}>{tag}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    
                                    <Text style={[tw`text-lg font-semibold mb-3`, { color: ORANGE_DARKER }]}>
                                        Solicitudes de Contacto
                                    </Text>
                                    
                                    {selectedPost.contactRequests.length === 0 ? (
                                        <View style={[tw`p-4 rounded-lg`, { backgroundColor: ORANGE_LIGHTER }]}>
                                            <Text style={tw`text-gray-500 text-center`}>No hay solicitudes de contacto.</Text>
                                        </View>
                                    ) : (
                                        selectedPost.contactRequests.map((request, index) => (
                                            <View
                                                key={index}
                                                style={tw`flex-row items-center justify-between bg-gray-50 rounded-lg p-3 mb-2 shadow-sm`}
                                            >
                                                <View>
                                                    <Text style={tw`text-gray-900 font-medium`}>{request.clientName}</Text>
                                                    <Text style={[tw`text-xs`, { color: ORANGE_SECONDARY }]}>ID: {request.clientId}</Text>
                                                </View>
                                                {request.status === 'pending' ? (
                                                    <TouchableOpacity
                                                        style={[tw`py-2 px-4 rounded-lg shadow-sm`, 
                                                               { backgroundColor: hoveredButton === `accept-${index}` ? ORANGE_SECONDARY : ORANGE_PRIMARY }]}
                                                        onPress={() => acceptContactRequest(selectedPost.postId, request.clientId)}
                                                        onPressIn={() => setHoveredButton(`accept-${index}`)}
                                                        onPressOut={() => setHoveredButton(null)}
                                                    >
                                                        <Text style={tw`text-white text-sm font-medium`}>Aceptar</Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <View style={[tw`py-2 px-4 rounded-lg`, { backgroundColor: '#10B981' }]}>
                                                        <Text style={tw`text-white text-sm font-medium`}>Aceptado ✓</Text>
                                                    </View>
                                                )}
                                            </View>
                                        ))
                                    )}
                                </>
                            )}
                            
                            <TouchableOpacity
                                style={[tw`mt-4 py-3 rounded-lg items-center shadow-sm`, 
                                       { backgroundColor: hoveredButton === 'close-modal' ? '#F3F4F6' : '#E5E7EB' }]}
                                onPress={() => setDetailsModalVisible(false)}
                                onPressIn={() => setHoveredButton('close-modal')}
                                onPressOut={() => setHoveredButton(null)}
                            >
                                <Text style={tw`text-gray-700 font-medium`}>Cerrar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}