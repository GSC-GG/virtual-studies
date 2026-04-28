import { Temporal } from "@js-temporal/polyfill";
import axios from "axios";
import { API_BASE } from "./apiBase";
import { useEffect, useState } from "react";
import { MessageInfo } from "../types/MessageInfo";

export default function useChatAreaViewModel(idChat: number) {
    const [messages, setMessages] = useState<MessageInfo[]>([
        {
            id: 1,
            text: "Prova amanhã!",
            author: {
                name: "Joel Saade"
            },
            thanks: [],
            createdAt: Temporal.Now.zonedDateTimeISO()
        },
        {
            id: 2,
            text: "Noooooooo",
            author: {
                name: "Julia Marques"
            },
            thanks: [1, 2, 3],
            createdAt: Temporal.Now.zonedDateTimeISO(),
            authorIsMe: true
        },
    ])

    // useEffect(() => {
    //     async function fetchMessages() {
    //         try {
    //             const res = await axios.get(`${API_BASE}/chats/${idChat}/messages`)
    //             setMessages(res.data)
    //         } catch (error) {

    //         }
    //     }

    //     fetchMessages()
    // }, [messages])

    // setMessages(
    //     [
    //         {
    //             id: 1,
    //             text: "Prova amanhã!",
    //             author: {
    //                 name: "Joel Saade"
    //             },
    //             thanks: [],
    //             createdAt: Temporal.Now.zonedDateTimeISO()
    //         },
    //         {
    //             id: 2,
    //             text: "Noooooooo",
    //             author: {
    //                 name: "Julia Marques"
    //             },
    //             thanks: [1,2,3],
    //             createdAt: Temporal.Now.zonedDateTimeISO(),
    //             authorIsMe: true
    //         },
    //     ]
    // )

    return { messages }
}