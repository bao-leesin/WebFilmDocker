import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import user from "../../images/user.png"
import moment from 'moment'


const InfoAccount =(props) =>{

    const [openModal,setOpenModal] =useState(false)
    const [infoUser,setInfoUser] = useState({})
    const [infoUser1,setInfoUser1] = useState({})
    const [date,setDate] =useState("")
    const [sex,setSex] = useState("")
    const handleOpenModal =()=>{
        setOpenModal(true)
    }
    const closeModal=()=>{
        setOpenModal(false)
    }

    const handleChangeSex =(value) => {
        console.log(`selected ${value}`);
        setSex(value)
      };

    const handleChangeDate = (date, dateString) => {
        console.log(date, dateString);
        setDate(dateString)
      };

    const handleChange = (e) => {
        console.log(infoUser1,"get")
        setInfoUser1({...infoUser1,
            [e.target.name]:e.target.value})
       
      }

    

    
    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`user/show/info/${localStorage.getItem("infoUser")}`)
        .then(response=>{
            console.log(response,"user")
            if(response.status===200){
               setInfoUser(response.data[0])
               setInfoUser1(response.data[0])
                
            }
        
                
        })
    },[])

    const onFinish = (values) => {
        var data={...infoUser1,
            ngaySinh:date.length===0?infoUser.ngaySinh.slice(0,10):date,
            gioiTinh:sex.length===0?infoUser.gioiTinh:sex,
            idNguoiDung:localStorage.getItem("infoUser")}

        axios.post(process.env.REACT_APP_DB_HOST+`user/update/info`,data)
            .then(response=>{
                console.log(response)
                if(response.status===200){
                //    
                 
                    notification.success({
                    message:"Cập nhật thành công"
                })
                closeModal()

                }
            
                    
            })
            
            .catch(error =>{
                notification.error({
                    message:"Cập nhật thất bại"
                })
            })
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <>
            <div >
                <h2>Cài đặt cá nhân</h2>
                <div className="Cc">
                    Thông tin cá nhân</div>
                <div className="card1">

                    <div className="user">
                        <Row>
                            <Col span={2}><img src={user}></img> </Col>
                            <Col span={18}><span className="bt1">
                                <div>{infoUser.tenDayDu}</div>
                                <div>
                                <Row>
                                    <Col span={11}>
                                    <span className="thin">Giới tính: </span>
                                        <span>{infoUser.gioiTinh===null?
                                        "Chưa được thiết lập":
                                        infoUser.gioiTinh
                                        }</span>
                                    </Col>
                                    <Col span={2}>|</Col>
                                    <Col span={11}>
                                    <span className="thin">Ngày sinh: </span>
                                        <span>{(infoUser.ngaySinh??"Chưa được thiết lập").slice(0,10)}</span>
                                    </Col>
                                </Row>
                                </div>
                            </span>
                            </Col>
                            <Col span={2} className="bt3">
                                <Button className="btn" onClick={handleOpenModal}>Chỉnh sửa</Button>
                            </Col>
                        </Row>
                    
                    
                    </div>
                </div>
                
                <div className="Cc">
                    Vip</div>
                <div className="card2">

                    <Row>
                        <Col span={20}>
                        <div className="bt1">Trở thành vip</div>
                        <div className="bt2">Đăng kí VIP để xem nội dung độc quyền, xem phim HD đồng thời có thể bỏ qua quảng cáo</div>
                        </Col>
                        <Col span={2} className="bt3">
                                <Button className="btn" onClick={props.click}>Đăng kí VIP</Button>
                            </Col>
                    </Row>

                   
                </div>

                <div className="Cc">
                    Tài khoản và bảo mật</div>
                <div className="card3">

                    <div >
                        <div className="start">
                            Email &ensp;<span className="bold">{infoUser.email}</span>
                            {/* <div className="end" onClick={{}}>Chỉnh sửa</div> */}
                        </div>
                        
                        <hr></hr>
                    </div>

                    <div >
                        <div className="start">
                            Số điện thoại &ensp;<span className="bold">Chưa được thiết lập</span>
                            {/* <div className="end" onClick={{}}>Chỉnh sửa</div> */}
                        </div>
                        
                        <hr></hr>
                    </div>

                    <div >
                        <div className="start">
                            Mật khẩu &ensp;<span className="bold">Chưa được thiết lập</span>
                            {/* <div className="end" onClick={{}}>Chỉnh sửa</div> */}
                        </div>
                        
                        <hr></hr>
                    </div>

                    <div >
                        <div className="start">
                            Quản lí Vip &ensp;<span className="bold">Chưa được thiết lập</span>
                            {/* <div className="end" onClick={{}}>Chỉnh sửa</div> */}
                        </div>
                        
                        <hr></hr>
                    </div>
                   
                </div>
            </div>

            <Modal
          open={openModal}
          title=""
          width={400}
          footer={false}
          onCancel={closeModal}
          className="modal"
        >
                <h2 style={{marginLeft:"90px"}}>Thông tin cá nhân</h2>

             <Form
             initialValues={{
                
                ...infoUser,
                ngaySinh:infoUser.ngaySinh?.slice(0,10)


             }
                
            }
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="infofo"
            >
                <Form.Item
                    label="Tên đầy đủ"
                    labelCol={{ span: 24 }}
                    name="tenDayDu"
                    rules={[
                    {
                        required: true,
                        message: 'Hãy nhập tên đăng nhập của bạn!',
                    },
                    ]}
                >
                    <Input
                    name="tenDayDu"
                    placeholder='Tên đầy đủ'
                    onChange={handleChange}
                />
                </Form.Item>


                <Form.Item
                    label="Địa chỉ"
                    labelCol={{ span: 24 }}
                    name="diaChi"
                    rules={[
                    {
                        required: true,
                        message: 'Hãy nhập email',
                    },
                    ]}
                >
                    <Input
                    className="input11"
                    name="diaChi"
                    placeholder='Dia chi'
                    onChange={handleChange}
                    /> 
                </Form.Item>

                <Form.Item
                    label="Giới tính"
                    labelCol={{ span: 24 }}
                    name="gioiTinh"
                >
                   <Select
                        
                        defaultValue={infoUser.gioiTinh}
                        style={{ width: 350 }}
                        onChange={handleChangeSex}
                        options={[
                            {
                            value: 'Nam',
                            label: 'Nam',
                            },
                            {
                            value: 'Nữ',
                            label: 'Nữ',
                            },
                            {
                            value: 'Không xác đinh',
                            label: 'Không xác định',
                            },
                           
                        ]}
                        />
                
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    labelCol={{ span: 24 }}
                >
    
                    <Input
                    name="email"
                    placeholder='Email'
                    onChange={handleChange}
                    /> 
                </Form.Item>

                <Form.Item
                     labelCol={{ span: 24 }}
                    label="Ngày sinh"
                    className="datecustom"
                    // name="ngaySinh"
                >
                  <DatePicker 
                //   name="ngaySinh"
                        defaultValue={moment(infoUser.ngaySinh?.slice(0,10),'YYYY-MM-DD')}
                    style={{width: 350,display:"block"}}
                    onChange={handleChangeDate}
                    // format={'YYYY/MM/DD'} 
                   />
                </Form.Item>
                <Form.Item
                >
                    <Button style={{marginLeft:"160px", marginTop:"20px"}} htmlType="submit">Xác nhận</Button>
                </Form.Item>
        </Form>
    
        </Modal>
        </>
    )
}

export default InfoAccount