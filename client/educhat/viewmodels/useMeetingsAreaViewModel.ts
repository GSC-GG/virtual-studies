import { useEffect, useState } from "react";
import { listMeetings } from "../services/rest";
import { MeetingInfo } from "../types/MeetingInfo";
import { Temporal } from "@js-temporal/polyfill";

export default function useGuideAreaViewModel(idChat: number, token: string) {
    const [meetings, setMeetings] = useState<MeetingInfo[]>([])

    useEffect(() => {
        async function fetchMeetings() {
            try {
                const res = await listMeetings(idChat, token)
                const items = (res.content || []).map((m: any): MeetingInfo => ({
                    id: m.id,
                    title: m.title,
                    description: m.description,
                    link: m.link,
                    date: Temporal.ZonedDateTime.from(m.createdAt + '[' + Temporal.Now.timeZoneId() + ']'),
                }))
                setMeetings(items)
            } catch (error) {
                console.log('Erro ao carregar reuniões')
            }
        }

        fetchMeetings()
    }, [idChat, token])

    return { meetings, setMeetings }
}