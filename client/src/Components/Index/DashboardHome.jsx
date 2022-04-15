// import Button from "@mui/material/Button";
import "../../App.css";
import * as React from 'react';

//MUI Design files
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Button, InputBase, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { styled } from "@mui/material/styles";
import Popover from '@mui/material/Popover';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from '@mui/icons-material/Close';
//////////////////////

//Other files
import nfpc from "../../Assets/Images/nfpc.png";
import appsteklogo from "../../Assets/Images/Imagevision.png";
import Sidenav from "../Sidenav/Sidenav";
import Dashboard from "../Dashboard/Graphs/Dashboard";
import { LoggingUser } from "../../reducers/loggingHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";
import Modelstatuslist from "../Configuration/Model/Modelstatuslist";
import Helper from "../Help/Help";
import { useState } from "react";
import axios from "axios";
import Changedata from "../Historylog/Changedata";
import Import from "../Import/Import";
import Login from "../login/Login"
///////////////////////

const useStyles = makeStyles({
  searchStyles: {
    border: "1px solid #E2E0E1",
    borderRadius: "10px",
    backgroundColor: "#FAF8FF",
    width: "20vw",
    height: "48px",
    padding: "0 30px",
  },
  IconStyles: {
    border: "2px solid #E2E0E1 ",
    borderRadius: "40px",
  },
  changePassword: {
    marginRight: '100px'
  }
});


