import { FC } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

type FormType = {
        schema: {type: "text" | "textarea" | "password", placeholder: string, label: string, name: string, id: string}[],
        onChange: (name: string, value: string) => void,
        onSubmit: (e:any) => void,
        loading: boolean,
        buttonText: string
}

export const Form:FC<FormType> = ({schema, onChange, onSubmit, loading, buttonText}) => {
    return (
        <form onSubmit={onSubmit}>
            {schema.map((e) => {
                return <Input type={e.type} name={e.name} onChange={onChange} placeholder={e.placeholder} label={e.label} key={e.name} id={e.id}/>
            } )}
            <Button type="submit" text={buttonText} variant="medium" disabled={loading}/>
        </form>
    )
}