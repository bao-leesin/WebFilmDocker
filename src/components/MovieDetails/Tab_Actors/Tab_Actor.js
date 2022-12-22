import React, { useEffect, useState } from 'react';
import img from '../../../images/film/One Piece.png'
import {GithubOutlined} from '@ant-design/icons';
import './Tab_Actor.scss';
import { Col, Row } from 'antd';
import MovieCard from '../../MovieCard/MovieCard';
import axios from 'axios';

const Tab_Actor=(props)=>{

    const [actor,setActor] = useState([])
    const [filmOfActor,setFilmOfActor] = useState([])
    const [list,setList] = useState({})
    const listactors=[
        {image:img
            
        },
        {image:img
            
        },
        // {image:img
            
        // },
    ]

    useEffect(()=>{
       
        axios.get(process.env.REACT_APP_DB_HOST+`actor/show/`)
        .then(response=>{

            setActor(response.data)
       
        })
       

    },[])

    useEffect(()=>{
        actor.map((val)=>{
            axios.get(process.env.REACT_APP_DB_HOST+`actor/filter/show`+val.idDienVien)
            .then(res=>
                console.log(res)
            )
        })
    })


    return (
        <div className='tab_act'>
    {
    
    props.data.map((value,index)=>{
        return (
            <div className='actor' key={index}>
                <Row>
                    <Col span={8} className="anhdd"><GithubOutlined /></Col>
                    <Col span={16}>
                        <div className='name'> {value}</div>
                        <div className='dv'>Diễn viên</div>
                    </Col>
                </Row>
                <hr style={{
                    width:"100%", alignItems:"center",marginBottom:"10px",marginTop:"10px"
                    }}></hr>
                <Row>
                    <Col span={12} className='film'>
                        <MovieCard detail={true} image="actor"/>
                        </Col>
                    <Col span={12} className='film'>
                         <MovieCard detail={true} image={true}/>
                        </Col>
                   
                </Row>
            </div>
        )
    })}
</div>
    )
    
    
}
export default Tab_Actor