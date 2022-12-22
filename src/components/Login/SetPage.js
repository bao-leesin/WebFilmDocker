import { Modal } from "antd";
import React, {useEffect, useState} from "react";
import { Route, Switch } from "react-router-dom";
import ForgotPass from "./ForgotPass";
import InputOTP from "./InputOTP";
import Login from "./Login";
import LoginKey from "./LoginKey";
import NewPass from "./NewPass";
import Register from "./Register";

const SetPage =(props)=>{
  const [tab, setTab] = useState(props.first);
  
  useEffect(()=>{console.log(tab)},[tab])  
  useEffect(()=>{setTab("login")},[props.modalLogin])
 

  
    const tabList = {
        login: {
          component: Login,
        },
        register: {
          component: Register,
        },
        loginKey: {
            component: LoginKey
            // <LoginKey
            //   changeTab={setTab}
            // />,
          },
        forgotPass: {
          component: ForgotPass,
          
        },
        inputOTP: {
          component: InputOTP,
        },
        newPass: {
          component: NewPass,
        },
      };
      return (
        <Modal
          open={props.modalLogin}
          title=""
          width={400}
          footer={false}
          onCancel={props.handleCancel}
          className="modal"
        >
         <div className='login'>
         {
         React.createElement(tabList[tab].component, {
            changeTab: setTab,
            close: props.handleCancel
            
             })}
            
         </div>

</Modal>
)
}

export default SetPage
