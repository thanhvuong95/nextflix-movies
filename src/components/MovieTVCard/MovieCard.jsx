import React from 'react'
import {useHistory} from 'react-router-dom'
import './movieCard.css'
import img1 from '../../assets/images/transformer.jpg'
import img2 from '../../assets/images/blood-shot.jpg'
import img3 from '../../assets/images/bat-man.jpg'
import img4 from '../../assets/images/call.jpg'
import img5 from '../../assets/images/captain-marvel.png'
import img6 from '../../assets/images/end-game.jpg'
import img7 from '../../assets/images/hunter-killer.jpg'
import img8 from '../../assets/images/insidious.jpg'
import img9 from '../../assets/images/resident-evil.jpg'
const dataImg = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

const MovieCard = (props) => {
    const item = props.data
    const path = props.path
    const image = (item?.backdrop_path || item?.poster_path) 
    ? 
    `url("https://image.tmdb.org/t/p/original${item?.backdrop_path || item?.poster_path}")`
    :
    `url("${dataImg[Math.floor(Math.random()*dataImg.length-1)]}")`
  
    const history = useHistory()
    const changeRoute = () => {
        if(path) {
            history.push(`${path}/${item?.id}`)
        }
        else
        {
            history.push(`${item?.id}`)
            window.scrollTo(0,0)
        }
    }
    const getYear = (datetime) => {
        return datetime?.split('-')[0]
    }
    return (
        <div className = "movie-card">
            <div onClick = {changeRoute} className = "movie-card__wrap-img">
                <div 
                    className="movie-card__img"
                    style = {{
                        // backgroundImage :`url("https://image.tmdb.org/t/p/original${item?.backdrop_path || item?.poster_path}")`,
                        backgroundImage:image,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
          
                    }}
                >
                </div>
             
               
            </div>
                <div className="movie-card__contents">
                        <h4 className="movie-card__name">
                            {item?.original_title || item?.title || item?.name || item?.original_name}
                        </h4>
                        <div className="movie-card__rating">
                            <div className="movie-card__star">
                                <i className='bx bx-star' ></i>
                                <span>{item?.vote_average}</span>
                            </div>
                            <span className = "movie-card__hd">HD</span>
                        </div>
                        <div className="movie-card__date">
                            <i className='bx bx-calendar-alt'></i>
                            {getYear(item?.release_date) || getYear(item?.first_air_date)}
                        </div>
                        
                </div>
        </div>
            
    )
}

export default MovieCard    
