import React from 'react'
import { Switch, Route } from 'react-router'
import HomePage from '../../Container/HomePage'
import MoviePage from '../../Container/MoviePage'
import TVShowPage from '../../Container/TVShowPage'
import MovieItem from '../Detail/MovieItem'
import Watch from '../Watch/Watch'
import Nav from '../Navbar/Nav'
import Footer from '../../Container/Footer'
import Favorite from '../Favorite/Favorite'

const Routes = () => {
    return (
        <div className = "app">
            <Nav />
            <div className = "main container"> 
                        <Route path = '/' component = {HomePage} exact/>
                        <Route path = '/movie' component = {MoviePage} exact/>
                        <Route path = '/movie/:id' component = {MovieItem} exact />
                        <Route path = '/tv' component = {TVShowPage} exact/> 
                        <Route path = '/tv/:id' component = {MovieItem}/> 
                        <Route path = '/watch/:id' component ={Watch} /> 
                        <Route path = '/mylist' component ={Favorite} /> 
            </div>
            <Footer />

        </div>
    )
}

export default Routes
