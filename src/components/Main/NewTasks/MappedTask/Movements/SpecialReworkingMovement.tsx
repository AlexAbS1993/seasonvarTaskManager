import classes from "./reworking.module.css";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../../../assets/components/Button/Button";
import { Form, schemaType } from "../../../../../assets/components/Form/Form";
import { ThunkAppDispatch } from "../../../../../Types/reduxTypes/reduxStoreTypes";

const commentarySchema:schemaType[] = [
    {name: "commentary", label: "Комментарий", placeholder:"Введите комментарий", id:"commentReworking", type:"text"}
]

export const SpeacialReworkingMovement:FC<{sendToReworkingClickHandler: (commentary: string) => void, loading: boolean}> = ({sendToReworkingClickHandler, loading}) => {
    const [isOpen, setIsOpen] = useState(false)
    const clickHandler = () => {
        setIsOpen(prev => !prev)
    }
       
    const [field, setField] = useState<any>({
        commentary: ""
    })
    const acceptClickHandler = (e:any) => {
        e.preventDefault()
        sendToReworkingClickHandler(field.commentary)
    }
    const changeHandler = (field: string, value:string) => {
        setField({commentary: value})
    }
    return (
        <>
            <div className={classes.reworkingWrapper}> <Button text="X" type="button" onClick={clickHandler} disabled={loading} variant="little"/> 
                {
                    isOpen && <div className={classes.acceptedReworkingForm}> 
                        <Form schema={commentarySchema} loading={loading} onChange={changeHandler} datas={field} onSubmit={acceptClickHandler} buttonText="Подтвердить"/>
                    </div>
                }
             </div>
        </>
    )
}