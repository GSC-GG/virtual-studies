import { useState } from "react"
import { createMaterial, createExercise } from "../services/rest"

export default function useAddContentViewModel(chatId: number, token: string) {
    const [contentType, setContentType] = useState<'material' | 'exercise'>('material')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSave = async (): Promise<boolean> => {
        if (title.length < 3 || title.length > 100) {
            setError('Título deve ter entre 3 e 100 caracteres.')
            return false
        }
        if (description.length > 500) {
            setError('Descrição deve ter no máximo 500 caracteres.')
            return false
        }

        try {
            setLoading(true)
            setError('')
            if (contentType === 'material') {
                await createMaterial(chatId, { title, description, local: link }, token)
            } else {
                await createExercise(chatId, { title, description, link }, token)
            }
            return true
        } catch (err: any) {
            setError('Não foi possível salvar o conteúdo.')
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        contentType, setContentType,
        title, setTitle,
        description, setDescription,
        link, setLink,
        error, loading,
        focusedField, setFocusedField,
        handleSave,
    }
}