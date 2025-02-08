import { PreferencesGroups, ClientPreferences } from '../state/preferencesContext';

interface PreferenceGroupProps {
    title: string;
    preferences: ClientPreferences;
}

const PreferenceGroup = ({ title, preferences }: PreferenceGroupProps) => {
    if (Object.keys(preferences).length === 0) return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-normal capitalize text-ember">{title}</h2>
            <p className="text-gray-500 text-sm italic">No additional preferences.</p>
        </div>
    );

    return (
        <div key={title} className="flex flex-col gap-2">
            <h2 className="text-lg font-normal capitalize text-ember">{title}</h2>
            <table className="min-w-full">
                <thead>
                    <tr className="border-b-1 border-ash/60">
                        <th className="px-4 py-2 text-left text-sm border-b-1">ID</th>
                        <th className="px-4 py-2 text-left text-sm border-b-1">Name</th>
                        <th className="px-4 py-2 text-left text-sm border-b-1">Description</th>
                        <th className="px-4 py-2 text-left text-sm border-b-1">Enabled</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(preferences).map(([id, preference]) => (
                        <tr key={id} className="border-b-1 last:border-b-0 border-ash/30">
                            <td className="px-4 py-2 text-left text-ash/50 text-sm align-top">{id}</td>
                            <td className="px-4 py-2 text-left text-molten text-sm align-top">{preference.name}</td>
                            <td className="px-4 py-2 text-left text-ash text-sm align-top">{preference.description}</td>
                            <td className="px-4 py-2 text-center text-sm align-top">{preference.enabled ? '✅' : '❌'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const PreferencesList = ({ preferences }: { preferences: PreferencesGroups }) => {
    return (
        <div className="flex flex-col gap-8 my-6">
            <PreferenceGroup title="Global Preferences" preferences={preferences.global} />
            <PreferenceGroup title="Elven Preferences" preferences={preferences.elven} />
            <PreferenceGroup title="Dwarven Preferences" preferences={preferences.dwarven} />
            <PreferenceGroup title="Human Preferences" preferences={preferences.human} />
        </div>
    );
};

export default PreferencesList;