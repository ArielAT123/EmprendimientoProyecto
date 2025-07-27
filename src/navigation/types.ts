export type RootStackParamList = {
  [x: string]: any;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  HomeCliente: undefined;
  HomeTrabajador: undefined;
  TrabajadorTabs: undefined; // Navegación para trabajadores
  CompanyScreen: undefined; // Pantalla de empresa
  hireScreen: undefined; // Pantalla de contratación
  // Agrega aquí otras pantallas si es necesario
};
export type HomeStackParamList = {
  CategoryDetail: { categoryId: string }; // Parámetro para la pantalla de detalle de categoría
  // Agrega aquí otras pantallas si es necesario
  WorkerList: { categoryId: string }; // Parámetro para la lista de trabajadores por categoría
};