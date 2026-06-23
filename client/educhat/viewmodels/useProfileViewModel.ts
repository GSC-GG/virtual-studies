import { useEffect, useState } from "react"
import { getMe, getScore, listAuthenticatedUserChats, assignOrUnassignStudent } from "../services/rest"
import { ChatListItem, UserInfo } from "../models"

export default function useProfileViewModel(token: string) {
    const [user, setUser] = useState<UserInfo | null>(null)
    const [score, setScore] = useState<number>(0)
    const [chats, setChats] = useState<ChatListItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const userData = await getMe(token)
                setUser(userData)
                if (userData.role === 'student') {
                    const s = await getScore(token)
                    setScore(s)
                }
                const chatRes = await listAuthenticatedUserChats(token)
                setChats(chatRes.content)
            } catch (err) {
                console.log('Erro ao carregar perfil')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    const handleLeaveChat = async (chatId: number) => {
        try {
            await assignOrUnassignStudent(chatId, 0, token)
            setChats(chats.filter(c => c.id !== chatId))
        } catch (err) {
            console.log('Erro ao sair do chat')
        }
    }

    return { user, score, chats, loading, handleLeaveChat }
}