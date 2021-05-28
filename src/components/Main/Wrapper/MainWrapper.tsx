import classes from "./mainwrapper.module.css";
import { FC } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../Types/reduxTypes/reduxStoreTypes';
import { ErrorAndNot } from "../../../assets/components/ErrorAndNot/ErrorAndNot";
import {animated} from 'react-spring'


export const MainWrapper:FC<{springprops: any, type: "auth" | "inner"}> = ({children, springprops, type}) => {
    const userError = useSelector<RootState, string>(state => state.user.error)
    const userNotification = useSelector<RootState, string>(state => state.user.not)
    const taskError = useSelector<RootState, string>(state => state.task.error)
    const taskNotification = useSelector<RootState, string>(state => state.task.notification)
    return (
        <animated.div className={classes.wrapper} style={springprops}>
            <div className={`${type === "auth" ? `${classes.innerWrapper}`: `${classes.innerWrapperInner}`}`}>
            {
                userError ? <ErrorAndNot type="error" message={userError}/> : <></>
            }
            {
                userNotification ? <ErrorAndNot type="not" message={userNotification}/> : <></>
            }
            {
                taskError ? <ErrorAndNot type="error" message={taskError}/> : <></>
            }
            {
                taskNotification ? <ErrorAndNot type="not" message={taskNotification}/> : <></>
            }
                  {children}
            </div>
        </animated.div>
    )
}