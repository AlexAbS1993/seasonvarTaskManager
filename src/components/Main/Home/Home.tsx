import classes from "./home.module.css";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksCountThunk } from "../../../redux/countReducer";
import { RootState, ThunkAppDispatch } from "../../../Types/reduxTypes/reduxStoreTypes";
import { HomeFormWrapper } from "./HomeFormWrapper";

export const Home:FC = () => {
    const user = useSelector<RootState, string>(state =>  state.user.login)
    const status = useSelector<RootState, string>(state => state.user.status)
    const initialize = useSelector<RootState, boolean>(state => state.count.initialize)
    const newTask = useSelector<RootState, number>(state => state.count.new)
    const reworking = useSelector<RootState, number>(state => state.count.reworking)
    const working = useSelector<RootState, number>(state => state.count.working)
    const check = useSelector<RootState, number>(state => state.count.check)
    const dispatch: ThunkAppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasksCountThunk())
    }, [dispatch])
    return (
        <div>{
            initialize ? <><div> 
            <h2>{user} : {status}</h2> 
            {
                status === "admin" && <> 
                    <p>Новое в работе: {working}</p>
                    <p>Новое на проверке: {check}</p>
                </>
            }
            {
                status === "user" && <> 
                    <p>Новых заданий: {newTask}</p>
                    <p>Новое на доработке: {reworking}</p>
                </>
            }
            
            </div> 
            {
                status === "admin" && <div className={classes.formWrapper}><HomeFormWrapper /></div>
            }            
            </> : <></>
            }           
        </div>
    )
}