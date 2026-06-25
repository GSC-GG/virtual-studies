import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "../types/MessageInfo";
import { ChatSocketService } from "../services/websocket";
import { getUserById, listMessages } from "../services/rest";

export default function useChatAreaViewModel(idChat: number, token: string) {
    const [messages, setMessages] = useState<MessageInfo[]>([])
    const [text, setText] = useState('')
    const [authorNames, setAuthorNames] = useState<Record<number, string>>({})

    const socketService = useRef(
        new ChatSocketService()
    ).current

    const fetchAuthorName = async (authorId: number) => {
        if (authorNames[authorId]) return authorNames[authorId]
        try {
            const user = await getUserById(authorId, token)
            setAuthorNames(prev => ({ ...prev, [authorId]: user.name }))
            return user.name
        } catch {
            return "Anônimo"
        }
    }

    useEffect(() => {
        async function loadMessages() {
            try {
                const res = await listMessages(idChat, token)

                const items = await Promise.all(
                    (res.content || []).map(async (m: any) => ({
                        ...m,
                        author: await getUserById(m.authorId, token),
                        createdAt: Temporal.ZonedDateTime.from(
                            m.createdAt + '[' + Temporal.Now.timeZoneId() + ']'
                        ),
                    }))
                )
                console.log(items)
                setMessages(items)

            } catch (err) {
                console.log('Erro ao carregar mensagens')
            }
        }

        loadMessages()
    }, [idChat, token])

    useEffect(() => {
        socketService.connect(idChat, async incomingMessage => {
            incomingMessage.createdAt = Temporal.ZonedDateTime.from(incomingMessage.createdAt + '[' + Temporal.Now.timeZoneId() + ']')
            incomingMessage.author = await getUserById(incomingMessage.authorId, token)
            setMessages(prev => [...prev, incomingMessage])
        }, token)

        return () => {
            socketService.disconnect()
        }
    }, []);

    function sendMessage(content: string) {
        socketService.sendMessage(idChat, {
            text: content
        }, token)
    }

    return {
        text,
        setText,
        messages,
        sendMessage,
    }
}
