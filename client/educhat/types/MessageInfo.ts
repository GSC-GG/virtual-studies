import { Temporal } from "@js-temporal/polyfill"

export
    type MessageInfo = {
        id: number,
        text: string,
        author: {
            name: string
        },
        thanks: any[],
        createdAt: Temporal.ZonedDateTime,
    }