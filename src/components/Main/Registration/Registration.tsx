import { FC, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { Form } from "../../../assets/components/Form/Form"
import { dataType } from "../../../redux/api/userAPI"
import { RootState, ThunkAppDispatch } from "../../../redux/store"
import { registrationThunk } from "../../../redux/userReducer"
import classes from './registration.module.css'

const registrationSchema = [
    {name: "login", placeholder: "Введите логин", label: "Логин:", type: "text", id:"reglogin"} as const, 
    {name: "password", placeholder: "Введите пароль", label: "Пароль:", type: "text", id:"regpassword"} as const,
    {name: "invite", placeholder: "Ваш инвайт", label: "Инвайт", type:"text", id: "invite"} as const
]

export type registrationSchemaType = typeof registrationSchema

export const Registration:FC = () => {
    const [datas, setDatas] = useState<dataType & {invite: string}>("" as any)
    const loading = useSelector<RootState, boolean>(state => state.user.loading)
    const registrationDone = useSelector<RootState, boolean>(state => state.user.registrationDone)
    useEffect(() => {
        let initialDatas = {} as dataType & {invite: string}
        registrationSchema.forEach((e) => {
            initialDatas[e.name] = ""
        })
        setDatas(initialDatas)
    }, [setDatas])
    const dispatch = useDispatch<ThunkAppDispatch>()
    const handleSubmit = (e:any) => {
        e.preventDefault()
        dispatch(registrationThunk(datas))
    }
    const handleChange = (field: string, value: string) => {
        setDatas({...datas, [field]: value})
    }
    if (registrationDone){
        return <Redirect to="/login"/>
    }
    return (
        <>
            {
            datas && <div className={classes.wrapper}>
            <h1>Регистрация на сайте</h1>
                <Form schema={registrationSchema} onChange={handleChange} onSubmit={handleSubmit} loading={loading} buttonText="Регистрация"/>
             </div>
        }  
        </>
    )
}