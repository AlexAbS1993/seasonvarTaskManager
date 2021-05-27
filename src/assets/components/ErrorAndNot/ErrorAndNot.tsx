import classes from "./ne.module.css";
import { FC } from "react";

type ErrorAndNotType = {
    type: "error" | "not",
    message: string
}

export const ErrorAndNot:FC<ErrorAndNotType> = ({type, message}) => {
return (
    <div className={`${type === "error" ? `${classes.error}` : `${classes.not}`} ${classes.wrapper}`}>
            <p>{message}</p>
    </div>
)
}