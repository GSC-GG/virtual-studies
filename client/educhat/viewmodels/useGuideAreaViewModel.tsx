import { useEffect, useState } from "react";
import { API_BASE } from "./apiBase";
import axios from "axios";
import { ChatInfo } from "../types/ChatInfo";
import { Temporal } from "@js-temporal/polyfill";
import { MaterialInfo } from "../types/MaterialInfo";
import { ExerciseInfo } from "../types/ExerciseInfo";

export default function useGuideAreaViewModel(idChat: number) {
    const [materials, setMaterials] = useState<MaterialInfo[]>([{
        id: 1,
        title: "Apostila de Álgebra Linear",
        description: "Apostila",
        local: "drive.google.com",
        createdAt: Temporal.Now.zonedDateTimeISO()
    }])
    const [exercises, setExercises] = useState<ExerciseInfo[]>([{
        id: 2,
        title: "Exercícios de Matrizes",
        description: "Lista de exercícios",
        link: "docs.google.com",
        createdAt: Temporal.Now.zonedDateTimeISO()
    }])

    // useEffect(() => {
    //     async function fetchMaterials() {
    //         try {
    //             const res = await axios.get(`${API_BASE}/chats/${idChat}/materials`)
    //             setMaterials(res.data)
    //         } catch (error) {

    //         }
    //     }

    //     fetchMaterials()
    // }, [chat])

    return { materials, exercises }
}