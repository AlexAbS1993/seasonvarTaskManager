import classes from "./login.module.css"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes"
import { Form } from "../../../assets/components/Form/Form"
import { loginisationThunk } from "../../../redux/userReducer"

const loginSchema = [
    {name: "login", placeholder: "Введите логин", label: "Логин:", type: "text", id:"loglogin"} as const, 
    {name: "password", placeholder: "Введите пароль", label: "Пароль:", type: "password", id:"logpassword"} as const
]

export type loginSchemaType = typeof loginSchema

export const Login:FC = () => {
    const [datas, setDatas] = useState<any>()
    const loading = useSelector<RootState, boolean>(state => state.user.loading)
    useEffect(() => {
        let initialDatas:any = {}
        loginSchema.forEach((e) => {
            initialDatas[e.name] = ""
        })
        setDatas(initialDatas)
    }, [setDatas])
    const dispatch = useDispatch<ThunkAppDispatch>()
    const handleSubmit = (e:any) => {
        e.preventDefault()
        dispatch(loginisationThunk(datas))
    }
    const handleChange = (field: string, value: string) => {
        setDatas({...datas, [field]: value})
    }
    return (
        <>
        {
            datas && <div className={classes.wrapper}>
            <h1>Войдите на сайт</h1>
            <Form schema={loginSchema} onChange={handleChange} onSubmit={handleSubmit} loading={loading} buttonText="Войти на сайт" datas={datas}/>
        </div>
        }       
        </>
    )
}