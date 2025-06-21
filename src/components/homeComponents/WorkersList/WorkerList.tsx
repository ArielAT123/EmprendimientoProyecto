import { View, Text } from "react-native";

export const WorkersList = () => {


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Lista de Trabajadores</Text>
            {/* Aquí podrías mapear sobre un array de trabajadores y renderizar cada uno */}
        </View>
    );
}