function DashboardHome(props) {
  const dispatch = useDispatch(); 
  const history = useHistory();
  const classes = useStyles();

  let User = useSelector((state) => state.userLog.UserName);
  let currentUserPath = useSelector((state) => state.userLog.currentPath);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [p, setP] = useState(currentUserPath);
  const [anchorEl, setAnchorEl] = useState(false); // profile changing popup

  const [open1, setOpen] = useState(false);

  //Use camelSpacing for nomenclature
  //const [user_data, setUserData] = useState({}); // try using this format

  const [name, setName] = useState('');
  const [Newpassword, setNewpassword] = useState('');
  const [reenternewpassword, setreenternewpassword] = useState('');

  //Callback function
  const LogoutHandler = () => {
    axios.get("/logout").then((res) => {
      // setIsLoggedIn(!res.data);
      //CHECK FOR THE SUCCESS OF THE API for eg,, if (res.success or res.result === 'Success')
      dispatch(LoggingUser({ UserPresent: false }));
    });
  };

  //Use this instaed for boolean things
  const handleClickPopup = (event) => {
    setAnchorEl(anchorEl ? "" : event.currentTarget);
    // setAnchorEl(!anchorEl); // if it doesn't work, try with double/triple exclamation marks
  };

  const handleOpenPopup = () => {
    setOpen(!open1);
    setName('');
    setNewpassword('');
    setreenternewpassword('');
  }

  const handleDataChange = (event) => {
    // setUserData({[event.target.id] : event.taget.value}) / Use this instead
    let key = event.target.id;
    let value = event.target.value;
    if (key === 'name')
      setName(value);
    else if (key === 'change_pass')
      setNewpassword(value);
    else if (key === 're_change_pass')
      setreenternewpassword(value);
  };

  // //YOUR CODE
  // const handleChange = (event) => {
  //   setName(event.target.value);
  // };
  // const handlenewpassword = (e) => {
  //   setNewpassword(e.target.value);
  // };
  // const handlereenterpassword = (e) => {
  //   setreenternewpassword(e.target.value);
  // };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  // const open = Boolean(anchorEl);
  // const id = anchorEl ? 'simple-popover' : undefined;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    justifyContent: 'center',
    paddingLeft: '20px',
    marginBottom: '20px'
  };
  const header = {
    textAlign: "center",
    color: "#0f206c"
  }

  const ChangepasswordHandler = (e) => {
    axios.post("/changepassword", {
      Email_Id: User,
      password: name,
      Newpassword: Newpassword,
      reenternewpassword: reenternewpassword
    }).then((res) => {
      //check the success of the password changing api
      if(res.data==false)
      {
        alert("Password is Incorrect ")
      }
      else if(res.data==true){
        alert("password is changed sucessfully");

      }
    })
      .catch((err) => {
        // alert("Entered Current Password/New Password is Incorrect " + err)
        alert(" Entered Current Password/New Password is Incorrect ")

      }); 
  }

  return (
    <Grid container className="App">
      <Grid item xs={12} sx={{ border: "2px solid black", height: "100px" }}>
        <AppBar className="top-grid">
          <div className="logos">
            <img
              src={appsteklogo}
              alt="appstek-logo"
              className="appstek-logo"
            />
            <img src={nfpc} alt="logo" className="nfpc-logo" />
          </div>
          <div className="search-icons">
            <PersonOutlineOutlinedIcon className={classes.IconStyles + ` icon-not`} aria-describedby='test_popup' variant="contained" onClick={handleClickPopup} style={{ cursor: "pointer" }}
            />
            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{User}</p>
            <Popover
              id="test_popup"
              open={anchorEl ? true : false}
              anchorEl={anchorEl}
              onClose={handleClickPopup}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography sx={{ p: 1, cursor: "pointer" }} onClick={handleOpenPopup} >Change Password</Typography>
                <Modal
                  open={open1}
                  onClose={handleOpenPopup}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box component="form"
                    sx={style}
                    noValidate
                    autoComplete="off">
                    <button onClick={(e) => setOpen(false)} style={{ float: "right", color: "red", cursor: 'pointer' }}> <CloseIcon /> </button>
                    <Typography variant="h5" component="h2" style={header}>Change Password</Typography>
                    <FormControl variant="standard" style={{ width: "250px", padding: "2px" }}>
                      <InputLabel htmlFor="name">Enter Current Password</InputLabel>
                      <Input type="password" id="name" value={name} onChange={handleDataChange} />
                    </FormControl>
                    <FormControl variant="standard" style={{ width: "250px", padding: "2px" }}>
                      <InputLabel htmlFor="change_pass">Enter New Password</InputLabel>
                      <Input
                        id="change_pass"
                        value={Newpassword}
                        type="password"
                        onChange={handleDataChange}
                        aria-describedby="Enter New Password"
                      />
                    </FormControl>
                    <FormControl variant="standard" style={{ width: "250px", padding: "2px" }}>
                      <InputLabel htmlFor="re_change_pass">Re-Enter New Password</InputLabel>
                      <Input
                        id="re_change_pass"
                        type="password"
                        value={reenternewpassword}
                        onChange={handleDataChange}
                        aria-describedby="Re-Enter New Password"
                      />
                    </FormControl>
                    <Button style={{ background: "#0f206c", color: "white", textAlign: "center", margin: "10px", width: "230px", }} onClick={(e) => {
                      ChangepasswordHandler();
                    }}>SUBMIT</Button>
                  </Box>
                </Modal>
                {/* <Button
              onClick={(e) => {
                LogoutHandler();
                localStorage.clear()
                window.location.reload()
                history.push('/')
              }} 
              className={classes.IconStyles + ` icon-not`}>Logout
            </Button>*/}
                <Typography sx={{ p: 1, cursor: "pointer" }} onClick={(e) => {
                  LogoutHandler();
                  localStorage.clear()
                  history.push('/login')
                  window.location.reload();
                  // localStorage.clear()
                  // // window.location.reload()
                  //                 history.push('/login')
                  // window.location.reload()
                }}
                // className={classes.IconStyles + ` icon-not`}
                >Logout</Typography>
              </div>
            </Popover>
          </div>
        </AppBar>
      </Grid>
      <Grid xs={1} className="nav-tab">
        <Sidenav />
      </Grid>
      <Grid xs={11} className="nav-content">
        <Switch>
          <Route exact={true} path="/login">
            <Login />
          </Route>
          <Route path="/homeDashboard/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/homeDashboard/Configuration">
            <Modelstatuslist />
          </Route>
          <Route path="/homeDashboard/History">
            <Changedata />
          </Route>
          <Route path="/homeDashboard/import">
            <Import />
          </Route>
          <Route path="/homeDashboard/help">
            <Helper />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}

export default withRouter(DashboardHome);
