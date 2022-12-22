import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchAsyncMovieOrShowDetail } from '../../features/movies/movieSlice'
import { useSelector } from 'react-redux'
import { movieOrShowDetails } from '../../features/movies/movieSlice'
import './MovieDetails.scss';
import background_img from '../../images/background-film/image1.png';

import { removeMovieOrShow } from '../../features/movies/movieSlice'
import Spinner from '../Spinner/Spinner';
import InfoFilm from '../CarouselFilm/InfoFilm'
import { Button, Col, Row,Table,Tabs  } from 'antd'
import Tab_Ep from './Tab_Ep/Tab_Ep'
import Tab_Actor from './Tab_Actors/Tab_Actor'
import Tab_Comment from './Tab_Comment/Tab_Comment'
import axios from 'axios'



const MovieDetails = () => {
    const history = useHistory();
    const [dataFilm,setDataFilm] = useState({})
    const [img,setImg]=useState("")

    const { imdbID } = useParams();
    // later callling after useEffect
    const dispatch = useDispatch();
    const details = useSelector(movieOrShowDetails)
    console.log(details,"detail")
    // the above part

    useEffect(() => {
        
        console.log(imdbID,"param")
        dispatch(fetchAsyncMovieOrShowDetail(imdbID))
        return () => {
            dispatch(removeMovieOrShow())
        }
    }, [imdbID])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`film/show/${imdbID}`)
        .then(response=>{
            console.log(response.data,"datafilm1")
            setDataFilm(response.data)
            setImg(response.data.duongDanAnh[0]?.duongDanAnh)
        })
        window.scrollTo(0, 0)

    },[imdbID])

    const onChange = (key) => {
        console.log(key);
      };

      const items = [
        { label: 'Chọn tập', key: 'item-1', children: (<Tab_Ep data={dataFilm}/>) }, // remember to pass the key prop
        { label: 'Xem trailer', key: 'item-2', children: <div style={{textAlign:"center" ,fontSize:"20px"}}>Xem trailer
            <div>
      <video width="720" height="480" controls>
      <source src={`http://localhost:3003/apis/film/playTrailer/1`} type="video/mp4"></source>
      </video>
    </div>
    {/* ${dataFilm.idPhim} */}
        </div> },
        { label: 'Diễn viên', key: 'item-3', children: <Tab_Actor data={dataFilm?.dienVien}/> },
        { label: 'Bình luận', key: 'item-4', children: <Tab_Comment data={dataFilm?.idPhim}/> },
      ];

    const movie={
        id:imdbID,
        // background_image:dataFilm?.duongDanAnh,
        nameMovie:dataFilm?.tenPhim,
        starScore: dataFilm?.danhGiaPhim,
        category:dataFilm?.theLoai,
        describe: dataFilm?.moTa,
        year:dataFilm?.ngayChieu?.slice(0,4),
        quantityEp:10,
    }
      
      

    return (
        <>
        <div className='movie-section'>

             
                
                    <Row gutter={16}>
                        
                        <Col span={10}>
                            <div>
                            <div style={{
                                fontSize:"33px",
                                fontWeight:"600",
                                marginBottom:"5%",
                                marginLeft:"10%"

                            }}>{movie.nameMovie}</div>
                            <InfoFilm
                            data={dataFilm}
                            />
                           </div>
                        </Col>

                        
                        
                        <Col span={12}>
                         
                        <img style={{
                            width:"100% ",
                            float:"right",
                            marginTop: ""

                        }} 
                            src={process.env.REACT_APP_DB_HOST+"image/show/"+  dataFilm?.duongDanAnh?.anhDaiDien}></img>
                        </Col>
                    </Row>
            
                      
               
                
                 

        </div>
        <div className='tab-custom'><Tabs items={items} /> </div>
        </>
    )
}

export default MovieDetails