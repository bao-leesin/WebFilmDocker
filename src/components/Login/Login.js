import React, { useEffect } from 'react'

import { Col, Modal, Row } from 'antd';
import facebook from "../../images/logo/login w/facebook.png"
import google from "../../images/logo/login w/google.png"
import key from "../../images/logo/login w/key.png"


const Login = (props) => {
    
    const changeTab=()=>{
        props.changeTab("loginKey")
    }

    const changeTab1=()=>{
        props.changeTab("register")
    }
    
    return (
       <>
            <h3>Đăng nhập</h3>
            <span>Bạn có thể quản lí tài khoản sau khi đăng nhập, có thể đồng bộ lịch sử thêm vào yêu thích yêu thích trên nhiều đầu cuối.</span>

            <div className='card' onClick={changeTab }>
                       <img src={key}></img>
                        <span style={{marginTop:"5px"}}>Đăng nhập bằng mật khẩu</span>
            </div>
         
            <div className='card'>
                       <img src={google}></img>
                        <span style={{marginTop:"5px"}}>Đăng nhập bằng gmail</span>
            </div>
            <div className='card'>
                       <img src={facebook}></img>
                        <span style={{marginTop:"5px"}}>Đăng nhập bằng facebook</span>
            </div>

            <div style={{marginTop:"20px"}}>Bạn chưa có tài khoản ? 
                <span style={{color:"green",fontWeight:"600",cursor:"pointer"}} onClick={changeTab1}> Đăng ký</span>
            </div>
            </>
    )
}

export default Login