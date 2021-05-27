import classes from "./navigation.module.css";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

type LogOutNavTypes = {
    menus: {name: string, link: string}[]
}

export const LogNav:FC<LogOutNavTypes> = ({menus}) => {
    const location = useLocation()
    return (
        <>
           {
               menus.map((e) => {
                   return <NavLink onClick={(event) => {
                    if (location.pathname === e.link){
                        event.preventDefault()
                    }}} to={e.link} key={`${e.name}_${e.link}`}><div className={classes.link}>{e.name}</div></NavLink>
               })
           }
        </>
    )
}