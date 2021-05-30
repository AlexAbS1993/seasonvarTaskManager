import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, schemaType } from "../../../../../assets/components/Form/Form";
import { checkCommentariesThunk, createCommentThunk, getCommentsThunk } from "../../../../../redux/tasksReducer";
import { RootState, ThunkAppDispatch } from "../../../../../Types/reduxTypes/reduxStoreTypes";
import { hidePartTypes } from "../../../../../Types/TasksTypes/hidePartTypes";
import classes from './hidepart.module.css'

const commentSchema:schemaType[] = [
    {name: "commentary", id:"comment", label:"Ваш комментарий: ", placeholder: "Введите комментарий", type:"text"}
]

export const HidePart:FC<hidePartTypes> = ({discription, link, _id, status, newCommentaryCount}) => {
    const loading = useSelector<RootState, boolean>(state => state.task.loading)
    const commentary = useSelector<RootState, any[]>(state => state.task.commentaries[_id]?.commentary)
    const dispatch:ThunkAppDispatch = useDispatch()
    useEffect(() => {
        if(!commentary){
            dispatch(getCommentsThunk(_id))
        }
        if (newCommentaryCount > 0 && commentary){
            const commentaryIDarray:any[] = []
            for (let i = 0; i < commentary.length; i++){
                commentaryIDarray.push(commentary[i]._id)
            }
           setTimeout(() => {
            dispatch(checkCommentariesThunk(newCommentaryCount, commentaryIDarray, status))
           }, 1000)  
        }
    }, [commentary])
    const [datas, setDatas] = useState({
        commentary: ""
    })
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
                                    commentary ? commentary.map((comment, index) => {
                                        return <div className={`${classes.oneComment} ${index < newCommentaryCount ? classes.newComment : classes.oldComment}`} key={comment._id}> 
                                            <div> {comment.text} </div>
                                            <div> {comment.author.login} </div>
                                        </div>
                                    })  : <>Загрузка</>
                                }
                            </div>
        </>
    )
}