import React, { useState, useEffect } from "react";
//getting logos for displaying in login page
import appsteklogo from "./Imagevision.png";
import nfpclogo from "./nfpclogo.png";
import background from "./background.png"
/////
import axios from "axios";
//getting styles for stying login page
import "./Login.css";

//getting reducers for state handling
import { LoggingUser } from "../../reducers/loggingHandler";
//
import { useDispatch } from "react-redux";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import CloseIcon from '@mui/icons-material/Close';



const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 350,
  height:200,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const Login = (props) => {
  const dispatch = useDispatch()
  const [email, set_email] = useState("");
  const [pwd, set_pwd] = useState("");
  const [remember,set_remember]=useState(false)
  const [open, set_Open] = useState(false);
  const handleOpen = () => set_Open(true);
  const handleClose = () => set_Open(false);
  function handleChange() {
    // alert("Do you want to save credentials of login in the browser")
    const value = remember  ? false : true;
    set_remember(value);
    localStorage.setItem('remember',value);
    
  };
  function rememberme() {

  }
  // useEffect(() => {
 
  //   // Update the document title using the browser API
  //   const rememberMe = localStorage.getItem('remember') ?  localStorage.getItem('remember') : false  ;
  
  //   (rememberMe == 'true')?  setRemember(true) : setRemember(false);
    
   
  //     const email = remember ? localStorage.getItem('email') : '';
  //     const pwd = remember ? localStorage.getItem('pwd') : '';
    
    
  //   setemail(email)
  //   setpwd(pwd) 
  // },[]);
  
//function for handling submit button in login page

  const sumbitAcessesHandler = async (e) => {
    e.preventDefault();
   await axios
      .post(
        "/Login",
        {
          Email_Id: email,
          password: pwd,
        },
      )
      .then((res) => {
        
        if (res.data==true) {
         localStorage.setItem("userPresent",res.data)
        
         dispatch(LoggingUser({UserPresent:res.data,path:"/homeDashboard/Dashboard",UserName:email}))
         
        }
      //  else if(remember){
      //     localStorage.setItem('email',`${email}`)
      //     localStorage.setItem('pwd',`${pwd}`)
      //   }
        else if(res.data==false){
          alert("Entered User Name/Password is incorrect")
        }
      })
  };
 
 
  return (
    <div className="bg" style={{backgroundImage: `url(${background})`}}>
    <div className="body">
      <div className="div-login">
        <div className="div-login-logo">
          <a>
            <img src={appsteklogo} style={{ height: "36px", width: "180px" }} />
          </a>
          <a>
            <img src={nfpclogo} style={{ height: "49px", width: "92px" }} />
          </a>
        </div>
        <div>
          <form>
            {/* <span>Username</span> */}
            <label className="label" for="uname">
              User Name
            </label>

            <input
              className="mail"
              type="email"
              name="email"
              placeholder="Enter User name"
              required
              onChange={(e) => set_email(e.target.value)}
              // onChange={this.handleChange}
            />

            {/* <span>Password</span> */}
            <label className="label" for="psw">
              Password
            </label>

            <input
              className="mail"
              type="password"
              name="pwd"
              placeholder="Enter password"
              required
              onChange={(e) => set_pwd(e.target.value)}
             
            />
            {/* <div>
            <input type="
            checkbox" name="remember" /> Remember me
            
            <div class="container" style={{ backgroundColor: "#f1f1f1" }}>

              <span class="psw">
                
                <a href="#">Forgot password?</a>
              </span>
            </div>   */}
            {/* </div> */}
            {/* <div className="remember"> */}
              {/* <a>
                <input className="checkbox" type="checkbox" name="rememberMe" checked={remember}  onClick={() => {
          handleChange();
          rememberme();
        }}/>
                <label for="checkbox">Remember Me-{typeof remember}</label> 
              </a> */}
            <span style={{cursor:"pointer"}} >  
          <a onClick={handleOpen} style={{cursor:"pointer",float:'right',color:"#212121",fontSize:'10px',fontWeight:'bold'}}>Forgot Passoword?</a></span> <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <button onClick={(e)=>set_Open(false)} style={{float: "right",color:"red"}}> <CloseIcon  /> </button>
       <em style={{paddingTop:"4em"}}> Please Contact Your Administrator</em>
        </Box>
      </StyledModal>
            {/* </div> */}

            <button
              type="submit"
              onClick={sumbitAcessesHandler}
              className="login-btn"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
   </div>

  );
};

export default Login;
