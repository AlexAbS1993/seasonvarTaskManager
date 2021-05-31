export type SimpleButtonType = {
    variant?: "little" | "medium" | "big",
    text: string,
    onClick?: () => void,
    type?: "button"|"submit"|"reset",
    disabled: boolean
}