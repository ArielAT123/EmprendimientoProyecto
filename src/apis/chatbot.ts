type DialogflowResponse = {
  fulfillmentText: string;
  servicios?: string[];
};

export const sendMessageToDialogflow = async (message: string): Promise<DialogflowResponse> => {
  try {
    const response = await fetch('http://172.20.132.76:3000/api/dialogflow/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }

    const data: DialogflowResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error al comunicarse con Dialogflow:', error);
    return {
      fulfillmentText: 'Lo siento, estoy teniendo problemas para conectarme. Por favor intenta nuevamente más tarde.'
    };
  }
};