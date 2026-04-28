import { Temporal } from "@js-temporal/polyfill";

export type MaterialInfo = {
    id: number,
    title: string,
    description: string,
    local: string,
    createdAt: Temporal.ZonedDateTime,
}