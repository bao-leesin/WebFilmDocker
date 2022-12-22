import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.scss';
import { settings } from '../../common/setting.js';
import {
    LoadingOutlined
  } from '@ant-design/icons';
import Slider from "react-slick";
import axios from 'axios';
import { getAllMovies1, getFilmShow } from '../../features/movies/allReduce';

const MovieListing = () => {
 const dispatch = useDispatch();
    const [dataHome,setDataHome] =useState([])
    

    useEffect(()=>{
        // dispatch(getFilmShow())
        axios.get(process.env.REACT_APP_DB_HOST+"homePage")
        .then(response=>{
            console.log(response,"")
            setDataHome(response.data)
            console.log(movies,"tes")
            console.log(movie,"all_test")
        })
    },[])

    const movie=useSelector(getAllMovies1)
    // for movies
    const movies = useSelector(getAllMovies)

    let renderMovies = movies.Response;
    // for shows
    const shows = useSelector(getAllShows)
    console.log(shows,"show")
    console.log(movie,"movie")
    let renderShows = shows.Response;

    return (
        <div className='movie-wrapper'>
            <div className="movie-list">
                <h2>Phim Hay</h2>

                <div className='movie-container'>
                    <Slider {...settings}>
                    {
                        
                            
                        // dataHome["phimHay"]
                  movie.length?
                        movie.map((movie, index) => 
                            < MovieCard key={index} data={movie}/>
                          
                        ):<div><LoadingOutlined /></div>
                    }
                    </Slider>
                

            </div>
            </div>
            <div className="movie-list">
                <h2>Phim Hot</h2>

                <div className='movie-container'>
                    <Slider {...settings}>
                        {dataHome["phimHot"]?.map((movie, index) => {
                            return < MovieCard key={index} data={movie} />
                        }) }
                    </Slider>
                </div>

            </div>
            <div className="movie-list">
                <h2>Phim Mới</h2>

                <div className='movie-container'>
                    <Slider {...settings}>
                        { dataHome["phimMoi"]?.map((movie, index) => {
                            return < MovieCard key={index} data={movie} />
                        }) }
                    </Slider>
                </div>

            </div>
            <div className="movie-list">
                <h2>Phim Lẻ</h2>

                <div className='movie-container'>
                    <Slider {...settings}>
                        { dataHome["phimMoi"]?.map((movie, index) => {
                            return < MovieCard key={index} data={movie} />
                        }) }
                    </Slider>
                </div>

            </div>
            {/* <div className="movie-list">
                <h2>Shows</h2>
                <div className='movie-container'>
                    <Slider {...settings}>
                        {renderShows === "True" ? shows.Search.map((show, index) => {
                            return < MovieCard key={index} data={show} />
                        }) : <div className='movies-error' ><h2>{movies.Error}</h2></div>}
                    </Slider>
                </div>
            </div> */}
        </div>
    )
}

export default MovieListing