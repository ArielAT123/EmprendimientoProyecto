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
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendMessageToDialogflow } from '../apis/chatbot';

const { width } = Dimensions.get('window');

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
      text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', 
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
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: 'Lo siento, ocurrió un error al procesar tu solicitud.', 
        isUser: false, 
        timestamp: getFormattedTimestamp() 
      }]);
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
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      
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
      
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="white" />
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
                <Text style={styles.headerText}>Asistente Virtual</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
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
              />

              {isTyping && (
                <View style={styles.typingIndicator}>
                  <Text style={styles.typingText}>Asistente está escribiendo...</Text>
                </View>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Escribe tu mensaje..."
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
    backgroundColor: '#3b82f6',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
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
    borderRadius: 12,
    width: width * 0.9,
    maxHeight: '80%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  messagesList: {
    flexGrow: 1,
    marginBottom: 8,
  },
  messagesContent: {
    paddingBottom: 8,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#111827',
  },
  servicesContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
  },
  servicesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4b5563',
    marginBottom: 4,
  },
  servicesTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  serviceTag: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 12,
    color: '#111827',
  },
  timestamp: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  typingText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
});

export default FloatingChatBot;