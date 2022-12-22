import React, { useEffect, useState } from 'react'

import MovieListing from '../MovieListing/MovieListing';
import './Discovery.scss';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import CarouselFilm from '../CarouselFilm/CarouselFilm';
import axios from 'axios';
import imgNull from "../../images/film/imgNull.png"
import { Link } from 'react-router-dom';



const Random = () => {
    const [choose,setChoose] =useState("")
    const [genre,setGenre] = useState([])
    const [film,setFilm] =useState([])
    const [filmFilt,setFilmFilt] =useState([])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+"genre/show")
        .then(response=>{
            console.log(response,"111")
            setGenre(response.data.map((val)=>val))
        })

        axios.get(process.env.REACT_APP_DB_HOST+"user/show/listFilm")
        .then(response=>{
            console.log(response,"111")
            setFilm(response.data)
        })
    },[])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`genre/filter/${choose}`)
        .then(response=>{
            console.log(response,"111")
            setFilmFilt(response.data.map((val)=>val?.idPhim))
            console.log(filmFilt,"ss")
        })

        
    },[choose])

    const handleChoose =(val)=>{
        console.log(val,"11")
        setChoose(val)
    }

    const handleRandom =()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`genre/filter/${choose}`)
        .then(response=>{
            console.log(response,"111")
            setFilmFilt(response.data.map((val)=>val?.idPhim))
            console.log(filmFilt,"ss")
        })

    }

    return (
        <div className='discover'>
            <div className='flex'>
           {
            genre.map((val,index)=>
            <div className={val.idTheLoai===choose?"btnGenre-active":'btnGenre'}
                onClick={()=>handleChoose(val.idTheLoai)}>{val.tenTheLoai}</div>
            )
           }
           </div>

            <div className='content'>
           {film.filter((val1)=>filmFilt.includes(val1?.idPhim)).map((val,index)=>{
            return  <div className='card'>
            <Link to={`/movie/${val.idPhim}`}>
            <img src={
                process.env.REACT_APP_DB_HOST+"image/show/"+
                val?.anhMota[1]??
            imgNull}
                 alt={index} 
                 height={250}
                 width={170}
                 ></img>
                 </Link>
                 <div className='info'>
                 <Link to={`/movie/${val?.idPhim}`}>
                    <div className='title'>{val.tenPhim}</div>
                    </Link>
                    <div>Năm: {val.ngayChieu?.slice(0,4)}</div>
                    <div>Đạo diễn :</div>
                    {/* <div>Diễn viên : {val.dienVien[0]?.tenDienVien}, {val.dienVien[1]?.tenDienVien}</div> */}
                    <Link to={`/movie/play/${val?.idPhim}`}>
                    <div className='xemngay'>Xem ngay</div>
                    </Link>
                </div>
                 
                 
        </div>
           })}
           </div>
        </div>
    )
}

export default Random