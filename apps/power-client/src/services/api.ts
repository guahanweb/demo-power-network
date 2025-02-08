import { createApiClient } from '@ringnetwork-demo/shared-api';
import { Preference } from '../state/preferencesContext';

const apiClient = createApiClient('/api', 'dwarven-client');

export const getStatus = async () => {
    const response = await apiClient.get('/service-status');
    return response.data;
};

export const fetchPreferences = async (): Promise<Record<string, Preference>> => {
    const response = await apiClient.get('/preferences');
    return response.data as Record<string, Preference>;
};

export const updatePreferences = async (preferences: Record<string, boolean>) => {
    const response = await apiClient.post('/preferences', preferences);
    return response.data;
};
