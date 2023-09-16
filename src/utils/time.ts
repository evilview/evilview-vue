import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

export function newDate(date?: string | number | Date | dayjs.Dayjs | null | undefined): Dayjs {
    return dayjs(date)
}