import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from '../../api/axios'
import requests from '../../api/requests'
import './watch.css'
import { covertMilliseconds, timeSince } from '../../app/format';
import ReadMore from '../ReadMore/ReadMore';
import {selectUser} from '../../features/user/userSlice'
import {useSelector} from 'react-redux'
import {Prompt} from 'react-router-dom'
const Watch = () => {
    const {pathname} = useLocation()
    const pathSplit = pathname.split('/')
    const category = pathSplit[2]
    const id = pathSplit[3]
    const [videos, setVideos] = useState([])
    const [reviews, setReviews] = useState([])  
    const [comment, setComment] = useState('')
    const history  = useHistory()
    const user= useSelector(selectUser)
    const [loading, setLoading] = useState(false)
    const addReviews = () => {        
        if(!user) {
            const isLogin = window.confirm('You must be login. Do you want to go to the login page?')
            if(isLogin)
                history.push('/login')
        }
        else if(comment !== '') {
            const newReview = {
                id:user?.id,
                author: user?.email,
                updated_at:new Date(),
                content:comment
            }
            setReviews([...reviews,newReview])
            setComment('')

        }
    }
    const getVideos = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get(requests.getVideos(category, id))
            setVideos(res.data.results)
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
        }

    },[category, id])
    const getReviews =useCallback(async () => {
        const res = await axios.get(requests.getReviews(category, id))
        setReviews(res.data.results)
    },[category, id])

    useEffect(() => {
           getVideos()
           getReviews()
    }, [getVideos,getReviews])
    
    return (
        

            <div className = "watch">
           
                <div className="watch-videos">
    
                    {
                        loading
                        ?
                        <div className="loading">
                            <div className="spin-icon spin-icon--sm"></div>
                        </div>
                        :
                        videos.length ===0
                        ?
                            <span>Updating...</span>
                        :
                        <iframe  title="Video"  allowFullScreen="allowFullscreen" src={`https://www.youtube.com/embed/${videos[0]?.key}`} />
                    }
                </div>
                <span className = "watch-title">{videos[0]?.name}</span>
                
                <div className="watch-comments">
                    <span>Comments</span>
                    <div className="watch-comments__post">
                        <textarea value = {comment} onChange = {(e)=>setComment(e.target.value)} type="text" placeholder = "Write your comment...." className="watch-comments__input" />
                    
                        <button className="watch-comments__btn" onClick = {addReviews}>Post</button>                      
                    </div>
                    <ul className = "watch-comments__list">
                        {
                            reviews.sort((a,b) => covertMilliseconds(b?.updated_at) - covertMilliseconds(a?.updated_at)).map(item => (
                                <li key = {item?.updated_at}>
                                    <div className="watch-comments__item">                               
                                        <div className="watch-comments__top">
                                            <span className="watch-comments__name">{item?.author}</span>
                                            <span className = "watch-comments__date">
                                                About
                                                &nbsp;
    
                                                {
                                                    timeSince(covertMilliseconds(item?.updated_at))
                                                }
                                                    &nbsp;
                                                ago
                                            </span>
                                        </div>
                                        <div className="watch-comments__bottom">
                                            <span className="watch-comments__overview">
                                                <ReadMore>
                                                    {item?.content}
                                                </ReadMore>
                                                
                                            </span>
                                           
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
    
                    </ul>
                    
                </div>
            </div>
    )
}

export default Watch
