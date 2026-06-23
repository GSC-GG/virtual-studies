import { createContext, useContext } from "react"
import { ChatContextData } from "../models"

export const ChatContext = createContext<ChatContextData>({
    chatId: 0,
    token: '',
    userRole: 'student',
    userId: 0,
})

export function useChatContext() {
    return useContext(ChatContext)
}
