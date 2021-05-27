import classes from "./mainwrapper.module.css";
import { FC } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ErrorAndNot } from "../../../assets/components/ErrorAndNot/ErrorAndNot";
import {animated} from 'react-spring'


export const MainWrapper:FC<{springprops: any}> = ({children, springprops}) => {
    const userError = useSelector<RootState, string>(state => state.user.error)
    const userNotification = useSelector<RootState, string>(state => state.user.not)
    return (
        <animated.div className={classes.wrapper} style={springprops}>
            <div className={classes.innerWrapper}>
            {
                userError ? <ErrorAndNot type="error" message={userError}/> : <></>
            }
            {
                userNotification ? <ErrorAndNot type="not" message={userNotification}/> : <></>
            }
                {children}
            </div>
        </animated.div>
    )
}