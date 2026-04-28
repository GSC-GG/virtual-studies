import { Temporal } from "@js-temporal/polyfill";

export type ExerciseInfo = {
    id: number,
    title: string,
    description: string,
    link: string,
    createdAt: Temporal.ZonedDateTime,
    alreadyAnswered?: boolean
}