import React, { useEffect } from 'react'

import MovieListing from '../MovieListing/MovieListing';

import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import CarouselFilm from '../CarouselFilm/CarouselFilm';
import axios from 'axios';
import { getFilmShow } from '../../features/movies/allReduce';




const Home = () => {
    const dispatch = useDispatch();
    const defaultMovie = "Dumb";
    const defaultShow = "game";
    const dataHomePage =()=> axios.get(process.env.REACT_APP_DB_HOST+"homePage")
        .then(response=>{
            console.log(response,"111")
        })
    useEffect(() => {
        dispatch(fetchAsyncMovies(defaultMovie))
        dispatch(fetchAsyncShows(defaultShow))
        dispatch(getFilmShow())
        dataHomePage()
    }, [])

    return (
        <div className='home'>
            <CarouselFilm/>
            <div className='banner-img'>
                
                <MovieListing />
            </div>
        </div>
    )
}

export default Home