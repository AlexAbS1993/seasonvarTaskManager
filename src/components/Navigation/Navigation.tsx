import classes from "./navigation.module.css";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, ThunkAppDispatch } from "../../Types/reduxTypes/reduxStoreTypes";
import { LogNav } from "./LogOutNav";
import { useLocation } from "react-router";
import { getTasksCountThunk } from "../../redux/countReducer";

const loginFields = [
    {link: "/home", name: "Информация"}, {link: "/new", name: "Новые задачи"}, {link: "/working", name: "В работе"}, 
    {link: "/reworking", name: "На доработке"}, {link: "/check", name: "На проверке"}]
const logOutFields = [{link: "/login", name: "Вход"}, {link: "/registration", name: "Регистрация"}]

export const Navigation:FC = ({children}) => {
    const login = useSelector<RootState, string>(state => state.user.login)
    const counts = useSelector<RootState, any>(state => state.count)
    const status = useSelector<RootState, "admin" | "user">(state => state.user.status)
    const location = useLocation()
    const dispatch:ThunkAppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasksCountThunk())
    }, [location.pathname])
    useEffect(() => {

    }, [])
    return (
        <>
        <nav className={classes.wrapper}>
            <div className={`${classes.navigation} ${login ? `${classes["navigation__wrapper-login"]}` : `${classes["navigation__wrapper-nonLogin"]}`}`} 
            style={{gridTemplateColumns: login ? `repeat(${loginFields.length}, 1fr)` : `repeat(${logOutFields.length}, 1fr)`}}>
                    {
                        login ? <LogNav menus={loginFields} counts={counts} status={status}/> : <LogNav menus={logOutFields}/>
                    }    
            </div>
        </nav> 
          {children}
        </>
    )
}