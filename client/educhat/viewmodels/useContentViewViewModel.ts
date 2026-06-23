import { useEffect, useState } from "react"
import { listMaterials, listExercises } from "../services/rest"

export default function useContentViewViewModel(chatId: number, contentId: number, contentType: 'material' | 'exercise', token: string) {
    const [content, setContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContent() {
            try {
                setLoading(true)
                if (contentType === 'material') {
                    const res = await listMaterials(chatId, token)
                    const found = res.content.find((m: any) => m.id === contentId)
                    setContent(found)
                } else {
                    const res = await listExercises(chatId, token)
                    const found = res.content.find((e: any) => e.id === contentId)
                    setContent(found)
                }
            } catch (err) {
                console.log('Erro ao carregar conteúdo')
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [chatId, contentId, contentType, token])

    const isMaterial = contentType === 'material'

    return { content, loading, isMaterial }
}