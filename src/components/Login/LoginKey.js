import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { Button, Form, Input, notification } from 'antd';
import {LeftOutlined } from '@ant-design/icons';
import axios from 'axios';


const LoginKey = (props) => {
    
    const changeTab1=()=>{
        props.changeTab("login")
    }

    const changeTab2=()=>{
        props.changeTab("login")
    }

    const changeTab3=()=>{
        props.changeTab("forgotPass")
    }
    
    const onFinish = (values) => {
        console.log('Success:', values);
        
        axios.post(process.env.REACT_APP_DB_HOST+"login", values)
            .then(response=>{
                console.log(response)
                if(response.status===200){
                    let decoded = jwt_decode(response.data.token);
                    console.log(decoded)
                    localStorage.setItem("accessToken",response.data.token)
                    localStorage.setItem("infoUser",decoded.idNguoiDung)
                    notification.success({
                    message:"Đăng nhập thành công"
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

    // handleSubmit=()=>{
    //     const article = { title: 'React POST Request Example' };
    //     axios.post('https://reqres.in/api/articles', article)
    //         .then(response => this.setState({ articleId: response.data.id }));
    // }

    return (
       <>
            <LeftOutlined onClick={changeTab1}className="back"/>

            <div style={{marginTop:"30px" ,marginBottom:"60px"}}>
           <span className='title'>Đăng nhập bằng mật khẩu</span>
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
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input
            placeholder='Email hoặc số điện thoại'
            />
            </Form.Item>

            <Form.Item
                name="matKhau"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input
                placeholder='Mật khẩu'
                type='password'
                /> 
            </Form.Item>


            <Form.Item
            >
                <Button htmlType="submit">Đăng nhập</Button>
            </Form.Item>
    </Form>



     
           </div>

   
           
           <div style={{marginTop:"30px"}}>
           <a onClick={changeTab3}>Quên mật khẩu</a>
           </div>
        </>
    )
}

export default LoginKey