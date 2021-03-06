import axios from 'axios'
import { dataType } from '../../Types/apiTypes/apiUserTypes'

const instance = axios.create({
    baseURL: "http://localhost:5000/auth"
})



export const userAPI = {
    login: (data:dataType) => {
        return instance.post('/login', {
            login: data.login,
            password: data.password
        })
    },
    registration: (data: dataType & {invite: string}) => {
        return instance.post('/registration', {
            login: data.login,
            password: data.password,
            invite: data.invite
        })
    },
    getLogin: () => {
        return instance.get('/login', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
    }
}