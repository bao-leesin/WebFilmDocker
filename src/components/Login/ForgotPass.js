import React, { useEffect } from 'react'
import { Button, Input } from 'antd';
import {LeftOutlined } from '@ant-design/icons';


const ForgotPass = (props) => {
    
    
    const changeTab2=()=>{
        props.changeTab("loginKey")
    }
    const changeTab3=()=>{
        props.changeTab("inputOTP")
    }
    return (
       <>
            <LeftOutlined onClick={changeTab2} className="back"/>
        
           <div style={{marginTop:"30px" ,marginBottom:"30px"}}>
           <span className='title'>Đặt lại mật khẩu</span>
           </div>
           <span>Xin vui lòng nhập Email tài khoản của bạn, chúng tôi sẽ gửi mã xác thực tới Email của bạn</span>
           <div className='input'>
           <Input
         placeholder='Email hoặc số điện thoại'
         />
          
           </div>

           <Button onClick={changeTab3}>Xác nhận</Button>
           <div style={{marginTop:"30px"}}>
        <a onClick={changeTab2}>Đăng nhập bằng tài khoản khác</a>
        </div>
        </>
        
    )
}

export default ForgotPass