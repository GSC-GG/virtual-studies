import { useEffect, useState } from "react"
import { listAllStudents, assignOrUnassignStudent } from "../services/rest"

export default function useAddParticipantViewModel(chatId: number, token: string) {
    const [search, setSearch] = useState('')
    const [students, setStudents] = useState<any[]>([])
    const [chatStudents, setChatStudents] = useState<Set<number>>(new Set())
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState<number | null>(null)
    const [error, setError] = useState('')
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const allStudentsRes = await listAllStudents(token)
                setStudents(allStudentsRes.content || [])
            } catch (err) {
                setError('Erro ao carregar estudantes.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    const handleAddStudent = async (studentId: number) => {
        try {
            setAdding(studentId)
            setError('')
            await assignOrUnassignStudent(chatId, studentId, token)
            setChatStudents(prev => {
                const next = new Set(prev)
                if (next.has(studentId)) {
                    next.delete(studentId)
                } else {
                    next.add(studentId)
                }
                return next
            })
        } catch (err: any) {
            setError('Erro ao adicionar estudante.')
        } finally {
            setAdding(null)
        }
    }

    const filteredStudents = students.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase())
    )

    return {
        search, setSearch,
        filteredStudents, chatStudents,
        loading, adding, error,
        focused, setFocused,
        handleAddStudent,
    }
}