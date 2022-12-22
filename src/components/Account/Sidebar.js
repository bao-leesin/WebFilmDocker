import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Button, Layout, Menu, Modal } from 'antd';
import axios from 'axios';
  import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
  import user from "../../images/user.png"
import FavouriteFilm from './FavouriteFilm';
import FeedBack from './FeedBack';
import HistoryFilm from './HistoryFilm';
import InfoAccount from './InfoAccount';
import RequestFilm from './RequestFilm';
import UpdateVip from './UpdateVip';

  
  const { Header, Sider, Content } = Layout;

 const Sider1=(props) =>{
  const history = useHistory();
    const { handleClick } = props;
    const [openingModal,setOpenModal]= useState(false)
    const [infoUser,setInfoUser] = useState({})
    const [openLog,setOpenLog] = useState(false)


    useEffect(()=>{
      setOpenModal(props.click)
    },[props.click])

    const handleVip =()=>{
      
      setOpenModal(true)
    }

    const click =()=>{
      props.close()
    }
    const handleCancel=()=>{
      click ()
      setOpenModal(false)
     
    }

    const openModalLogout =() =>{
      setOpenLog(true)
    }

    const closeModalLogout =() =>{
      setOpenLog(false)
    }

    const Logout = () =>{
     
      localStorage.removeItem("accessToken")
      localStorage.removeItem("infoUser")
      history.push("/")
      window.location.reload()
    }

    useEffect(()=>{
      axios.get(process.env.REACT_APP_DB_HOST+`user/show/info/${localStorage.getItem("infoUser")}`)
      .then(response=>{
          console.log(response)
          if(response.status===200){
             setInfoUser(response.data[0])
    
          }
   
      })
  },[])



    return (
      <>
      <Layout.Sider>
        <div className="user" >
          <img src={user}></img> 
          <span>{infoUser.tenDayDu}</span>
          </div>
          <div className='GNV'>
            <Button onClick={handleVip}>Gia nhập VIP</Button>
          </div>
        <Menu theme="dark" mode="inline" openKeys={"sub1"}>
          
            <Menu.Item key="1" onClick={handleClick}>
              <div className='center'>
              <span>Cài đặt cá nhân</span>
              <hr></hr>
              </div>
              
            </Menu.Item>
            <Menu.Item key="2" onClick={handleClick}>
              Lịch sử xem
            </Menu.Item>
            <Menu.Item key="3" onClick={handleClick}>
              Phim yêu thích
            </Menu.Item>
            <Menu.Item key="4" onClick={handleClick}>
              Yêu cầu phim
            </Menu.Item>
            <Menu.Item key="5" onClick={handleClick}>
              Lích sử giao dịch
            </Menu.Item>
            <Menu.Item key="6" onClick={handleClick}>
              Phản ánh ý kiến
            </Menu.Item>
            <Menu.Item key="7" >
            <hr></hr>
            <div className='center' onClick={openModalLogout}>
            Đăng xuất

            </div>
              
              
            </Menu.Item>
   
        </Menu>
      </Layout.Sider>
        <UpdateVip
          modalVip={openingModal}
          handleCloseVip={handleCancel}
          
        />
        <Modal
        title=" "
         closable={false}
          open={openLog}
          onCancel={closeModalLogout}
          // footer={false}
          onOk={Logout}
          okText="Có"
          cancelText="Huỷ"
          >
            <div style={{fontSize:"20"}}>Bạn có chắc muốn đăng xuất khỏi tài khoản không</div>
        </Modal>
      </>
    );
  }

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);
    const style = {
      fontSize: "30px",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };

    const clickVip =() =>{
      setCollapsed(true)
    }

    const closeVip =()=>{
      setCollapsed(false)
    }
  
    const components = {
      1: <div className='infoAccount'><InfoAccount click={clickVip} /></div>,  
      2: <div className='chung'><HistoryFilm/></div>,
      3: <div className='chung'><FavouriteFilm/></div>,
      4: <div className='chung'><RequestFilm/></div>,
      5: <div style={style}><h2>Lịch sử giao dịch</h2></div>,
      6: <div className='feedBack'><FeedBack/></div>
    };
  
    const [render, updateRender] = useState(1);
  
    const handleMenuClick = menu => {
      updateRender(menu.key);
    };
    return (
        <div className='account'>

              <Layout  className='layout' style={{ minHeight: "100vh"}}>
                <Sider1 handleClick={handleMenuClick} click={collapsed} close={closeVip}/>
                <Layout>
                  <div >
                  <Content>{components[render]}</Content>
                  </div>
                  
                </Layout>
              </Layout>
      
        </div>
    )
}

export default Sidebar