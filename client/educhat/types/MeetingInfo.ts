import { Temporal } from "@js-temporal/polyfill";

export type MeetingInfo = {
    id: number,
    title: string,
    description: string,
    link: string,
    closed?: boolean
    date: Temporal.ZonedDateTime,
}