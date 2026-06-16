import { Temporal } from "@js-temporal/polyfill"

export
    type MessageInfo = {
        id: number,
        text: string,
        author: {
            id: number,
            name: string
        },
        thanks: any[],
        createdAt: Temporal.ZonedDateTime,
    }
