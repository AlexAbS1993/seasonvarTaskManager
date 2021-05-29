import classes from "./navigation.module.css";
import { FC} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOutNavTypes } from "../../Types/navigationTypes/navTypes";



export const LogNav:FC<LogOutNavTypes> = ({menus, counts, status}) => {
    const location = useLocation()
    return (
        <>
           {
               !status && <> {
                menus.map((e) => {
                    return <NavLink onClick={(event) => {
                     if (location.pathname === e.link){
                         event.preventDefault()
                     }}} to={e.link} key={`${e.name}_${e.link}`}><div className={classes.link}>{e.name}</div></NavLink>
                })
               }
               </>
           }
           {
               status && <>
                            {
                                menus.map((e) => {
                                    return <NavLink onClick={(event) => {
                                     if (location.pathname === e.link){
                                         event.preventDefault()
                                     }}} to={e.link} key={`${e.name}_${e.link}`}><div className={classes.link}>{e.name}
                                     {
                                         (status === "admin" && (e.link === "/check" || "/working")) ? <>{
                                            counts[e.link.slice(1)] > 0 ? <div className={classes.counter}>
                                            {counts[e.link.slice(1)]}
                                       </div>  : <> </>
                                        }</> : <> </>
                                     }
                                     {
                                         (status === "user" && (e.link === "/new" || "/reworking")) ? <>{
                                            counts[e.link.slice(1)] > 0 ? <div className={classes.counter}>
                                            {counts[e.link.slice(1)]}
                                       </div>  : <> </>
                                        }</> : <> </>
                                     }
                                     </div> 
                                      </NavLink>
                                })
                            }
               </>
           }
        </>
    )
}