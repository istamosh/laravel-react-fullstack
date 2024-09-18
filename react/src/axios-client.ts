import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// interceptors
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "ACCESS_TOKEN"
    )}`;
    return config;
});

// response interceptors
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        try {
            const { response } = error;
            // check if response is exist first before get status
            if (response && response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
            throw error;
        } catch (e) {
            console.error(e);
        }
    }
);

export default axiosClient;
