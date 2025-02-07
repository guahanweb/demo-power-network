import { AxiosRequestConfig, AxiosResponse } from 'axios';
declare class ApiClient {
    private client;
    constructor(baseURL: string, clientId: string);
    private setupInterceptors;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
export declare const createApiClient: (baseURL: string, clientId: string) => ApiClient;
export {};
//# sourceMappingURL=apiClient.d.ts.map