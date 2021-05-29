export type LogOutNavTypes = {
    menus: {name: string, link: string}[],
    counts?:any,
    status?: "admin" | "user"
}