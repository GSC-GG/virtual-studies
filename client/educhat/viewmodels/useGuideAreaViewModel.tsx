import { useEffect, useState } from "react";
import { listMaterials, listExercises } from "../services/rest";
import { MaterialInfo } from "../types/MaterialInfo";
import { ExerciseInfo } from "../types/ExerciseInfo";
import { Temporal } from "@js-temporal/polyfill";

export default function useGuideAreaViewModel(idChat: number, token: string) {
    const [materials, setMaterials] = useState<MaterialInfo[]>([])
    const [exercises, setExercises] = useState<ExerciseInfo[]>([])

    useEffect(() => {
        async function fetchMaterials() {
            try {
                const res = await listMaterials(idChat, token)
                const items = (res.content || []).map((m: any): MaterialInfo => ({
                    id: m.id,
                    title: m.title,
                    description: m.description,
                    local: m.local,
                    createdAt: Temporal.ZonedDateTime.from(m.createdAt + '[' + Temporal.Now.timeZoneId() + ']'),
                }))
                setMaterials(items)
            } catch (error) {
                console.log('Erro ao carregar materiais')
            }
        }

        async function fetchExercises() {
            try {
                const res = await listExercises(idChat, token)
                const items = (res.content || []).map((e: any): ExerciseInfo => ({
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    link: e.link,
                    createdAt: Temporal.ZonedDateTime.from(e.createdAt + '[' + Temporal.Now.timeZoneId() + ']'),
                }))
                setExercises(items)
            } catch (error) {
                console.log('Erro ao carregar exercícios')
            }
        }

        fetchMaterials()
        fetchExercises()
    }, [idChat, token])

    return { materials, exercises, setMaterials, setExercises }
}