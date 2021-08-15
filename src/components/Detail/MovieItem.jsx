import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import requests from '../../api/requests'
import './movieItem.css'
import {FacebookShareButton} from 'react-share'
import StarRatings from 'react-star-ratings'
import { Swiper, SwiperSlide } from "swiper/react"
import Grid from '../Grid/Grid'
import MovieCard from '../MovieTVCard/MovieCard'
import "swiper/swiper.min.css";
import {useSelector, useDispatch} from 'react-redux'
import {addList, selectList, selectUser} from '../../features/user/userSlice'
import db from '../../firebase/firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMessage from '../Toast/ToastMessage'

const MovieItem = () => {
    const [loading, setLoading] =useState(false)
    const [error, setError] = useState(null)
    const url = window.location.href
    const {id} = useParams()
    const {pathname} = useLocation()
    const queryStr = pathname.toString().split('/')[1]
    const user = useSelector(selectUser)
    const list = useSelector(selectList)
    const [data, setData] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const watchNow = () => {
        history.push(`/watch/${queryStr}/${data?.id}`)
    }

    useEffect(()=> {
        const getData = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.get(requests.getById(id, queryStr))
                setData(res.data)
                setLoading(false)
            }
            catch(e) {
                setLoading(false)
                setError(e.message)
            }
        }
        getData()
    },[queryStr, id])

console.log(list);
    const production = data?.production_companies?.map(item => {
        return item.name
    })
    const checkExistData = (data, id) => {
        return data.some(item => item.id === id )
    }
    const addToList = (category, data) => {
        if(!user){
            const isLogin = window.confirm("You are not logged in. Do you want to go to the login page?")
            if(isLogin) {
                history.push('/login')
            }
        }
        else {
                // if(!user.email) return; //try check
                const item = {...data,category}
                const docRef = db.collection('favorite').doc(user.email)
                docRef
                .get()
                .then(doc => {
                  if(doc.exists && checkExistData(doc.data().list, item.id)) {
                      throw new Error("Item exits in your list!")
                  }
                  else if(doc.exists) {
                      docRef.set({
                          list:doc.data().list.concat(item)
                      })
                    
                  }
                  else {
                    docRef.set({
                      list:[item]
                    })
                  }
                  
                dispatch(addList(item))
                
                  toast.success(
                      <ToastMessage type = "error" message = "Added your list successfully!" />,
                      {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      }
                  )

                })
                .catch(e =>
                    toast.error(
                        <ToastMessage type = "error" message = {e.message} />,
                        {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    )
                )
        }
        
    }







    let content
    if(loading) {
        content = <div className="loading">
                    <div className="spin-icon spin-icon--sm"></div>
                </div>
    }
    else if(error) {
        content = <span>{error}</span>
    }
    else {
        content = (
        <>
            <div className="movie-item__bg" style = {{
                backgroundImage:`url("https://image.tmdb.org/t/p/original${data?.poster_path || data?.backdrop_path}")`,
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center",
                backgroundSize:"cover"
            }}>
                <div className="overlay"></div>
            </div>
                <div className="movie-item__wrap">
                    <div className="movie-item__img">
                        <img src={`https://image.tmdb.org/t/p/original${data?.backdrop_path || data?.poster_path}`} alt="" />
                    </div>
                    <div className="movie-item__contents">
                        <h3 className="movie-item__title">{data?.original_title || data?.title}</h3>
                        <div  className= "movie-item__genres">
                           {
                               data?.genres?.map(item => (
                                   <span className= "movie-item__genre" key = {item.id}>{item.name}</span>
                               ))
                           }
                        </div>
                        <span className="movie-item__descriptions">{data?.overview}</span>
                        <div className="movie-item__rating__wrap">
                            <StarRatings
                                rating={data?.vote_average/2 ||0}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name='rating'
                                starDimension = "20px"
                            />
                            <span className="movie-item__rating">{data?.vote_average}</span>
                            <span className="movie-item__rating">({data?.vote_count})</span>

                        </div>
                        
                        <div className="movie-item__production">
                            <span>Production: {production?.join(',')}</span>
                           
                        </div>
                        <div className="movie-item__date">
                            <span>Release date: {data?.release_date}</span>
                        </div>
                        <div className="movie-item__button">
                            <button className = "movie-item__btn movie-item__play" onClick = {watchNow}>
                                <i className='bx bx-play' ></i>
                                Play
                            </button>
                            <button className="movie-item__btn movie-item__add" onClick = {() => addToList(queryStr,data)}>
                                <i className='bx bx-list-ul'></i>
                                Add to list
                            </button>
                            <FacebookShareButton url = {url}>
                                <span className = "movie-item__btn">
                                <i className='bx bxs-share'></i>
                                    Share
                                </span>
                            </FacebookShareButton>
                        </div>
                    </div>
            </div> 
            {
                data?.credits?.cast.length
                ?
                <div className="movie-item__cast">
                    <div className="movie-item__cast-title">
                        <span>Cast</span>
                    </div>
                    
                    <Swiper
                     spaceBetween = {12}  
                     slidesPerView = {8} 
                     lazy ={true}
                     breakpoints={{
                        "320": {
                          "slidesPerView": 3,
                          "spaceBetween": 8
                        },
                        "480": {
                            "slidesPerView": 3,
                            "spaceBetween": 8
                          },
                        "768": {
                            "slidesPerView": 4,
                            "spaceBetween": 12
                        },
                        "1024": {
                          "slidesPerView": 5,
                          "spaceBetween": 12
                        }}}
                    >
                        {
                            data?.credits?.cast?.map(item => (
                                <SwiperSlide key = {item.id}>
                                    <div className= "movie-item__cast-img">
                                        <img  src={`https://image.tmdb.org/t/p/original${item?.profile_path || '/mI0Qo7VtgW5siCtQQqNPXIk0Ar6.jpg'}`} alt="" />
                                    </div>
                                    <span className = "movie-item__cast-name">{item?.name}</span>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                :
                        ''
            }
            <div className="movie-item__related">
                <div className="movie-item__cast-title">
                    <span>Related {queryStr}</span>
                </div>
                <Grid>
                    {
                        data?.recommendations?.results.length !== 0
                        ?
                        data?.recommendations?.results?.slice(0,10)?.map(item => (
                            <MovieCard key = {item.id} data = {item} />
                        ))
                        :
                        data?.similar?.results?.slice(0,10)?.map(item => (
                            <MovieCard key = {item.id} data = {item} />
                        ))
                    }
                </Grid>
            </div>
            <ToastContainer />
        </>
        )
    }
    return (

        <div className = "movie-item">
            {content}
        </div>
    )
}

export default MovieItem
