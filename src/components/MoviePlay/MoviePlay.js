import React, { useEffect, useState } from 'react'
import { Carousel,Button, Row, Col, Rate, Popover, notification } from 'antd';
import{
    ExportOutlined,
    StarOutlined,
    StarFilled,
    StarTwoTone
} from '@ant-design/icons';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';

import './MoviePlay.scss';
import MovieListing from '../MovieListing/MovieListing';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const MoviePlay =(props)=>{
    const [value, setValue] = useState(3);
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    const [dataFilm,setDataFilm] = useState({})
    const [dataFilmLiked,setDataFilmLiked] = useState([])

  
    const dispatch = useDispatch();
    const defaultMovie = "Dumb";
    const defaultShow = "game"
    useEffect(() => {
        console.log(props.match.params.id
            )
        dispatch(fetchAsyncMovies(defaultMovie))
        dispatch(fetchAsyncShows(defaultShow))
    }, [dispatch])
    // useEffect(() => {
    //     console.log(props.match.params.id
    //         )
    // }, [dispatch])
    const [like,setLike] = useState(!dataFilmLiked?false:
        dataFilmLiked.map((value,index)=>value.idPhim)
        .includes(props.match.params.id))

    useEffect(()=>{
        console.log(dataFilmLiked??[].map((value,index)=>value.idPhim)
        .includes(props.match.params.id),"test")
        axios.get(process.env.REACT_APP_DB_HOST+`user/show/liked/${localStorage.getItem("infoUser")}`)
        .then(response=>{
            setDataFilmLiked(response.data)
            setLike(response.data.map((value,index)=>value.idPhim) 
            .includes(Number(props.match.params.id)))

            
        })
        if(localStorage.getItem("infoUser")){
            axios.get(process.env.REACT_APP_DB_HOST+`watchfilm/get/${localStorage.getItem("infoUser")}`)
        .then(response=>{
            if(response.data.map((value,index)=>value.idPhim).includes(Number(props.match.params.id)))
                        {return }
                    else {
                        let data={
                            idPhim:props.match.params.id,
                            idKhachHang:localStorage.getItem("infoUser"),
                            idTap:0

                        }
                        axios.post(process.env.REACT_APP_DB_HOST+`watchfilm/add`,data)
                        .then(
                            response=>{
                                console.log(response,"res")
                            }
                        )
                    }

            
        })
        }
        
    
    },[])
    const handleLike =() =>{
        setLike(true)
        let data={
            idPhim: props.match.params.id,
            idNguoiDung: localStorage.getItem("infoUser")
        } 
        axios.post(process.env.REACT_APP_DB_HOST+`user/like`,data)
        .then(response=>{
            console.log(response,"success")


        })
    }

    const handleUnLike =() =>{
        console.log("unlike")
        setLike(false)
        let data={
            idPhim: props.match.params.id,
            idNguoiDung: localStorage.getItem("infoUser")
        } 
        axios.post(process.env.REACT_APP_DB_HOST+`user/unlike`,data)
        .then(response=>{
            console.log(response,"111")

        })
    }


    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`film/show/${props.match.params.id}`)
        .then(response=>{
            console.log(response,"111")
            setDataFilm(response.data)
        })

    },[])

    const rateStar =()=>{
        let data={
            idPhim: props.match.params.id,
            idKhachHang: localStorage.getItem("infoUser"),
            soSaoDanhGia:value
        }
        axios.post(process.env.REACT_APP_DB_HOST+`user/create/rate`,data)
        .then(response=>{
            notification.success({
                message:"Đã vote thành công"
            })
        })  
    }
    const bxh=[
        "1   Lost Bullet",
        "2   Avengers: Infinity War",
        "3   You Should Have Left",
        "4   Feel the Beat",
        "5   Sonic the Hedgehog",
        "6   Britt-Marie Was Here",
        "7   The Invisible Man",
        


    ]

   const array=[
        {ep:1},
        {ep:2},
        {ep:3},
        {ep:4},
        {ep:5},
        {ep:6},
        {ep:7},
        {ep:8},
        {ep:9},
        {ep:10},
    ]
    return (
        <>
            <div className='playfilm'>
                <Row>
                <Col span={18}>
               
                <div>
                    <video width="950" height="400" controls>
                    <source src={`http://localhost:3003/apis/film/playFilm/${props.match.params.id}
                    
                    `}></source>
                    </video>
                    </div>
    
                <div className='function'>
                    {!localStorage.getItem("infoUser")
                          ?<span>ko có</span>
                          : like
                            ?  <span onClick={handleUnLike} style={{color:"yellow"}}> <StarFilled /> Đã yêu thích</span>
                            :  <span onClick={handleLike} > <StarOutlined /> Thêm vào yêu thích</span>
                    }
                  
                    <span className='rotate'> <ExportOutlined/> Chia sẻ</span>
                </div>
                </Col>
                <Col span={6}>
                    <div className="right">
                       <span> {dataFilm.tenPhim}</span>
                    <div className='chontap'>Chọn tập</div>
                    <div className='wrapper'>
                        {array.map((element,index) => {
                            return <div className='box'>
                               <span>{element.ep}</span> 
                                </div>
                        })}
                        
                    </div>
                    </div>
                </Col>
            </Row>
            
            </div>
            
            

            <Row>
                <Col span={18}>
                <div className='info1'>
                <div className='title'>{dataFilm.tenPhim}</div>
                <div>
                    <span className='star'><StarFilled /></span>
                    <span className='starScore'> {dataFilm.danhGiaPhim} </span>
                    <span className='de'>(4.9 người đã đánh giá) </span>
                    
                    <Popover placement="bottomRight"  content={
                             <div className='star'>
                                
                                <span>
                            <Rate tooltips={desc} onChange={setValue} value={value} />
                            {/* {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''} */}
                            </span>
                            <div onClick={rateStar} style={{cursor:"pointer"}}>Gửi kết quả</div>
                            </div>
                        
                      
                    } 
                    trigger={localStorage.getItem("accessToken")?"click":""}
                    >
            <a>&ensp;Tôi muốn đánh giá</a>
             </Popover>

                    
                </div>
                <div className='describe'>
                        {dataFilm.moTa}
                </div>
            </div>
            
            <div className='haileft'>
                <hr></hr>
                <div className='title'>Đề xuất cho bạn</div>
                <MovieListing/>
            </div>
            
                </Col>
                <Col span={6}>
                    <div className='hairight'>
                        <div className='bxh'>Bảng xếp hạng</div>
                        {bxh.map((value,index)=>
                            <div>{value}</div>
                        )}
                       
                    </div>
                    
                    
                </Col>
            </Row>

            
        
        </>
    )
}

export default MoviePlay