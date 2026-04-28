import { useState } from "react";
import { UserInfo } from "../types/UserInfo";

export default function useParticipantsAreaViewModel() {
    const [users, setUsers] = useState<UserInfo[]>([
        {
            id: 1,
            name: "Joel",
            email: "joel@ifsp.edu.br",
            role: "teacher",
        },
        {
            id: 2,
            name: "Julia Marques",
            email: "julia@aluno.ifsp.edu.br",
            role: "student",
        },
    ])

    // useEffect(() => {
    //     async function fetchUsers() {
    //         try {
    //             const res = await axios.get(`${API_BASE}/chats/${idChat}/users`)
    //             setUsers(res.data)
    //         } catch (error) {

    //         }
    //     }

    //     fetchUsers()
    // }, [chat])

    return { users }
}