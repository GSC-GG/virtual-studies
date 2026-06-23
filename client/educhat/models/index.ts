// ---- Tipos de Chat ----
export type ChatListItem = {
    id: number
    subject: string
    teacherId: number
    teacherName?: string
    createdAt: string
}

export type ChatInfo = {
    id: number
    subject: string
    teacherId: number
    createdAt: string
}

// ---- Tipos de Mensagem ----
export type MessageInfo = {
    id: number
    text: string
    authorId: number
    authorName?: string
    thanks: any[]
    createdAt: string
}

// ---- Tipos de Conteúdo ----
export type MaterialInfo = {
    id: number
    title: string
    description: string
    local: string
    createdAt: string
}

export type ExerciseInfo = {
    id: number
    title: string
    description: string
    link: string
    createdAt: string
    alreadyAnswered?: boolean
}

// ---- Tipos de Reunião ----
export type MeetingInfo = {
    id: number
    title: string
    description: string
    link: string
    closed?: boolean
    date: string
}

// ---- Tipos de Usuário ----
export type UserInfo = {
    id: number
    name: string
    email: string
    role: 'teacher' | 'student'
}

// ---- Tipos de Paginação ----
export type PagedResponse<T> = {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}

// ---- Contexto do Chat ----
export type ChatContextData = {
    chatId: number
    token: string
    userRole: 'student' | 'teacher'
    userId?: number
}