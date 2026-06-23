import { useState } from "react"
import { authenticate } from "../services/rest"

export default function useLoginViewModel() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleLogin = async (): Promise<string | null> => {
        try {
            setLoading(true)
            setError('')
            const token = await authenticate(username, password)
            return token
        } catch (err: any) {
            if (err.response?.status === 401) {
                if (err.response?.data?.message?.includes('sen')) {
                    setError('Senha incorreta para este usuário.')
                } else {
                    setError('Email não cadastrado.')
                }
            } else {
                setError('Não foi possível fazer login.')
            }
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        username, setUsername,
        password, setPassword,
        error, loading,
        focusedField, setFocusedField,
        handleLogin,
    }
}