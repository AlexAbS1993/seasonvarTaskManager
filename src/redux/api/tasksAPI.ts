import { tasksThunkDataTypes } from './../../Types/reduxTypes/reduxTasksReducerTypes';
import axios from 'axios'
import { createTaskType } from '../../Types/apiTypes/apiTaskTypes';

const instance = axios.create({
    baseURL: "http://localhost:5000/tasks"
})

const adresses = {
    new: "/getNew",
    check: "/getCheck",
    working: "/getWorking",
    reworking: "/getReworking",
    ready: "/getReady"
}

export const taskAPI = {
    createTask: (data: createTaskType) => {
        return instance.post("/create", data, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    getTasks: (value: tasksThunkDataTypes) => {
        return instance.get(`${adresses[value]}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
    },
    deleteTask: (id: string) => {
        return instance.delete(`/delete/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    changeStatus: (status: tasksThunkDataTypes, _id: string) => {
        return instance.post("/change", {_id, status}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    checkNewTasks: (_id: string) => {
        return instance.post("/taskCheck", {_id}, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    }
}