import { useEffect, useState } from "react";
import { listMeetings } from "../services/rest";
import { MeetingInfo } from "../models";

export default function useGuideAreaViewModel(idChat: number, token: string) {
    const [meetings, setMeetings] = useState<MeetingInfo[]>([])

    useEffect(() => {
        async function fetchMeetings() {
            try {
                const res = await listMeetings(idChat, token)
                setMeetings(res.content || [])
            } catch (error) {
                console.log('Erro ao carregar reuniões')
            }
        }

        fetchMeetings()
    }, [idChat, token])

    return { meetings, setMeetings }
}
