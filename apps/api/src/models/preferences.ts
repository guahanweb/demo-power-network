export interface Preference {
    id: string; // Unique identifier (e.g., 'email_notifications')
    name: string; // Display name
    description: string; // Default description
    enabled: boolean; // Default status
}

export interface ClientPreferenceOverride {
    id: string; // Matches global preference ID
    enabled?: boolean; // Client-specific override
    verbiage?: {
        name?: string;
        description?: string;
    };
}

export interface UserPreference {
    [preferenceId: string]: boolean; // Keyed by preference ID
}
