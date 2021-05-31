import { statuses } from './../../Types/apiTypes/apiCountType';
import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:5000/count"
})

export const countAPI = {
    getCountOfTasks: () => {
        return instance.get('/tasks', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    getCountOfComments: (status: statuses) => {
        return instance.get(`/comments/${status}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    },
    getAllTasksCount: () => {
        return instance.get('/getAllTaskCount', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    }
}