import { FC } from "react";
import { Button } from "../Button/Button";
import { Input, InputSelect } from "../Input/Input";

export type schemaType = {type: "text" | "textarea" | "password", placeholder: string, label: string, name: string, id: string}
export type schemaTypeSelect = {type: "select", placeholder: string, label: string, name: string, id: string, options: ["high", "low", "middle"], defaultValue: "high" | "low" | "middle"}

type FormType = {
        schema: (schemaType|schemaTypeSelect)[],
        onChange: (name: string, value: string) => void,
        onSubmit: (e:any) => void,
        loading: boolean,
        buttonText: string,   
        datas: any,
        buttonVariant?: "medium" | "big" | "little",
        inputVariant?: "medium" | "big" | "little",
}

export const Form:FC<FormType> = ({schema, onChange, onSubmit, loading, buttonText, datas, buttonVariant, inputVariant}) => {
    return (
        <form onSubmit={onSubmit}>
            {schema.map((e) => {
                if (e.type === "text" || e.type === "textarea" || e.type === "password"){
                    return <Input type={e.type} name={e.name} onChange={onChange} placeholder={e.placeholder} label={e.label} key={e.name} id={e.id} value={datas[e.name]} />
                }
                if (e.type === "select"){
                    return <InputSelect type={e.type} name={e.name} onChange={onChange} placeholder={e.placeholder} label={e.label} key={e.name} id={e.id} 
                    options={e.options} value={datas[e.name]}
                    defaultValue={e.defaultValue}
                    />
                }
            } )}
            <Button type="submit" text={buttonText} variant={buttonVariant ? buttonVariant : "medium"} disabled={loading}/>
        </form>
    )
}