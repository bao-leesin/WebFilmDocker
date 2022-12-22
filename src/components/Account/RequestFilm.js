import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React from "react"


const RequestFilm =()=>{

    const onFinish = (values) => {
        console.log('Success:', values);
        let data ={
            idKhachHangYeuCau:localStorage.getItem("infoUser"),
            trangThai:"dangCho",
            ngayYeuCau:"2022-11-21",
            ...values

        }
      
        axios.post(process.env.REACT_APP_DB_HOST+"user/create/request", data)
            .then(response=>{
                console.log(response)
                if(response.status===200){
                    notification.success({
                    message:"Gửi yêu cầu thành công"
                })
                }
            
                    
            })
            
            .catch(error =>{
                notification.error({
                    message:""
                })
            })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <>
            <h2>Yêu cầu phim</h2>
            <div className="">

            <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                    name="phimYeuCau"
                >
                    <Input
                placeholder='Hãy nhập phim bạn muốn'
                />
                </Form.Item>

                <Form.Item
                >
                    <Button htmlType="submit">Yêu cầu</Button>
                </Form.Item>
                </Form>

            </div>

        </>
    )
}

export default RequestFilm