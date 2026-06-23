import { useEffect, useState } from "react";
import { UserInfo } from "../models";
import { listChatStudents } from "../services/rest";

export default function useParticipantsAreaViewModel(chatId: number, token: string) {
    const [users, setUsers] = useState<UserInfo[]>([])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await listChatStudents(chatId, token)
                setUsers(res.content || [])
            } catch (error) {
                console.log('Erro ao carregar participantes do chat')
            }
        }

        fetchUsers()
    }, [chatId, token])

    return { users }
}
