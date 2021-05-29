import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, schemaTypeSelect, schemaType } from "../../../assets/components/Form/Form"
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes"
import { createTaskThunk } from "../../../redux/tasksReducer"

const newTaskSchema: (schemaTypeSelect|schemaType)[] = [
    {name: "name", id: "taskname", placeholder:"Введите название", label:"Название задачи", type: "text"},
    {name: "priority", id: "taskpriority", placeholder:"Укажите приоритет", label:"Приоритет", type: "select", options: ["high", "low", "middle"], defaultValue: "middle"},
    {name: "discription", id: "taskdiscription", placeholder:"Введите описание задачи", label:"Описание", type: "text"},
    {name: "link", id: "tasklink", placeholder:"Ссылка", label:"Ссылка", type: "text"},
]


export const HomeFormWrapper:FC = () => {
    const loading = useSelector<RootState, boolean>(state => state.task.loading)
    const notification = useSelector<RootState, string>(state => state.task.notification)
    const [datas, setDatas] = useState<any>()
    const dispatch: ThunkAppDispatch = useDispatch()
    useEffect(() => {
        let initialDatas:any = {}
        newTaskSchema.forEach((e) => {
            if (e.type === "select"){
                initialDatas[e.name] = e.defaultValue
            }
            else {
                initialDatas[e.name] = ""
            }  
        })
        setDatas(initialDatas)
    }, [setDatas])
    useEffect(() => {
        if (notification){
            let initialDatas:any = {}
        newTaskSchema.forEach((e) => {
            if (e.type === "select"){
                initialDatas[e.name] = e.defaultValue
            }
            else {
                initialDatas[e.name] = ""
            }  
        })
        setDatas(initialDatas)
        }
    }, [notification])
    const onChange = (field: string, value: string) => {
        setDatas({
            ...datas,
            [field]: value
        })
    }
    const onSubmit = (e: any) => {
        e.preventDefault()
        dispatch(createTaskThunk(datas))
    }
    return (
        <>
        {
            datas && <Form schema={newTaskSchema} onChange={onChange} buttonText="Создать задачу" loading={loading} onSubmit={onSubmit} datas={datas}/>
        }  
        </>
    )
}