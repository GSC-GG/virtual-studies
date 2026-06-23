import { useState } from "react"
import { listAuthenticatedUserChats, assignOrUnassignStudent } from "../services/rest"
import { ChatListItem } from "../models"

export default function useSearchChatViewModel(token: string) {
    const [subject, setSubject] = useState('')
    const [teacher, setTeacher] = useState('')
    const [foundChat, setFoundChat] = useState<ChatListItem | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSearch = async () => {
        if (!subject.trim() && !teacher.trim()) {
            setError('Preencha pelo menos um campo de busca.')
            return
        }
        try {
            setLoading(true)
            setError('')
            setFoundChat(null)
            const res = await listAuthenticatedUserChats(token)
            const found = res.content.find(c =>
                (!subject.trim() || c.subject.toLowerCase().includes(subject.toLowerCase())) &&
                (!teacher.trim() || (c.teacherName && c.teacherName.toLowerCase().includes(teacher.toLowerCase())))
            )
            if (found) {
                setFoundChat(found)
            } else {
                setError('Chat não encontrado.')
            }
        } catch (err) {
            setError('Erro ao buscar chat.')
        } finally {
            setLoading(false)
        }
    }

    const handleJoinChat = async (): Promise<boolean> => {
        if (!foundChat) return false
        try {
            setLoading(true)
            await assignOrUnassignStudent(foundChat.id, 0, token)
            return true
        } catch (err) {
            setError('Não foi possível ingressar no chat.')
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        subject, setSubject,
        teacher, setTeacher,
        foundChat, error, loading,
        focusedField, setFocusedField,
        handleSearch, handleJoinChat,
    }
}