import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, schemaType } from "../../../../../assets/components/Form/Form";
import { createCommentThunk } from "../../../../../redux/tasksReducer";
import { RootState, ThunkAppDispatch } from "../../../../../Types/reduxTypes/reduxStoreTypes";
import { hidePartTypes } from "../../../../../Types/TasksTypes/hidePartTypes";
import classes from './hidepart.module.css'

const commentSchema:schemaType[] = [
    {name: "commentary", id:"comment", label:"Ваш комментарий: ", placeholder: "Введите комментарий", type:"text"}
]

export const HidePart:FC<hidePartTypes> = ({discription, link, _id, status, commentary, newCommentaryCount}) => {
    const loading = useSelector<RootState, boolean>(state => state.task.loading)
    const [datas, setDatas] = useState({
        commentary: ""
    })
    const dispatch:ThunkAppDispatch = useDispatch()
    const commentSubmitHandler = (e: any) => {
        e.preventDefault()
        dispatch(createCommentThunk({_id:_id, commentary: datas.commentary}, status))
        setDatas({
            commentary: ""
        })
    }
    const commentChangeHandler = (field: string, value: string) => {
        setDatas({
            commentary: value
        })
    }
    return (
        <>
            <div className={classes.addedDiscriptionInfo}>
                                {discription}
                            </div>
                            <div className={classes.addedLinkInfo}>Ссылка: <a href={link} target="_blank">{link}</a></div>
                            <div className={classes.commentField}>
                                <Form schema={commentSchema} 
                                buttonText="Комментировать" 
                                onChange={commentChangeHandler}
                                 onSubmit={commentSubmitHandler} 
                                datas={datas} 
                                loading={loading}/>
                            </div>
                            <div className={classes.commentaryList}>
                                {
                                    commentary.map((comment, index) => {
                                        return <div className={`${classes.oneComment} ${index < newCommentaryCount ? classes.newComment : classes.oldComment}`} key={comment._id}> 
                                            <div> {comment.text} </div>
                                            <div> {comment.author.login} </div>
                                        </div>
                                    })
                                }
                            </div>
        </>
    )
}