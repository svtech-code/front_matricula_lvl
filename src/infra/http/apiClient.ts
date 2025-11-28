import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

const URLPATH = process.env.PUBLIC_API_URL;

/**
 * Configuración principal del cliente Axios
 */
export const apiClient = axios.create({
  baseURL: URLPATH,
  timeout: 60000,
  maxContentLength: 10000000,
  maxBodyLength: 10000000,
});

/**
 * Interceptor para la configuración de peticiones HTTP axios
 * Solo agrega headers de autorización para rutas que lo requieren
 * @param config -> configuración de la petición
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = null;

    config.headers = config.headers || {};

    const isLoginRequest = config.url?.includes('/login');
    if (!isLoginRequest && token)
      config.headers.Authorization = `Bearer ${token}`;

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/**
 * Interceptor para manejar las respuesta HTTP
 * Delega el manejo de errores al servicio especializado siguiendo Clean Architecture
 * @param response -> respuesta exitosa del servidor
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);
