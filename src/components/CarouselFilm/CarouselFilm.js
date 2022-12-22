import React, { useEffect, useState } from 'react'
import './CarouselFilm.scss';

import { Carousel,Button, Row, Col } from 'antd';
import background_img from '../../images/background-film/image1.png';
import favourite from'../../images/logo/favourite.png'
import play from'../../images/logo/play.png'
import {ArrowRightOutlined,
        ArrowLeftOutlined,
        LeftOutlined,
        RightOutlined,
        PlayCircleFilled,
        StarFilled,
      } from '@ant-design/icons';
import InfoFilm from './InfoFilm';
import {useMutation, useQuery} from "react-query";
import axios from 'axios';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



const CarouselFilm = () => {

  const [dataFilm,setDataFilm] = useState([])
  const [data1,setData] = useState([])
  

  const contentStyle = {
    // height: '80%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }

 async function loadCarouse(){
  const res = await axios.get(process.env.REACT_APP_DB_HOST+`homePage`)
  console.log(res.data,"query")
  return res
 }


  const {data:dataCarouse,isLoading} = useQuery(["dataCarouse"],loadCarouse)

  useEffect(()=>{
    console.log(dataCarouse,"list")
    axios.get(process.env.REACT_APP_DB_HOST+`homePage`)
          .then(response=>{
             
              setDataFilm(response.data)     
              
          })

          axios.get(process.env.REACT_APP_DB_HOST+`film/show`)
          .then(response=>{
             
              setData(response.data)     
              
          })
  },[])
  


    return (
      <Carousel arrows 
      className='carousel-custom'
        // className='arrow1'
        // afterChange={onChange} arrows
        // nextArrow={<ArrowRightOutlined/>} 
        // prevArrow={<ArrowLeftOutlined/>}
        >
      
      {isLoading
      ?<div>Đang load</div>
      : 
      !dataCarouse
      ?<div>error;</div>
      :
      dataCarouse.data["phimHay"]?.map((value,index)=>{
        console.log(data1.find((val)=>val.idPhim===value.idPhim),"gggg")
        return (
            <div key={index}>
              <img src={ process.env.REACT_APP_DB_HOST+"image/show/"+ value?.duongDanAnh} 
              style={{
                objectFit:"cover",
                position:"",
                height:"700px",
                width:"100%",

           }}>

            
           </img>
           <div style={{
            position: "relative",
                right: "-60px",
                top:"-280px"}}>
           <InfoFilm
            data={data1.find((val)=>val.idPhim===value.idPhim)}
           />
           </div>
           
           {/* <div className='info' style={{position:"relative",float:"left",right:"-50px",top:"-280px"}}>
              <div>
              <span className='text'><StarFilled /> {value.starScore}</span>
              <span className='mg-1'>|</span>
              <span className='mg'>{value.year}</span>
              <span className='mg-1'>|</span>
              <span className='mg'>{value.quantityEp} Tập</span>
              </div>
            <div>
              {value.category.map((val,index)=>{
                return <Button className='Button-cate'>
                  {val}
                </Button>
              })}
          
            </div>
            <div className='describe'>
                {value.describe}
            </div>
            <div>
        
          <span className='img' onClick={{}}><img src={play} ></img></span>

           <span className='img' onClick={{}}><img src={favourite} ></img></span>
           </div>
          
            
            
          
           </div> */}
            </div>
        )
      })}
      
     
    </Carousel>
       
    )
}

export default CarouselFilm


    
