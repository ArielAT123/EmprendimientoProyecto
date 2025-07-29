type DeepSeekResponse = {
  fulfillmentText: string;
  servicios?: string[];
};
export const sendMessageToDialogflow = async (message: string): Promise<DeepSeekResponse> => {
  try {
    const response = await fetch('https://empredimientobackend.onrender.com/api/deepseek/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message }), // Asegúrate de enviar "text"
    },);
    console.log('Response from Deepseek:', response);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data: DeepSeekResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error al comunicarse con Deepseek:', error);
    return {
      fulfillmentText: 'Lo siento, estoy teniendo problemas para conectarme. Por favor intenta nuevamente más tarde.'
    };
  }
};