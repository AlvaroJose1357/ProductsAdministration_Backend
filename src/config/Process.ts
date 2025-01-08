// Forma de uso usando la nueva configuración de variables de entorno:
// process.loadEnvFile();
// los iguales serian por si no se encuentra la variable de entorno, entonces por defecto se asigna el valor que contenga el lado derecho del igual
// export const { PORT = 3000, POSTGRES_URL } = process.env;

// Forma de uso antigua:
// import de dotenv
import "dotenv/config";

export const { PORT = 3000, POSTGRES_URL } = process.env;
