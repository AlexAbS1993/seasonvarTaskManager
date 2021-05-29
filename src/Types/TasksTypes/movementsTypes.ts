import { statuses } from './../apiTypes/apiCountType';
export type MovementsType = {
    status: statuses,
    userStatus: "admin" | "user",
    _id: string
}