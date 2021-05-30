import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:5000/tasks"
})

export const commentaryAPI = {
    createCommentarty: (_id: string, commentary: string) => {
        return instance.post("/commentary/create", {_id, commentary}, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
    },
    checkCommentary: (_id: string) => {
        return instance.post("/commentary/check", {_id}, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
    },
    getCommentary: (_id: string) => {
        return instance.get(`/getComment/${_id}`, {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
    }
}