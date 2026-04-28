import { useEffect, useState } from "react";
import { API_BASE } from "./apiBase";
import axios from "axios";
import { ChatInfo } from "../types/ChatInfo";
import { Temporal } from "@js-temporal/polyfill";

export default function useChatViewModel(idChat: number) {
    const [areaIndex, setAreaIndex] = useState(0)
    const [chat, setChat] = useState<ChatInfo>({
        id: 1,
        subject: "Matemática",
        teacher: "Joel",
        createdAt: Temporal.Now.zonedDateTimeISO()
    })

    // useEffect(() => {
    //     async function fetchChat() {
    //         try {
    //             const res = await axios.get(`${API_BASE}/chats/${idChat}`)
    //             setChat(res.data)
    //         } catch (error) {

    //         }
    //     }

    //     fetchChat()
    // }, [chat])

    // setChat({
    //     subject: "Matemática",
    //     teacher: "Joel",
    //     createdAt: Temporal.Now.zonedDateTimeISO()
    // })

    return { chat, areaIndex, setAreaIndex }
}