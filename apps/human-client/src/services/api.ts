import { createApiClient } from '@ringnetwork-demo/shared-api';

const apiClient = createApiClient('/api', 'dwarven-client');

export const getStatus = async () => {
    const response = await apiClient.get('/service-status');
    return response.data;
};
