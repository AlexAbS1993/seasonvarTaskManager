import classes from './input.module.css'
import {FC} from 'react'

type TextInputType = {
    label: string,
    name: string,
    placeholder: string,
    onChange: (name:string, value: string) => void,
    type: "text" | "textarea" | "password",
    id: string,
    value: string
}

export const Input:FC<TextInputType> = ({label, name, placeholder, onChange, type, id, value}) => {
    return (
        <div className={classes.inputWrapper}>
            <div className={classes.leftSide}><label htmlFor={id}>{label}</label></div>
            <div className={classes.rightSide}><input id={id} name={name} placeholder={placeholder} onChange={(e) => {onChange(name, e.target.value)}} type={type} value={value}/></div>
        </div>
    )
}

type SelectInputType = Omit<TextInputType, "type"> & {type: "select", options: string[], defaultValue: "high" | "middle" | "low"}

export const InputSelect:FC<SelectInputType> = ({label, name, placeholder, onChange, id, options, value}) => {
    return(
        <div className={classes.inputWrapper}>
            <div className={classes.leftSide}><label htmlFor={id}>{label}</label></div>
            <div className={classes.rightSide}><select id={id} name={name} placeholder={placeholder} onChange={(e) => {onChange(name, e.target.value)}} value={value}>
                {
                    options.map(e => {
                        return <option value={e} key={e}>{e}</option>
                    })
                }
                </select></div>
        </div>
    )
}