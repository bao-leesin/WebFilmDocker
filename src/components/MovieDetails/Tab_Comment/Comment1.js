import React, { createElement, useEffect, useState } from 'react';
import img from '../../../images/logo/user.png'
import {GithubOutlined} from '@ant-design/icons';
import './Tab_Comment.scss';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip ,Col,Row} from 'antd';
import axios from 'axios';


const Comment1=(props)=>{

    const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
    const [listUser,setListUser] = useState([])
    useEffect(()=>{
      
        axios.get(process.env.REACT_APP_DB_HOST+`user/show`)
        .then(response=>{
            console.log(response,"user")
            setListUser(response.data)
        })


    },[])



  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Trả lời</span>,
  ];

    return (
       <div className='comment'>
        <Comment
        actions={actions}
        author={<a>
          {/* {
          listUser.find((val,index)=>
          val.idNguoiDung === props.data.idKhachHang
          )?.tenDayDu

         } */}
         {props.data.tenDayDu??"Ẩn Danh"}
         </a>}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
        content={
            <p>
              {props.data.binhLuan}
            </p>
        }
        // datetime={
        //     <Tooltip title="2016-11-22 11:22:33">

        //     <div>{props.data.ngayDangBinhLuan?.slice(0,10)}</div>
        //     </Tooltip>
        // }
        />
        
       </div>
    )
    
    
}
export default Comment1