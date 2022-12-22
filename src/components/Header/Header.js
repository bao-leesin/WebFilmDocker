import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import user from '../../images/user.png';
import logo from '../../images/logo/logo.png';
import {CaretDownOutlined,SearchOutlined,HistoryOutlined,BellFilled,UserOutlined,DropboxOutlined,CodeSandboxOutlined} from '@ant-design/icons';
import './Header.scss';
import { Modal, Popover } from 'antd';
import Login from '../Login/Login';
import SetPage from '../Login/SetPage';
import axios from 'axios';


const Header = (props) => {
    
    const history = useHistory();
    const [nofi,setNofi] = useState([])
    const [key,setKey] = useState("")
    const [modalLogin,setModalLogin]= useState(false)
    const [paint,setPaint] = useState(false)
    const [random,setRandom] =useState(0)

    const inputRef = useRef()

    const focus=()=>{
        inputRef.current.focus()
    }
    const red=()=>{
        setPaint(true)
    }

    const white=()=>{
        setPaint(false)
        console.log("path")
        
    }

    const account =() =>{
        white()
        localStorage.getItem("accessToken")?handleAccount():openLogin()

    }

    const openLogin =()=>{
        
        setModalLogin(true)
        hide()
    }

    const handleAccount = ()=>{
        history.push("/account")
    }

    const closeLogin=()=>{
        setModalLogin(false)
    }

    const [term, setTerm] = useState("");
    const dispatch = useDispatch();

    
    useEffect(()=>{
        console.log(term)
        if(term){
            history.push("/search")
        }
       
        localStorage.setItem("search",term)
        
    },[term])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`user/show/notification/${localStorage.getItem("infoUser")}`)
        .then(response=>{
            setNofi(response.data)          
        })
        .then(
            console.log(nofi,"1ik")
        )

            setKey(localStorage.getItem("accessToken"))
    },[])

    // useEffect(()=>{
    //     axios.get(process.env.REACT_APP_DB_HOST+`user/randomize`)
    //     .then(response=>{
    //         setRandom(response.data)          
    //     })
    //     .then(
    //         console.log(nofi,"1ik")
    //     )

    //         setKey(localStorage.getItem("accessToken"))
    // },[])

    const handleRandom =()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`user/randomize`)
        .then(response=>{
            setRandom(response?.data.idPhim)          
        })
        .then(
            history.push(`/movie/${random}`),
            // history.listen(`/movie/${random}`)
        )
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }
    const submitHandler = (event) => {
        if (term === "")
        {}
            // alert("Please enter text")
        else {
            dispatch(fetchAsyncMovies(term))
            dispatch(fetchAsyncShows(term))
        }
        event.preventDefault();

    }

    const [open, setOpen] = useState(false);
  const hide = () => {
    white()
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const LogOut =()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("infoUser")
  }


    



    return (
        <div className='header'>
              <div className='head'>
            <div className="logo">
                <Link to='/' onClick={white}>
                <img src={logo} alt='logo' sizes='20%'></img>
                </Link>
            </div>
            
            <div >
                
                <span className='font' style={{color:"#CCCCCC"}}>
                    Đề xuất
                </span>

                {paint
                ?
                <Link to='/discovery'>
                <span className='font' style={{color:"#E23E3E"}} onClick={red}>
                    Khám phá
                    <CaretDownOutlined color='#E23E3E'/>
                    
                </span>
                </Link>
                :
                <Link to='/discovery'>
                <span className='font' style={{color:"#CCCCCC"}} onClick={red}>
                    Khám phá
                    <CaretDownOutlined color='#CCCCCC'/>
                    
                </span>
                </Link>
            }
                {/* <Link to='/discovery'>
                <span className='font' style={{color:"#CCCCCC"}}>
                    Khám phá
                    <CaretDownOutlined color='#CCCCCC'/>
                    
                </span>
                </Link> */}
            </div>

            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type="text"
                     value={term} 
                     placeholder='Nhập tên phim' 
                     name="search" 
                     onChange={handleChange} 
                     ref={inputRef}
                     
                     />
                    <span className='search' >
                        | < SearchOutlined style={{cursor:"pointer"}} onClick={focus}/>
                    </span>
                    
                    {/* <button type='submit'> <i className="fa fa-search"></i> </button> */}
                </form>
            </div>
            <div className='button-function'>
            {/* <Link to={`/movie/${random}`}> */}
           
            <CodeSandboxOutlined onClick={handleRandom} />
            {/* </Link> */}

            <Popover placement="bottomRight"  content={
                             <div className='nofi'>
                                {
                                nofi?.length===0?<div>Không có thông báo </div>:
                                
                                nofi?.map((val,index)=>
                                    <div key={index} style={{width:"400px"}}>
                                       <div style={{fontSize:"18px",fontWeight:"600"}}>{val.tieuDeThongBao}</div> 
                                       <div className='tt2'>{val.noiDungThongBao.slice(0,100)+"..."}</div>
                                       <hr></hr>
                                    </div>
                                    )}
                            </div>
                        
                      
                    } 
                    trigger={localStorage.getItem("accessToken")?"click":""}
                    >
            <BellFilled className='button animation1'/>
             </Popover>

            <UserOutlined className='button' 
            onClick={
                
                account}
            />
            {/* <Popover 
                placement="bottomRight"  
                content={localStorage.getItem("accessToken")?contentLogout:contentLogin} 
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
            <UserOutlined className='button' 
            // onClick={openLogin}
            />
             </Popover> */}

            </div>

            

           <SetPage
           first={"login"}
            modalLogin={modalLogin}
            handleCancel={closeLogin}
            
            
           />
            </div>


        </div>
    )
}

export default Header