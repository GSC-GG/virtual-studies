import { useState } from "react"
import { createChat } from "../services/rest"

export default function useNewChatViewModel(token: string) {
    const [subject, setSubject] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focused, setFocused] = useState(false)

    const handleCreate = async (): Promise<number | null> => {
        if (subject.length < 3 || subject.length > 120) {
            setError('Nome da matéria deve ter entre 3 e 120 caracteres.')
            return null
        }
        try {
            setLoading(true)
            setError('')
            const newChat = await createChat(subject, token)
            return newChat.id
        } catch (err: any) {
            setError('Não foi possível criar o chat.')
            return null
        } finally {
            setLoading(false)
        }
    }

    return { subject, setSubject, error, loading, focused, setFocused, handleCreate }
}