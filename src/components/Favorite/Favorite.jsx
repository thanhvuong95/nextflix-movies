import React,{useState, useEffect, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {selectList} from '../../features/user/userSlice'
import Grid from '../Grid/Grid'
import axios from '../../api/axios'
import request from '../../api/requests'
import { Link } from 'react-router-dom'
import './favorite.css'
const Favorite = () => {
    const list = useSelector(selectList)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <div className = "favorite"> 
            <h3 className="favorite__heading">Your favorite collection</h3>
            {
                loading
                ?
                <div className="loading">
                    <div className="spin-icon"></div>
                </div>
                :
                list.length
                ?
                <div className = "favorite__container">
                    {
                        list.map(item => (
                            <Link to = {`/${item.category}/${item.id}`} className = "favorite__item">
                                <div 
                                    className="favorite__img"
                                    style = {{
                                    backgroundImage :`url("https://image.tmdb.org/t/p/original${item?.backdrop_path || item?.poster_path}")`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
            
                                    }}
                                >
                                </div>
                                <div className="overlay"></div>
                                <h4 className="favorite__title"> {item?.original_title || item?.title || item?.name || item?.original_name}</h4>
                            </Link>
                        ))
                    }
                </div>
                :
                <span>You have not added any movies to this list.</span>

            
        }
        </div>
    )
}

export default Favorite
