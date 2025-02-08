import { useState, useEffect } from 'react';
import { usePreferences } from '../state/preferencesContext'

interface PreferencesListProps {
    submitButtonText: string;
    submitButtonClass?: string;
}

const PreferencesList = ({ submitButtonText, submitButtonClass }: PreferencesListProps) => {
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
        <div className="flex flex-col gap-4 text-left mt-4">
            {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                    <div className="pt-[2px]">
                        <input type="checkbox" id={key} checked={localPreferences[key] ?? false} onChange={() => handleToggle(key)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={key} className="text-lg font-medium">{value.name}</label>
                        <p className="text-sm text-gray-400">{value.description}</p>
                    </div>
                </div>
            ))}
            <button
                className={`${submitButtonClass} px-4 py-2 rounded-md cursor-pointer mt-2`}
                onClick={handleSave}
            >
                {submitButtonText}
            </button>
        </div>
    )
}

export default PreferencesList;
