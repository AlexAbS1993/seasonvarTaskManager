import classes from './input.module.css'
import {FC} from 'react'

type TextInputType = {
    label: string,
    name: string,
    placeholder: string,
    onChange: (name:string, value: string) => void,
    type: "text" | "textarea" | "password",
    id: string
}

export const Input:FC<TextInputType> = ({label, name, placeholder, onChange, type, id}) => {
    return (
        <div className={classes.inputWrapper}>
            <div className={classes.leftSide}><label htmlFor={id}>{label}</label></div>
            <div className={classes.rightSide}><input id={id} name={name} placeholder={placeholder} onChange={(e) => {onChange(name, e.target.value)}} type={type}/></div>
        </div>
    )
}