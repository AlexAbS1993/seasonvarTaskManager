import classes from './wrapper.module.css';
import { FC } from 'react';


export const Wrapper:FC = ({children}) => {

    return (
        <div className={classes.wrapper}>   
            {children}
        </div>
    )
}