import { useState } from "react"
import { registerUser } from "../services/rest"

export default function useRegisterViewModel() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'student' | 'teacher'>('student')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleRegister = async (): Promise<boolean> => {
        if (name.length < 2 || name.length > 100) {
            setError('Nome deve ter entre 2 e 100 caracteres.')
            return false
        }
        if (!email.includes('@')) {
            setError('Email inválido.')
            return false
        }
        if (password.length < 8) {
            setError('Senha deve ter no mínimo 8 caracteres.')
            return false
        }

        try {
            setLoading(true)
            setError('')
            await registerUser(name, email, password, role)
            return true
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError('Email já cadastrado.')
            } else {
                setError('Não foi possível realizar o cadastro.')
            }
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        role, setRole,
        error, loading,
        focusedField, setFocusedField,
        handleRegister,
    }
}