export class Auth{
    static tableName = 'usuarios';
    static async login(supabase,usuario,clave) {
        try{
            const{data, error}= supabase
            .from(this.tableName)  

        }catch(error){

        }
    }
    static async register(supabase,nombreUsuario,clave) {
        try{
            const{data, error}= supabase
            .from(this.tableName)  
            .insert({
                usuario: usuario,
                clave: clave
            })            .select();    
        }catch(error){
            console.error('Error al registrar el usuario:', error);
            throw error; // Propagate the error for further handling
        }
    }
}