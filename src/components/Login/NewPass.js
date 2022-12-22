import React, { useEffect } from 'react'
import { Button, Input } from 'antd';
import {LeftOutlined } from '@ant-design/icons';
import {} from 'antd';

const NewPass = (props) => {
    
    const changeTab1=()=>{
        props.changeTab("loginKey")
    }

    const changeTab2=()=>{
        props.changeTab("loginKey")
    }
    const changeTab3=()=>{
        
    }
    
    return (
       <>
           <LeftOutlined onClick={changeTab1} className="back"/>
        
        <div style={{marginTop:"30px" ,marginBottom:"30px"}}>
        <span className='title'>Đặt lại mật khẩu</span>
        </div>
        <div className='input'>
            <Input
            placeholder='Mật khẩu mới'
            type='password'
            />
            <Input
            placeholder='Nhập lại mật khẩu'
            type='password'
            />
        </div>

        <Button onClick={props.close}>Xác nhận</Button>
        
       
        </>
    )
}

export default NewPass