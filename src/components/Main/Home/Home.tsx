import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Types/reduxTypes/reduxStoreTypes";
import { HomeFormWrapper } from "./HomeFormWrapper";
import { HomeInformatiom } from "./HomeInformationBlock";

export const Home:FC = () => {
    const user = useSelector<RootState, string>(state =>  state.user.login)
    const status = useSelector<RootState, "admin" | "user">(state => state.user.status)
 

    return (
        <div><div> 
            <h2>{user} : {status}</h2> 
            <HomeInformatiom status={status}/>
            </div> 
            {
                status === "admin" && <HomeFormWrapper />
            }                     
        </div>
    )
}