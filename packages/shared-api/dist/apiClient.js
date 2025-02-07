// packages/shared-api/src/apiClient.ts
import axios from 'axios';
class ApiClient {
    constructor(baseURL, clientId) {
        this.client = axios.create({
            baseURL,
            headers: {
                'X-Client-ID': clientId,
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        this.client.interceptors.request.use((config) => {
            console.log(`Requesting: ${config.url}`);
            return config;
        }, (error) => Promise.reject(error));
        this.client.interceptors.response.use((response) => response, (error) => {
            console.error('API Error:', error);
            return Promise.reject(error);
        });
    }
    get(url, config) {
        return this.client.get(url, config);
    }
    post(url, data, config) {
        return this.client.post(url, data, config);
    }
    put(url, data, config) {
        return this.client.put(url, data, config);
    }
    delete(url, config) {
        return this.client.delete(url, config);
    }
}
export const createApiClient = (baseURL, clientId) => new ApiClient(baseURL, clientId);
