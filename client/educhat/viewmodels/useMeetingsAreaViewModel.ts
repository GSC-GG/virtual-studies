import { useEffect, useState } from "react";
import { API_BASE } from "./apiBase";
import axios from "axios";
import { Temporal } from "@js-temporal/polyfill";
import { MeetingInfo } from "../types/MeetingInfo";

export default function useGuideAreaViewModel(idChat: number) {
    const [meetings, setMeetings] = useState<MeetingInfo[]>([{
        id: 1,
        title: "Revisão para prova",
        description: "",
        link: "meet.google.com",
        date: Temporal.Now.zonedDateTimeISO().add({hours: 3})
    }])

    // useEffect(() => {
    //     async function fetchMeetings() {
    //         try {
    //             const res = await axios.get(`${API_BASE}/chats/${idChat}/meetings`)
    //             setMeetings(res.data)
    //         } catch (error) {

    //         }
    //     }

    //     fetchMeetings()
    // }, [chat])

    return { meetings }
}