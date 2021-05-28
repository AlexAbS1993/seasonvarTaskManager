type isCheckedByType = {
    _id: string,
    login: string,
    pasword: string,
    status: string,
    __v: number
}

export type newTaskType = {
    statusDetails: {
        history: any,
        addedAt: Date
    },
    discription: string,
    status: "new" | "ready" | "check" | "reworking" | "working",
    isCheckedBy: isCheckedByType[],
    commentary: any[],
    _id: string,
    name: string,
    priority: "high" | "low" | "middle",
    link: string
}

export type MappedTaskType = newTaskType&{userStatus: string, loading: boolean, userID: string}