import { createContext, useContext } from "react"

export type ChatContextData = {
    chatId: number
    token: string
    userRole: 'student' | 'teacher'
    userId?: number
}

export const ChatContext = createContext<ChatContextData>({
    chatId: 0,
    token: '',
    userRole: 'student',
    userId: 0,
})

export function useChatContext() {
    return useContext(ChatContext)
}