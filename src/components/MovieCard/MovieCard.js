import React, { useEffect, useState } from 'react'
import './MovieCard.scss';
import { Link } from 'react-router-dom';
import {StarFilled,StarOutlined } from '@ant-design/icons';
import img from '../../images/film/One Piece.png'
import axios from 'axios';
const MovieCard = ({ data,image },props) => {

    const [star,getStar] = useState(0)
    const [filmId,getFilmId] = useState({})
    const onStar=()=>{
        getStar(1)
    }
    const offStar=()=>{
        getStar(0)
    }

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`film/show/`+data?.idPhim)
        .then(response=>{
            getFilmId(response.data)
        })
    },[])

    return (
        <div className='card-item'>
            <Link to={`/movie/${data?.idPhim}`}>
                <div className="card-inner">
                    <div className="card-top">
                        <img src={image?img
                            :process.env.REACT_APP_DB_HOST+"image/show/"+
                            filmId?.duongDanAnh?.anhMota[1]
                            // data?.duongDanAnh
                            // data.Poster
                            
                        } alt={data?.Title} />
                        {/* {star===1?<StarFilled onClick={offStar}/>:
                        <StarOutlined onClick={onStar}/>} */}
                    </div>
                    {!props.detail&&<div className="card-bottom">
                        <div className="card-info">
                            <h3>{data?.tenPhim}</h3>
                            {/* <p>{data?.Year}</p> */}
                        </div>
                    </div>}
                </div>
            </Link>
        </div>
    )
}

export default MovieCard