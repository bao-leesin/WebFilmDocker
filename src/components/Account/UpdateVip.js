import { Checkbox, Col, Input, Modal, notification, Row } from "antd"
import React, { useEffect, useState } from "react"
import './UpdateVip.scss';
import user from "../../images/user.png";
import mastercard from "../../images/logo/mastercard.png";
import l1 from "../../images/logo/la1.png";
import l2 from "../../images/logo/la2.png";
import l3 from "../../images/logo/la3.png";
import axios from "axios";
const UpdateVip =(props) =>{

    const [packVip,setPackVip] =useState(0)
    const [dataVip,getDataVip] = useState([])
    const [myDataVip,getMyDataVip] = useState({})

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`subscription/show`)
      .then(response=>{
          if(response.status===200){
            console.log(response.data)
            getDataVip(response.data)
    
          }
   
      })

      axios.get(process.env.REACT_APP_DB_HOST+`user/show/subscribed/${localStorage.getItem("infoUser")}`)
      .then(response=>{
          if(response.status===200){
            console.log(response.data)
            console.log(myDataVip[myDataVip.length-1],"11")
            getMyDataVip(response.data)
    
          }
   
      })


    },[])

    const changePack =(key) => {
        setPackVip(key)
    }
       
    const dangKiVip =() =>{
        let data ={
            idKhachHang:localStorage.getItem("infoUser"),
            idGoi:packVip
        }
        axios.post(process.env.REACT_APP_DB_HOST+`user/create/subscribe`,data)
      .then(response=>{
          if(response.status===200){
            console.log(response.data)
            console.log(myDataVip[myDataVip.length-1],"11")
            notification.success({
                message:"Đăng kí thành công"
            })
            props.handleCloseVip()
    
          }
   
      })
    }
    

    return (
        <>
            <Modal
                title=""
                width="1000px"
                open={props.modalVip}
                onCancel={props.handleCloseVip}
                footer={false}
                className="modalVip"
            >
                <div className="title">
                        <Row>
                            <Col span={1}></Col>
                            <Col span={2}><img src={user}></img> </Col>
                            
                            <Col span={18}>
                                <div className="d1">User 1004</div>
                                <div className="d2">Đăng ký VIP để tận hưởng đặc quyền</div>

                            </Col>
                        </Row>
                </div>
                {myDataVip.length===0 ?
                //Chưa đăng ký
                    <div className="content">

                    <div className="Packs">
                        {
                        
                        dataVip.map((data,index)=> 
                             <div className={packVip===index?"pack-active":"pack"}
                                 key={index}
                                 onClick={()=>changePack(index)}
                                 >
                             <div className="d1">{data.tenGoi}</div>
                             <div className="d2">Chất lượng {data.chatLuong}</div>
                             <div className="d3">{data.giaTien+"đ"}</div>
                         </div>
                        )}
                       
                    
                    </div>
                        <div className="tt">Sau khi khuyến mãi kết thúc hệ thống sẽ tự động gia hạn 1 tháng khi hết hạn. Hủy bỏ bất cứ lúc nào</div>
                        <div className="tt2">
                            Chọn phương thức thanh toán
                            <div className="mastercard">
                                <img src={mastercard}></img>
                                <div className="t1">
                                    <div className="d1">Thẻ ngân hàng</div>
                                    <div className="d2">Masercard. Visa, JCB</div>
                                </div>
                            </div>
                        </div>
                        <div className="tt3">
                            <div style={{marginBottom:"10px"}}>Vui lòng thiết lập thẻ tín dụng hoặc thẻ ghi nợ của bạn</div>
                             <div>
                              
                                <Input
                             placeholder="Nhập số thẻ tín dụng của bạn"
                             
                             prefix={
                                <span>
                                <img src={l1}></img>
                                <img src={l2}></img>
                                <img src={l3}></img>
                                </span>
                             }
                             ></Input>
                                </div>
                             <div style={{marginTop:"10px"}}>
                             <Input placeholder="Hạn sử dụng thẻ tín dụng (Tháng/Năm)"/>

                             </div>
                             <div style={{marginTop:"10px"}}>
                             <Input placeholder="Mã bảo mật (CVV)"/>
                             </div>
                             
                             
                            
                        </div>
                        <div className="tt4">
                            <Checkbox>Tôi đồng ý Thỏa thuận dịch vụ VIP</Checkbox>
                            <div className="gr1">
                                <div className="bt1">{dataVip[packVip]?.giaTien+"đ"}</div>
                                <div className="bt2" onClick={dangKiVip}>Gia nhập VIP</div>
                            </div>
                        </div>

                </div>:

                //Đã đăng kí
                <div className="content">

                <div className="Packs">
                    {
                    
                    dataVip.map((data,index)=> 
                         <div className={myDataVip[myDataVip.length-1]?.giaTien===data?.giaTien?"pack-bought":"pack"}
                             key={index}
                             onClick={()=>changePack(index)}
                             >
                         <div className="d1">{data.tenGoi}</div>
                         <div className="d2">Chất lượng {data.chatLuong}</div>
                         <div className="d3">{data.giaTien+"đ"}</div>
                     </div>
                    )}
                   
                
                </div>
                    {/* <div className="tt">Sau khi khuyến mãi kết thúc hệ thống sẽ tự động gia hạn 1 tháng khi hết hạn. Hủy bỏ bất cứ lúc nào</div>
                    <div className="tt2">
                        Chọn phương thức thanh toán
                        <div className="mastercard">
                            <img src={mastercard}></img>
                            <div className="t1">
                                <div className="d1">Thẻ ngân hàng</div>
                                <div className="d2">Masercard. Visa, JCB</div>
                            </div>
                        </div>
                    </div>
                    <div className="tt3">
                        <div style={{marginBottom:"10px"}}>Vui lòng thiết lập thẻ tín dụng hoặc thẻ ghi nợ của bạn</div>
                         <div>
                          
                            <Input
                         placeholder="Nhập số thẻ tín dụng của bạn"
                         
                         prefix={
                            <span>
                            <img src={l1}></img>
                            <img src={l2}></img>
                            <img src={l3}></img>
                            </span>
                         }
                         ></Input>
                            </div>
                         <div style={{marginTop:"10px"}}>
                         <Input placeholder="Hạn sử dụng thẻ tín dụng (Tháng/Năm)"/>

                         </div>
                         <div style={{marginTop:"10px"}}>
                         <Input placeholder="Mã bảo mật (CVV)"/>
                         </div>
                         
                         
                        
                    </div> */}
                    <div className="tt4">
                        {/* <Checkbox>Tôi đồng ý Thỏa thuận dịch vụ VIP</Checkbox> */}
                        <div className="gr1">
                            <div className="bt1">{myDataVip[myDataVip.length-1]?.giaTien+"đ"}</div>
                            <div className="bt2">Bạn đã đăng kí gói </div>
                        </div>
                    </div>

            </div>
            }
                

                
            </Modal>

        </>
    )
}

export default UpdateVip