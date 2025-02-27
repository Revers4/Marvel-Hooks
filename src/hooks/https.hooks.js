import { useCallback, useState } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {
        'Content-Type': "application/json"
    }) => {
        setLoading(true)
        try {
            const response = await fetch(url, { method, body, headers })
            if (!response.ok) {
                throw new Error("Призошла ошибка")
            }
            const data = await response.json()
            return data
        } catch (error) {
            setError("error.message")
            throw error
        } finally {
            setLoading(false);
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])
    return { loading, request, error, clearError }
}