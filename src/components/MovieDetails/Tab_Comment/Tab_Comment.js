import React, { useEffect, useState } from 'react';
import img from '../../../images/film/One Piece.png'
import {GithubOutlined} from '@ant-design/icons';
import './Tab_Comment.scss';
import { Button, Col, Input, Row } from 'antd';
import Comment1 from './Comment1';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';

const Tab_Comment=(props)=>{

    const [listComment,setListComment] =useState([])
    const [listUser,setListUser] = useState([])
    const [postComment,setPostComment] = useState("")
    const onChange = (e) => {
        console.log('Change:', e.target.value);
        setPostComment(e.target.value)
      };
    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`comment/show/${props.data}`)
        .then(response=>{
            console.log(response,"comment")
            setListComment(response.data)
        })


    },[postComment])

    const handlePost =()=>{
        let data={
            idNguoiDung:localStorage.getItem("infoUser"),
            idPhim:props.data,
            binhLuan:postComment,
        }
        // setPostComment("")

        axios.post(process.env.REACT_APP_DB_HOST+"comment/create", data)   
            .then(response=>
                console.log("tt"),
                setPostComment("")
                
            )
            
    }

    return (
       <div className='tab_comment'>
        <div className='bl'>Bình luận <span className='bl1'></span></div>
        <hr style={{
         width:"100%", alignItems:"center",marginBottom:"10px",marginTop:"10px"
                    }}></hr>
        <TextArea className='input_1' 
                rows={4}
                placeholder='Viết bình luận' 
                onChange={onChange}></TextArea>
        
        <div className='but' onClick={handlePost} disabled={!localStorage.getItem("infoUser")}>Gửi</div>
        

        <hr style={{
         width:"100%", alignItems:"center",marginBottom:"10px",marginTop:"10px"
                    }}></hr>

        <div>
            {listComment.map((val,index)=>
                <Comment1 data={val} key={index}/>
            )}
        </div>
        
        
        
       </div>
    )
    
    
}
export default Tab_Comment