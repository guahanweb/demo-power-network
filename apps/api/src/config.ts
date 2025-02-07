
const config: any = {
    redis: {
        url: loadFromEnvironment('REDIS_URL', 'redis://localhost:6379'),
    },
};

export default config;

function loadFromEnvironment(key: string, defaultValue?: string|number|boolean|null) {
    const value = process.env[key];
    if (value === undefined) {
        return defaultValue;
    }
    return value;
}
