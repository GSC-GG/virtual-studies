import { useEffect, useState } from "react";
import { UserInfo } from "../types/UserInfo";
import { listChatStudents } from "../services/rest";

export default function useParticipantsAreaViewModel(chatId: number, token: string) {
    const [users, setUsers] = useState<UserInfo[]>([])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await listChatStudents(chatId, token)
                const students = (res.content || []).map((s: any): UserInfo => ({
                    id: s.id,
                    name: s.name,
                    email: s.email,
                    role: 'student',
                }))
                setUsers(students)
            } catch (error) {
                console.log('Erro ao carregar participantes do chat')
            }
        }

        fetchUsers()
    }, [chatId, token])

    return { users }
}