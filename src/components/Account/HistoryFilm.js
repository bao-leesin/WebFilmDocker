import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    DeleteOutlined
  } from '@ant-design/icons';

const HistoryFilm =()=>{
    const [form,setForm] = useState(false)
    const [dataFilmHis,setDataFilmHis] = useState([])
    const [dataFilm,setDataFilm] = useState([])
    const [load,setLoad]=useState(0)
    useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_HOST+`watchfilm/get/${localStorage.getItem("infoUser")}`)
        .then(response=>{
            setDataFilmHis(response.data.map((val,index)=>val.idPhim))            
        })
        .then(
            console.log(dataFilmHis,"1ike1")
        )

        axios.get(process.env.REACT_APP_DB_HOST+`film/show`)
        .then(response=>{
            console.log(dataFilm.filter(val=>{
                console.log(dataFilmHis.includes(val.idPhim))
                return true
            }),"ll")
            setDataFilm(response.data)            
        })

    },[load])

    const handleDeleteFilm=(id)=>{
        let data={
            idPhim: id,
            idKhachHang: localStorage.getItem("infoUser"),
            idTap: 0,
        } 
        axios.post(process.env.REACT_APP_DB_HOST+`watchfilm/singledelete`,data)
        .then(response=>{
            setLoad(load+1)
        })

    }

    return (
        <>
            <h2>Lịch sử xem</h2>
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
                    return dataFilmHis.includes(val.idPhim)
                        }).map((val,index)=>
                            
                            <div className="khungImg">
                         {!form?<></>
                         :<div className="delete" onClick={()=>handleDeleteFilm(val?.idPhim)}><DeleteOutlined /></div>}
                                <Link to={`/movie/play/${val?.idPhim}`}>
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

export default HistoryFilm