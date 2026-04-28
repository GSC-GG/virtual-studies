import { Temporal } from '@js-temporal/polyfill';

export type ChatInfo = {
    id: number,
    subject: string,
    teacher: string,
    createdAt: Temporal.ZonedDateTime,
}