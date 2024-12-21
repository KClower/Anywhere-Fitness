
export const getBaseUrl = () => {
    if (import.meta.env.MODE === 'development') {
        return '' // Empty because proxy will handle it
    }
    return import.meta.env.VITE_API_URL // Production base path
}