import { useState, useEffect } from 'react';
import { usePreferences } from '../state/preferencesContext'

const PreferencesList = () => {
    const { preferences, updatePreferences } = usePreferences();
    const [localPreferences, setLocalPreferences] = useState<Record<string, boolean>>(
        Object.fromEntries(
            Object.entries(preferences).map(([key, value]) => [key, value.enabled])
        )
    );

    useEffect(() => {
        setLocalPreferences(Object.fromEntries(
            Object.entries(preferences).map(([key, value]) => [key, value.enabled])
        ));
    }, [preferences]);

    const handleToggle = (key: string) => {
        setLocalPreferences(prev => {
            const newValue = !prev[key];
            return {
                ...prev,
                [key]: newValue
            }
        });
    }

    const handleSave = () => {
        updatePreferences(localPreferences);
    }

    return (
        <div className="flex flex-col gap-2 text-left">
            {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                    <div>
                        <input type="checkbox" id={key} checked={localPreferences[key] ?? false} onChange={() => handleToggle(key)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={key}>{value.name}</label>
                        <p className="text-sm text-gray-400">{value.description}</p>
                    </div>
                </div>
            ))}
            <button
                className="bg-amber-800 text-white px-4 py-2 rounded-md"
                onClick={handleSave}
            >
                Strike the Anvil
            </button>
        </div>
    )
}

export default PreferencesList;
