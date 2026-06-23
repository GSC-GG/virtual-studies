import { useEffect, useState } from "react"
import { listAuthenticatedUserChats, getMe, getScore } from "../services/rest"
import { ChatListItem, UserInfo } from "../models"

export default function useMenuViewModel(token: string) {
    const [chats, setChats] = useState<ChatListItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [user, setUser] = useState<UserInfo | null>(null)
    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                setError('')
                const [chatResponse, userData] = await Promise.all([
                    listAuthenticatedUserChats(token),
                    getMe(token),
                ])
                setChats(chatResponse.content)
                setUser(userData)
                if (userData.role === 'student') {
                    const s = await getScore(token)
                    setScore(s)
                }
            } catch (err) {
                setError('Não foi possível carregar seus chats.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    const isTeacher = user?.role === 'teacher'

    return { chats, loading, error, user, score, isTeacher }
}