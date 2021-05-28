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
    getCountOfComments: (_id: string) => {
        return instance.get(`/comments/${_id}`)
    }
}