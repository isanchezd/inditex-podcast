export function getApiUrl() {
    const apiUrl = `${import.meta.env.VITE_API_URL}`

    if(!apiUrl) {
        throw new Error('env API_URL is required')
    }

    return apiUrl
}

