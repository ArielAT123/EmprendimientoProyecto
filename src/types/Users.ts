export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string; // Optional field
    address?: string; // Optional field

}
export type TrabajadorIndependiente ={
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string; // Optional field
    address?: string; // Optional field
    profession: string; // Specific to independent workers
    experienceYears: number; // Years of experience in their profession
    listaTrabajosRealizados?: TrabajoRealizado[]; // Optional field for completed works
    calificacionPromedio?: number; // Optional field for average rating
}
export type TrabajoRealizado = {
    id: string;
    imagen: string; // URL or path to the image
    descripcion: string; // Description of the work done
    fecha: string; // Date of the work done
    calificacion: number; // Rating given by the client
    trabajadorId: string; // ID of the independent worker who did the work
    }