import React from "react";
import img from "../../../images/film/image2.png"
import './Tab_Ep.scss';
const Tab_Ep =(props)=>{
    const listmovie =[
        {
            image:img,
            ep:"1"
        },
        {
            image:img,
            ep:"2"
        },
        {
            image:img,
            ep:"3"
        },
        {
            image:img,
            ep:"4"
        },
        {
            image:img,
            ep:"5"
        },
        {
            image:img,
            ep:"6"
        },
        {
            image:img,
            ep:"7"
        },



    ]

    return (
        <div className="tab_ep">
            {listmovie.map((value,index)=>{
                return (
                    <span>
                        <img style={{marginRight:"10px", height:"150px"}} src={process.env.REACT_APP_DB_HOST+"image/show/"+props.data.duongDanAnh?.anhDaiDien}></img>
                        <div>Tập {value.ep}</div>
                    </span>
                )
            })}
        </div>
    )

}

export default Tab_Ep