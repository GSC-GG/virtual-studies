import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "../types/MessageInfo";
import { ChatSocketService } from "../services/websocket";
import { listMessages } from "../services/rest";

export default function useChatAreaViewModel(idChat: number, token: string) {
    const [messages, setMessages] = useState<MessageInfo[]>([])
    const [text, setText] = useState('')

    const socketService = useRef(
        new ChatSocketService()
    ).current

    // Load initial messages from API
    useEffect(() => {
        async function loadMessages() {
            try {
                const res = await listMessages(idChat, token)
                const items = (res.content || []).map((m: any) => ({
                    ...m,
                    createdAt: Temporal.ZonedDateTime.from(m.createdAt + '[' + Temporal.Now.timeZoneId() + ']'),
                }))
                setMessages(items)
            } catch (err) {
                console.log('Erro ao carregar mensagens')
            }
        }
        loadMessages()
    }, [idChat, token])

    // WebSocket for real-time messages
    useEffect(() => {
        socketService.connect(idChat, incomingMessage => {
            incomingMessage.createdAt = Temporal.ZonedDateTime.from(incomingMessage.createdAt + '[' + Temporal.Now.timeZoneId() + ']')
            setMessages(prev => [...prev, incomingMessage])
        })

        return () => {
            socketService.disconnect()
        }
    }, []);

    function sendMessage(content: string) {
        socketService.sendMessage(idChat, {
            text: content
        })
    }

    return {
        text,
        setText,
        messages,
        sendMessage,
    }
}