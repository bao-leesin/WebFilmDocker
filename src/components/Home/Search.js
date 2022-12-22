import React, { useEffect, useState } from 'react'
import './Home.scss';
import MovieListing from '../MovieListing/MovieListing';

import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import CarouselFilm from '../CarouselFilm/CarouselFilm';
import axios from 'axios';
import { getValue } from '@testing-library/user-event/dist/utils';
import imgNull from "../../images/film/imgNull.png"
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';



const Search = () => {
    console.log(process.env.REACT_APP_DB_HOST)
   
    const [dataSearch,setDataSearch] =useState([])
    const [image,setImage] =useState([])
    const bxh=[
        <div><span style={{color:"#DE5454",marginRight:"20px"}}>1</span>Lost Bullet</div>,
        <div><span style={{color:"#4B96E6",marginRight:"20px"}}>2</span>Avengers: Infinity War</div>,
        <div><span style={{color:"#FFCA28",marginRight:"20px"}}>3</span>You Should Have Left</div>,
        <div><span style={{color:"",marginRight:"20px"}}>4</span>Sonic the Hedgehog</div>,
        <div><span style={{color:"",marginRight:"20px"}}>5</span>Britt-Marie Was Here</div>,
        <div><span style={{color:"",marginRight:"20px"}}>6</span>The Invisible Man</div>,
        <div><span style={{color:"",marginRight:"20px"}}>7</span> Feel the Beat</div>,
        
        
       

    ]
    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`film/search/name/${localStorage.getItem("search")}`)
        .then(response=>{
            setDataSearch(response.data.map((val,index)=>val.idPhim))
            if(localStorage.getItem("search").length===0)
                setDataSearch(image??[])
        })
    },[localStorage.getItem("search")])
  
    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`user/show/listFilm`)
        .then(response=>{
            setImage(response.data)
        })
    },[])

    return (
        <div className='searchPage'>
            
            <h2>Dựa theo từ khóa "{localStorage.getItem("search")} " bạn nhập, Doom đã giúp bạn tìm thấy các kết quả tìm kiếm sau đây</h2>
            <Row>
            <Col span={18}>
                    <div>
                        
                        {image.map((val,index)=>{
                            if(dataSearch.includes(val.idPhim))
                                return (
                                
                                    <div className='card'>
                                        <Link to={`/movie/${val.idPhim}`}>
                                        <img src={
                                          process.env.REACT_APP_DB_HOST+"image/show/"+  val?.anhMota[1]??
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
                                                <Link to={`/movie/${val?.idPhim}`}>
                                                <div className='xemngay'>Xem ngay</div>
                                                </Link>
                                            </div>
                                             
                                             
                                    </div>
                                )
                        })}
                          
                    </div>
                    </Col>
                    <Col span={6}>
                    <div className='hairight'>
                        <div className='bxh'>Tim kiếm hot</div>
                        {bxh.map((value,index)=>
                            <div>{value}</div>
                        )}
                       
                    </div>
                    
                    
                </Col>
                </Row>
         
        </div>
    )
}

export default Search