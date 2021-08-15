import axios from '../../api/axios'
import React, { useEffect, useState} from 'react'
import StarRatings from 'react-star-ratings'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Autoplay, Lazy} from 'swiper/core';
  
import "swiper/swiper.min.css";
import "swiper/components/lazy/lazy.min.css";
import './row.css'
import { Link } from 'react-router-dom';

// install Swiper modules
SwiperCore.use([Lazy,Autoplay]);

const Row = ({title, fetchUrl, largeSize}) => {    
    const slidePerView = largeSize ? {default:4, tablet:2, mobile:1} : {default:6, tablet:4, mobile:2}
    const autoPlay = largeSize ? '' : {"delay": 2500,"disableOnInteraction": false}
    const loop = largeSize ? false : true
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {    
        const fetchMovie = async () => {
            setLoading(true)
            const response = await axios.get(fetchUrl)
            setMovie(prevState => {
                return response.data.results
            })
            setLoading(false)
        }
        fetchMovie()
    },[setMovie,setLoading,fetchUrl])
    return (
        <div className = "row">

            <div className="row__title">
                {title}
            </div>
            {
                loading
            ?
                <div className="loading">
                    <div className="spin-icon spin-icon--sm"></div>
                </div>
            :
             <Swiper className="row__movies" 
                autoplay={autoPlay}
                loop={loop}
                lazy ={true}
                breakpoints={{
                    "320": {
                      "slidesPerView": slidePerView.mobile,
                      "spaceBetween": 8
                    },
                    "1024": {
                      "slidesPerView": slidePerView.tablet,
                      "spaceBetween": 12
                    },
                    "1200":{
                        "slidesPerView": slidePerView.default,
                        "spaceBetween": 12
                      }
                }
                    
                }
             >
                {
                    movie.map(item => (
                        
                        <SwiperSlide key = {item.id} >
                            <Link to = {`/movie/${item.id}`} >
                            <div className={`row__movie ${largeSize && 'row__movie--large'}`}>
                                <img className = "swiper-lazy" data-src={`https://image.tmdb.org/t/p/original${item?.backdrop_path || item?.poster_path || '/mI0Qo7VtgW5siCtQQqNPXIk0Ar6.jpg'}`} alt="" />
                                <div className="overlay row__overlay"></div>
                               <div className="row__movie__contents">
                                    <h4 className="row__movie__name">{item?.title || item?.original_title || item?.original_name}</h4>
                                    <span className="row__movie__description">{item?.overview}</span>
                                    <StarRatings
                                        rating={item?.vote_average/2 ||0}
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension = "10px"
                                    />
                                    <span className="row__movie__vote">({item?.vote_average})</span>
                                </div>

                            </div>
                            </Link>
                        </SwiperSlide>
                        
                    ))
                }
            </Swiper> 
                
            }
        </div>
    )
}

export default Row
