import React, { useEffect } from 'react'
import './banner.css'
import requests from '../../api/requests'
import { useState } from 'react'
import axios from '../../api/axios'
import StarRatings from 'react-star-ratings'
import { Link } from 'react-router-dom'
const Banner = () => {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true)
            const response = await axios.get(requests.getUpComingMovies())
            setMovie(
                response.data.results[Math.ceil(Math.random()*(response.data.results.length-1))]
            )
            setLoading(false)

        }
       
        fetchMovie()
     
    },[])
    return (
        <>
            {
                loading 
            ?
                <div className="loading">
                    <div className="spin-icon"></div>
                </div>
            :
                <div className ="banners" style = {{
                    backgroundRepeat:"no-repeat",
                    backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                    backgroundPosition:"center",
                    backgroundSize:"cover"
                }}>
                    <div className="overlay"></div>
                    <div className="banners__contents">
                        <div className="banners__title">{movie?.original_title || movie?.title || movie?.original_name}</div>
                        <span className="banners__type">Drama | Action</span>

                        <span className="banners__description">
                            {movie?.overview}
                        </span>
                        <StarRatings
                            rating={movie?.vote_average/2 ||0}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            name='rating'
                            starDimension = "20px"
                        />
                        <span className ="banners__vote-average">{movie?.vote_average/2} </span> 
                        <span className = "banners__vote-count">({movie?.vote_count || 0})</span>
                         <div className="banners__buttons">
                            <Link to = {`/movie/${movie?.id}`} className = "banners__button"><i className='bx bxs-right-arrow' ></i>Play</Link>
                        </div>
                    </div>
                </div>
            }
        </>
        
    )
}

export default Banner
