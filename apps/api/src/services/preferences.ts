import { createClient } from 'redis';
import type { Preference, ClientPreferenceOverride } from '../models/preferences';
import config from '../config';

export const redisKeys = {
    GLOBAL_PREFERENCES: 'preferences:global',
    CLIENT_PREFERENCES: (clientId: string) => `preferences:client:${clientId}`,
    USER_PREFERENCES: (userId: string) => `preferences:user:${userId}`,
    AUDIT_LOGS: 'audit:logs',
};

const redisClient = createClient({
    url: config.redis.url,
});
redisClient.connect();

export class PreferenceService {
    static async getGlobalPreferences(parse = false) {
        const prefs = await redisClient.hGetAll(redisKeys.GLOBAL_PREFERENCES);
        return parse 
            ? Object.fromEntries(Object.entries(prefs).map(([key, value]) => [key, JSON.parse(value)]))
            : prefs;
    }

    static async getClientOnlyPreferences(clientId: string) {
        const globalPrefs = await this.getGlobalPreferences();
        const clientPrefs = await redisClient.hGetAll(redisKeys.CLIENT_PREFERENCES(clientId));

        const mergedPreferences: Record<string, Preference> = {};
        for (const [key, value] of Object.entries(clientPrefs)) {
            if (!globalPrefs[key]) {
                mergedPreferences[key] = JSON.parse(value);
            }
        }

        return mergedPreferences;
    }

    static async getClientPreferences(clientId: string) {
        const globalPrefs = await this.getGlobalPreferences();
        const clientPrefs = await redisClient.hGetAll(redisKeys.CLIENT_PREFERENCES(clientId));

        const mergedPreferences: Record<string, Preference> = {};
        for (const [key, value] of Object.entries(globalPrefs)) {
            const globalPref = JSON.parse(value);
            const clientOverride = clientPrefs[key] ? JSON.parse(clientPrefs[key]) : {};

            mergedPreferences[key] = {
                ...globalPref,
                ...clientOverride,
            };
        }

        for (const [key, value] of Object.entries(clientPrefs)) {
            if (!mergedPreferences[key]) {
                mergedPreferences[key] = JSON.parse(value);
            }
        }

        return mergedPreferences;
    }

    static async getUserPreferences(userId: string, clientId?: string) {
        const userPrefs = await redisClient.hGetAll(redisKeys.USER_PREFERENCES(userId));

        if (clientId) {
            const clientPrefs = await this.getClientPreferences(clientId);
            const filteredPrefs: Record<string, boolean> = {};

            // only filter if we have asked for a specific client
            for (const prefId in clientPrefs) {
                filteredPrefs[prefId] = userPrefs[prefId] !== undefined
                    ? JSON.parse(userPrefs[prefId])
                    : clientPrefs[prefId].enabled;
            }

            return filteredPrefs;
        }

        // return the user preferences as a parsed object
        return Object.fromEntries(Object.entries(userPrefs).map(([key, value]) => [key, JSON.parse(value)]));
    }

    static async updateUserPreference(userId: string, preferenceId: string, value: boolean) {
        await redisClient.hSet(redisKeys.USER_PREFERENCES(userId), preferenceId, JSON.stringify(value));
    }

    static async updateGlobalPreference(id: string, preference: Preference) {
        await redisClient.hSet(redisKeys.GLOBAL_PREFERENCES, id, JSON.stringify(preference));
    }

    static async updateClientPreference(clientId: string, id: string, preference: Preference | ClientPreferenceOverride) {
        await redisClient.hSet(redisKeys.CLIENT_PREFERENCES(clientId), id, JSON.stringify(preference));
    }

    static async logAudit(action: string, details: any) {
        await redisClient.lPush(redisKeys.AUDIT_LOGS, JSON.stringify({ action, details, timestamp: Date.now() }));
    }
}
