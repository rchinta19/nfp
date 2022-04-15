import React from "react";
import logine from "../../Assets/Help/logine.png"
import loginf from "../../Assets/Help/loginf.png"

import {
    useHistory,
  } from "react-router-dom";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Login = () => {
    const history=useHistory();
    return(
        <div>
    <button onClick={() => history.push('/homeDashboard/help') } style={{position:"fixed",marginLeft:"10px",paddingRight:'3px'}}><ArrowBackIcon/>Back</button>
    <p className="h5" style={{paddingLeft:'80px',fontWeight:'bold',paddingBottom:"20px"}}>Login</p>
        <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>The users can Login into the Application by entering a valid Username and Password. The Login Screen of the Application should appear on entering the application URL. It should have the fields to enter the assigned Username and Password.  </p>
        <img src={logine} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',height:"100%",width:"100%"}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Login Screen</p>
        <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>Steps for Login:</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 1: Enter the Username</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 2: Enter the Password</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 3: Click on Login Button</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:'20px'}}>Step 4: If you forget the Password, Click on 'Forgot Password?'</p>
        <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Below is an example of a filled-in Login Screen for the fields. Then the users need to click on the Submit
button</p>
        <img src={loginf} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',height:"100%",width:"100%"}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Login Screen with details</p>
        </div>
    )
}

export default Login;