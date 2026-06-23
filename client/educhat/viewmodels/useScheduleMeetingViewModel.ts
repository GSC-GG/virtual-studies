import { useState } from "react"
import { createMeeting } from "../services/rest"

export default function useScheduleMeetingViewModel(chatId: number, token: string) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const validateDate = (dateStr: string): boolean => {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/
        const match = dateStr.match(regex)
        if (!match) return false
        const day = parseInt(match[1], 10)
        const month = parseInt(match[2], 10)
        const year = parseInt(match[3], 10)
        const hour = parseInt(match[4], 10)
        const minute = parseInt(match[5], 10)
        const futureDate = new Date(year, month - 1, day, hour, minute)
        return futureDate > new Date()
    }

    const handleSave = async (): Promise<boolean> => {
        if (title.length < 3 || title.length > 100) {
            setError('Título deve ter entre 3 e 100 caracteres.')
            return false
        }
        if (description.length > 500) {
            setError('Descrição deve ter no máximo 500 caracteres.')
            return false
        }
        if (!validateDate(date)) {
            setError('Data inválida. Use o formato dd/mm/yyyy HH:mm e certifique-se de que é uma data futura.')
            return false
        }

        try {
            setLoading(true)
            setError('')
            const [datePart, timePart] = date.split(' ')
            const [day, month, year] = datePart.split('/')
            const isoDate = `${year}-${month}-${day}T${timePart}:00`
            await createMeeting(chatId, { title, description, link, date: isoDate }, token)
            return true
        } catch (err: any) {
            setError('Não foi possível agendar a reunião.')
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        title, setTitle,
        description, setDescription,
        link, setLink,
        date, setDate,
        error, loading,
        focusedField, setFocusedField,
        handleSave,
    }
}