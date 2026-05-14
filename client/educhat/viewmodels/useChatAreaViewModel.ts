import { Temporal } from "@js-temporal/polyfill";
import axios from "axios";
import { API_BASE } from "./apiBase";
import { useEffect, useRef, useState } from "react";
import { MessageInfo } from "../types/MessageInfo";
import { ChatSocketService } from "../services/websocket";

export default function useChatAreaViewModel(idChat: number) {
    const [messages, setMessages] = useState<MessageInfo[]>([])
    const [text, setText] = useState('')

    const socketService = useRef(
        new ChatSocketService()
    ).current

    useEffect(() => {
        socketService.connect(idChat, incomingMessage => {
            incomingMessage.createdAt = Temporal.ZonedDateTime.from(incomingMessage.createdAt + '[' + Temporal.Now.timeZoneId() + ']')
            setMessages(prev => [...prev, incomingMessage])
        })

        return () => {
            socketService.disconnect()
        }
    }, [])

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