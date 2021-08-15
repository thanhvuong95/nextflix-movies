import requests from '../api/requests'
import Banner from '../components/Banner/Banner'
import Row from '../components/Row/Row'
// import { lazy, Suspense } from 'react'
// const Banner = lazy(() => import('./Banner'))
// const Row  = lazy(() => import('./Row'))


const HomePage = () => {
    return (
            <div className = "home">
                {/* <Suspense 
                    fallback={
                        <div id="loading-spinner">
                            <div class="spin-icon"></div>
                        </div>}
                > */}
                      <Banner />
                    <Row 
                        title = "Trending Day" 
                        fetchUrl = {requests.getTrendingAllByDay()} 
                    
                    /> 

                    <Row 
                        title = "Movies Now Playing" 
                        fetchUrl = {requests.getMoviesNowPlaying()} 
                        largeSize = {true} 
                        
                    />
                    <Row 
                        title = "Top Rated Movies" 
                        fetchUrl = {requests.getMoviesTopRated()} 
                        largeSize = {true}   
                    />   
                    <Row 
                        title = "Movies Popular" 
                        fetchUrl = {requests.getMoviesPopular()} 
                        largeSize = {true}   
                    />  
                {/* </Suspense> */}
            </div> 
    )
}

export default HomePage
