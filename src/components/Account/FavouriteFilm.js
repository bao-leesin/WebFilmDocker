import { Checkbox, Divider } from "antd";
import axios from "axios"
import React, { useEffect, useState } from "react"
import {
    DeleteOutlined
  } from '@ant-design/icons';
import { Link } from "react-router-dom";
const FavouriteFilm =()=>{
    const [form,setForm] = useState(false)
    const [dataFilmLiked,setDataFilmLiked] = useState([])
    const [dataFilm,setDataFilm] = useState([]) 
    const [load,setLoad]=useState(0)

    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`user/show/liked/${localStorage.getItem("infoUser")}`)
        .then(response=>{
            console.log(response,"film đã thích")
            setDataFilmLiked(response.data.map((val,index)=>val.idPhim))            
        })
        .then(
            console.log(dataFilmLiked,"1ike")
        )

        axios.get(process.env.REACT_APP_DB_HOST+`film/show`)
        .then(response=>{
           
            setDataFilm(response.data)     
            
        })

    },[load])

    const handleDeleteFilm=(id)=>{
        let data={
            idPhim: id,
            idNguoiDung: localStorage.getItem("infoUser")
        } 
        axios.post(process.env.REACT_APP_DB_HOST+`user/unlike`,data)
        .then(response=>{
            setLoad(load+1)
        })

    }



    return (
        <>
            <h2>Phim yêu thích</h2>
            <div className="flex1">
            {!form 
                ?<div className="btnCS" onClick={()=>setForm(true)}>Chỉnh sửa</div>
                :<div className="">
                <div className="btnCS" onClick={()=>setForm(false)}>Huỷ</div>
                {/* <div className="btnCS">Huỷ</div> */}
                    </div>
    
        }
        </div>
            
            <hr></hr>

            <div className="box">
                {dataFilm.filter(val=>{
                    return dataFilmLiked.includes(val.idPhim)
                        }).map((val,index)=>
                            <div className="khungImg">
                                {!form?<></>:<div className="delete" onClick={()=>handleDeleteFilm(val?.idPhim)}><DeleteOutlined /></div>}
                                <Link to={`/movie/${val?.idPhim}`}>
                                <img src={process.env.REACT_APP_DB_HOST+"image/show/"+ val?.duongDanAnh}></img>
                                </Link>
                                {val.tenPhim}
                            </div>
                )
                    
                }
            </div>

           
        </>
        
    )
}

export default FavouriteFilm