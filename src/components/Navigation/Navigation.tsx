import classes from "./navigation.module.css";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LogNav } from "./LogOutNav";

const loginFields = [
    {link: "/home", name: "Информация"}, {link: "/new", name: "Новые задачи"}, {link: "/working", name: "В работе"}, 
    {link: "/reworking", name: "На доработке"}, {link: "/check", name: "На проверке"}]
const logOutFields = [{link: "/login", name: "Вход"}, {link: "/registration", name: "Регистрация"}]

export const Navigation:FC = ({children}) => {
    const login = useSelector<RootState, string>(state => state.user.login)
    return (
        <>
        <nav className={classes.wrapper}>
            <div className={`${classes.navigation} ${login ? `${classes["navigation__wrapper-login"]}` : `${classes["navigation__wrapper-nonLogin"]}`}`} 
            style={{gridTemplateColumns: login ? `repeat(${loginFields.length}, 1fr)` : `repeat(${logOutFields.length}, 1fr)`}}>
                    {
                        login ? <LogNav menus={loginFields}/> : <LogNav menus={logOutFields}/>
                    }    
            </div>
        </nav> 
        <div>
          {children}
        </div>
        </>
    )
}