import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchPreferences } from '../services/api';

// Preference Interface
export interface Preference {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}

// Client Preferences Interface
export interface ClientPreferences {
    [preferenceId: string]: Preference;
}

export interface PreferencesGroups {
    global: ClientPreferences;
    elven: ClientPreferences;
    dwarven: ClientPreferences;
    human: ClientPreferences;
}

// Mordor (Power Client) Preferences State
interface MordorPreferencesState {
    preferences: PreferencesGroups;
    loading: boolean;
    error: string | null;
}

// Action Types
interface PreferencesAction {
    type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR';
    payload?: any;
}

// Context Props
interface PreferencesContextProps extends MordorPreferencesState {}

// Initial State
const initialState: MordorPreferencesState = {
    preferences: {
        global: {},
        elven: {},
        dwarven: {},
        human: {},
    },
    loading: false,
    error: null,
};

// Reducer
const preferencesReducer = (state: MordorPreferencesState, action: PreferencesAction): MordorPreferencesState => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, preferences: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Context
const PreferencesContext = createContext<PreferencesContextProps | undefined>(undefined);

// Provider
export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(preferencesReducer, initialState);

    useEffect(() => {
        const loadPreferences = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const data = await fetchPreferences();
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error: any) {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
            }
        };

        loadPreferences();
    }, []);

    return (
        <PreferencesContext.Provider value={{ ...state }}>
            {children}
        </PreferencesContext.Provider>
    );
};

// Custom Hook
export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
};
