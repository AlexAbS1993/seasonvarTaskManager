import classes from "./button.module.css";
import { FC } from "react";

type SimpleButtonType = {
    variant?: "little" | "medium" | "big",
    text: string,
    onClick?: () => void,
    type?: "button"|"submit"|"reset",
    disabled: boolean
}

export const Button:FC<SimpleButtonType> = ({variant ="medium", text, onClick, type = "button", disabled = false}) => {
    return (
        <button disabled={disabled} className={`${classes[variant]} ${disabled ? `${classes.dissable}` : `${classes.enable} ${classes["sub_button"]}`}`} onClick={onClick ? () => {onClick()} : undefined} type={type}> {text} </button>
    )
}