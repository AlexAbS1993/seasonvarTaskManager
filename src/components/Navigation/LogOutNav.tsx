import classes from "./navigation.module.css";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOutNavTypes } from "../../Types/navigationTypes/navTypes";



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