import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendMessageToDialogflow } from '../apis/chatbot';

const { width } = Dimensions.get('window');
const pastelOrangeDark = '#FF8C42'; // Naranja pastel más oscuro
const jibbyOrange = '#f87224ff'; // Color principal de Jibby
const jibbyLightOrange = '#f6953bff'; // Color secundario de Jibby

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  servicios?: string[];
};

const getFormattedTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface FloatingChatBotProps {
  chatBotServices: {
    services: string[];
    updateServices: (newServices: string[]) => void;
  };
}

const FloatingChatBot: React.FC<FloatingChatBotProps> = ({ chatBotServices }) => {
  const { updateServices } = chatBotServices;
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: '¡Hola! Soy Jibby, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: getFormattedTimestamp()
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: getFormattedTimestamp()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await sendMessageToDialogflow(message);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.fulfillmentText,
        isUser: false,
        timestamp: getFormattedTimestamp(),
        servicios: response.servicios
      };

      setMessages(prev => [...prev, botMessage]);

      if (response.servicios && response.servicios.length > 0) {
        updateServices(response.servicios);
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageWrapper,
      item.isUser ? styles.userMessageWrapper : styles.botMessageWrapper
    ]}>
      {!item.isUser && (
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/jibby.png')}
            style={styles.jibbyAvatar}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.botMessage
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser ? styles.userMessageText : styles.botMessageText
        ]}>
          {item.text}
        </Text>

        {item.servicios && item.servicios.length > 0 && (
          <View style={styles.servicesContainer}>
            <Text style={styles.servicesTitle}>Servicios recomendados:</Text>
            <View style={styles.servicesTagsContainer}>
              {item.servicios.map((servicio, index) => (
                <View key={index} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{servicio}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={[
          styles.timestamp,
          item.isUser ? styles.userTimestamp : styles.botTimestamp
        ]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require('../../assets/jibby.png')}
          style={styles.fabImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.chatContainer}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Image
                    source={require('../../assets/jibby.png')}
                    style={styles.headerAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Jibby</Text>
                    <Text style={styles.headerSubtext}>Tu asistente virtual</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>

              <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
              />

              {isTyping && (
                <View style={styles.typingWrapper}>
                  <View style={styles.typingAvatarContainer}>
                    <Image
                      source={require('../../assets/jibby.png')}
                      style={styles.typingAvatar}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.typingIndicator}>
                    <Text style={styles.typingText}>Jibby está escribiendo...</Text>
                  </View>
                </View>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Escribe tu mensaje a Jibby..."
                  placeholderTextColor="#9ca3af"
                  value={message}
                  onChangeText={setMessage}
                  style={styles.input}
                  multiline
                  onSubmitEditing={handleSend}
                />
                <TouchableOpacity
                  style={[styles.sendButton, !message.trim() && styles.disabledButton]}
                  onPress={handleSend}
                  disabled={!message.trim()}
                >
                  <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: jibbyOrange,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: '#fff',
  },
  fabImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: width * 0.9,
    maxHeight: '85%',
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: jibbyOrange,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: jibbyOrange,
  },
  headerSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  closeButton: {
  position: 'absolute',
  right: 5,
  top: 5,
  },
  messagesList: {
    flexGrow: 1,
    marginBottom: 12,
  },
  messagesContent: {
    paddingBottom: 8,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
    marginBottom: 4,
  },
  jibbyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: jibbyOrange,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: jibbyOrange,
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  botMessageText: {
    color: '#111827',
  },
  servicesContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    paddingTop: 8,
  },
  servicesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: jibbyOrange,
    marginBottom: 6,
  },
  servicesTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  serviceTag: {
    backgroundColor: jibbyLightOrange,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: jibbyOrange,
  },
  serviceText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.8)',
  },
  botTimestamp: {
    color: '#6b7280',
  },
  typingWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  typingAvatarContainer: {
    marginRight: 8,
    marginBottom: 4,
  },
  typingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: jibbyOrange,
  },
  typingIndicator: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  typingText: {
    fontSize: 12,
    color: jibbyOrange,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 25,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#111827',
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: jibbyOrange,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
});
export default FloatingChatBot;