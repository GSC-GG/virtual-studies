import axios from "axios"
import { API_BASE } from "../viewmodels/apiBase"
import { ChatListItem, PagedResponse } from "../models"

// ---- Autenticação ----

export async function authenticate(username: string, password: string): Promise<string> {
    const res = await axios.post(`${API_BASE}/auth/authenticate`, {
        username,
        password,
    })
    return res.data
}

export async function registerUser(name: string, email: string, password: string, role: 'student' | 'teacher'): Promise<any> {
    const res = await axios.post(`${API_BASE}/users/register`, {
        name,
        email,
        password,
        role,
    })
    return res.data
}

// ---- Usuário ----

export async function getMe(token: string): Promise<any> {
    const res = await axios.get(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function getUserById(id: number, token: string): Promise<any> {
    const res = await axios.get(`${API_BASE}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

// ---- Chat ----

export async function listAuthenticatedUserChats(token: string): Promise<PagedResponse<ChatListItem>> {
    const res = await axios.get(`${API_BASE}/users/me/chats`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function listTeacherChats(token: string): Promise<PagedResponse<ChatListItem>> {
    const res = await axios.get(`${API_BASE}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function getChatById(chatId: number, token: string): Promise<any> {
    const res = await axios.get(`${API_BASE}/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function createChat(subject: string, token: string): Promise<any> {
    const res = await axios.post(`${API_BASE}/chats`, { subject }, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function deleteChat(chatId: number, token: string): Promise<void> {
    await axios.delete(`${API_BASE}/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

// ---- Materiais ----

export async function listMaterials(chatId: number, token: string): Promise<PagedResponse<any>> {
    const res = await axios.get(`${API_BASE}/chats/${chatId}/materials`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function createMaterial(chatId: number, data: { title: string; description: string; local: string }, token: string): Promise<any> {
    const res = await axios.post(`${API_BASE}/chats/${chatId}/materials`, data, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function deleteMaterial(chatId: number, materialId: number, token: string): Promise<void> {
    await axios.delete(`${API_BASE}/chats/${chatId}/materials/${materialId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

// ---- Exercícios ----

export async function listExercises(chatId: number, token: string): Promise<PagedResponse<any>> {
    const res = await axios.get(`${API_BASE}/chats/${chatId}/exercises`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function createExercise(chatId: number, data: { title: string; description: string; link: string }, token: string): Promise<any> {
    const res = await axios.post(`${API_BASE}/chats/${chatId}/exercises`, data, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function deleteExercise(chatId: number, exerciseId: number, token: string): Promise<void> {
    await axios.delete(`${API_BASE}/chats/${chatId}/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

// ---- Reuniões ----

export async function listMeetings(chatId: number, token: string): Promise<PagedResponse<any>> {
    const res = await axios.get(`${API_BASE}/chats/${chatId}/meetings`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function createMeeting(chatId: number, data: { title: string; description: string; link: string; date: string }, token: string): Promise<any> {
    const res = await axios.post(`${API_BASE}/chats/${chatId}/meetings`, data, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function deleteMeeting(chatId: number, meetingId: number, token: string): Promise<void> {
    await axios.delete(`${API_BASE}/chats/${chatId}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}

// ---- Mensagens ----

export async function listMessages(chatId: number, token: string): Promise<PagedResponse<any>> {
    const res = await axios.get(`${API_BASE}/chats/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

// ---- Estudantes ----

export async function assignOrUnassignStudent(chatId: number, studentId: number, token: string): Promise<any> {
    const res = await axios.post(`${API_BASE}/chats/${chatId}/students/${studentId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function listAllStudents(token: string): Promise<PagedResponse<any>> {
    const res = await axios.get(`${API_BASE}/students`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

export async function listChatStudents(chatId: number, token: string): Promise<PagedResponse<any>> {
    const res = await axios.get(`${API_BASE}/chats/${chatId}/students`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
}

// ---- Pontuação ----

export async function getScore(token: string): Promise<number> {
    try {
        const res = await axios.get(`${API_BASE}/score`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.data?.score ?? 0
    } catch {
        return 0
    }
}