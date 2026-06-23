import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "../models";
import { ChatSocketService } from "../services/websocket";
import { listMessages, getUserById } from "../services/rest";

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
                const raw = res.content || []
                const withNames = await Promise.all(
                    raw.map(async (m: any) => {
                        const name = await fetchAuthorName(m.authorId)
                        return { ...m, authorName: name }
                    })
                )
                setMessages(withNames)
            } catch (err) {
                console.log('Erro ao carregar mensagens')
            }
        }
        loadMessages()
    }, [idChat, token])

    useEffect(() => {
        socketService.connect(idChat, async (incomingMessage: any) => {
            const name = await fetchAuthorName(incomingMessage.authorId)
            setMessages(prev => [...prev, { ...incomingMessage, authorName: name }])
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
