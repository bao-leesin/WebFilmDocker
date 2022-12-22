import React, { useEffect } from 'react'
import { Button, Form, Input, notification } from 'antd';
import {LeftOutlined } from '@ant-design/icons';
import {} from 'antd';
import axios from 'axios';

const Register = (props) => {
    
    const changeTab1=()=>{
        props.changeTab("loginKey")
    }

    const changeTab2=()=>{
        props.changeTab("loginKey")
    }
    const changeTab3=()=>{
        
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        let {xacNhanMatKhau,...rest} =values;
        rest={vaiTro:"user",
        ngaySinh:"2000/01/01"
            ,...rest}
        axios.post(process.env.REACT_APP_DB_HOST+"register", rest)
            .then(response=>{
                console.log(response)
                if(response.status===200){
                   
                    // localStorage.setItem("accessToken",response.data)
                    notification.success({
                    message:"Tạo tài khoản thành công"
                })
                }
                
            
                    
            }).then(props.close)
            
            .catch(error =>{
                notification.error({
                    message:"Tài khoản hoặc mật khẩu sai"
                })
            })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
    return (
       <>
           <LeftOutlined onClick={changeTab1} className="back"/>
        
        <div style={{marginTop:"30px" ,marginBottom:"30px"}}>
        <span className='title'>Đăng kí</span>
        </div>
        <div className='input'>
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                
                    name="tenDangNhap"
                    rules={[
                    {
                        required: true,
                        message: 'Hãy nhập tên đăng nhập của bạn!',
                    },
                    ]}
                >
                    <Input
                placeholder='Tên đăng nhập'
                />
                </Form.Item>


                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Hãy nhập email',
                    },
                    ]}
                >
                    <Input
                    placeholder='Email'
                    type='email'
                    /> 
                </Form.Item>

                <Form.Item
                    name="matKhau"
                    rules={[
                    {
                        required: true,
                        message: 'Hãy nhập mật khẩu',
                    },
                    ]}
                >
                    <Input
                    placeholder='Mật khẩu'
                    type='password'
                    /> 
                </Form.Item>

                <Form.Item
                    name="xacNhanMatKhau"
                    rules={[
                    {
                        required: true,
                        message: 'Xác nhận lại mật khẩu',
                    },
                    ]}
                >
                    <Input
                    placeholder='Nhập lại mật khẩu'
                    type='password'
                    /> 
                </Form.Item>

                <Form.Item
                >
                    <Button htmlType="submit">Đăng kí</Button>
                </Form.Item>
        </Form>
          
        </div>

        {/* <Button onClick={props.close}>Xác nhận</Button> */}
        
       
        </>
    )
}

export default Register