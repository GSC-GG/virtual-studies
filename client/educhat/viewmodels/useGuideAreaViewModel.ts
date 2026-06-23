import { useEffect, useState } from "react";
import { listMaterials, listExercises } from "../services/rest";
import { MaterialInfo, ExerciseInfo } from "../models";

export default function useGuideAreaViewModel(idChat: number, token: string) {
    const [materials, setMaterials] = useState<MaterialInfo[]>([])
    const [exercises, setExercises] = useState<ExerciseInfo[]>([])

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const res = await listMaterials(idChat, token)
                setMaterials(res.content || [])
            } catch (error) {
                console.log('Erro ao carregar materiais')
            }
        }

        async function fetchExercises() {
            try {
                const res = await listExercises(idChat, token)
                setExercises(res.content || [])
            } catch (error) {
                console.log('Erro ao carregar exercícios')
            }
        }

        fetchMaterials()
        fetchExercises()
    }, [idChat, token])

    return { materials, exercises, setMaterials, setExercises }
}
