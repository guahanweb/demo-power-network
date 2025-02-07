import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchPreferences, updatePreferences } from '../services/api';

export interface Preference {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}

interface PreferencesState {
    preferences: Record<string, Preference>;
    loading: boolean;
    error: string | null;
}

interface PreferencesAction {
    type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'UPDATE_START' | 'UPDATE_SUCCESS' | 'UPDATE_ERROR';
    payload?: any;
}

interface PreferencesContextProps extends PreferencesState {
    updatePreferences: (preferences: Record<string, boolean>) => void;
}

const initialState: PreferencesState = {
    preferences: {},
    loading: false,
    error: null,
};

const preferencesReducer = (state: PreferencesState, action: PreferencesAction): PreferencesState => {
    switch (action.type) {
        case 'FETCH_START':
        case 'UPDATE_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, preferences: action.payload };
        case 'UPDATE_SUCCESS':
            return { ...state, loading: false, preferences: { ...state.preferences, ...action.payload } };
        case 'FETCH_ERROR':
        case 'UPDATE_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const PreferencesContext = createContext<PreferencesContextProps | undefined>(undefined);

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
        }

        loadPreferences();
    }, []);

    const handleUpdatePreferences = async (preferences: Record<string, boolean>) => {
        dispatch({ type: 'UPDATE_START' });
        try {
            const data = await updatePreferences(preferences);
            dispatch({ type: 'UPDATE_SUCCESS', payload: data });
        } catch (error: any) {
            dispatch({ type: 'UPDATE_ERROR', payload: error.message });
        }
    }

    return (
        <PreferencesContext.Provider value={{
            ...state,
            updatePreferences: handleUpdatePreferences,
        }}>
            {children}
        </PreferencesContext.Provider>
    )
}

export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
}
