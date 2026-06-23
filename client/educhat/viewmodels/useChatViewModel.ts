import { useEffect, useState } from "react"
import { getMe, getChatById, getUserById } from "../services/rest"
import { ChatInfo } from "../models"

export default function useChatViewModel(chatId: number, token: string) {
    const [areaIndex, setAreaIndex] = useState(0)
    const [chat, setChat] = useState<ChatInfo>({
        id: 0,
        subject: "",
        teacherId: 0,
        createdAt: ""
    })
    const [teacherName, setTeacherName] = useState<string>('')
    const [userRole, setUserRole] = useState<'student' | 'teacher'>('student')
    const [userId, setUserId] = useState<number>(0)

    useEffect(() => {
        async function fetchChat() {
            try {
                const data = await getChatById(chatId, token)
                setChat(data)
                if (data.teacherId) {
                    const teacherData = await getUserById(data.teacherId, token)
                    setTeacherName(teacherData.name)
                }
            } catch (error) {
                console.log('Erro ao carregar chat')
            }
        }
        fetchChat()
    }, [chatId, token])

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await getMe(token)
                if (user.role === 'teacher') {
                    setUserRole('teacher')
                }
                setUserId(user.id)
            } catch (err) {
                console.log('Erro ao carregar usuário')
            }
        }
        fetchUser()
    }, [token])

    return { chat, teacherName, areaIndex, setAreaIndex, userRole, userId }
}