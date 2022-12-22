import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { Button, Input } from 'antd';
import {LeftOutlined } from '@ant-design/icons';

import {} from 'antd';

const InputOTP = (props) => {
    
    const [otp,setOtp] =useState("")
    
    const changeTab1=()=>{
        props.changeTab("forgotPass")
    }

    const changeTab2=()=>{
        props.changeTab("loginKey")
    }
    const changeTab3=()=>{
        props.changeTab("newPass")
    }
    return (
       <>

            <LeftOutlined onClick={changeTab1}className="back"/>

            <div style={{marginTop:"30px" ,marginBottom:"20px"}}>
            <span className='title'>Nhập mã OTP</span>
            </div>
            <span>Chúng tôi đã gửi mã xác thực tới Email của bạn. Vui lòng nhập mã xuống dưới</span>

            <div style={{marginLeft:"60px",marginTop:"20px",marginBottom:"20px  "}}>
           <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                separator={<div ></div>}
                className='otp'
            />    
            </div>

            <div>Chưa nhận được mã? &nbsp;<a onClick={{}}>Gửi lại</a></div>

            <div className='buttonOTP'>
            <Button disabled={otp.length!==4} style={{marginTop:"20px"}} onClick={changeTab3}>Xác nhận</Button>
            </div>

            
        </>
    )
}

export default InputOTP