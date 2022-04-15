import React from "react";
import historyi from "../../Assets/Help/history.png";
import history1 from "../../Assets/Help/historyd.png";


import {
    useHistory
  } from "react-router-dom";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const History = () => {
    const history=useHistory();
    return(
        <div >
    <button onClick={() => history.push('/homeDashboard/help') } style={{position:"fixed",marginLeft:"10px",paddingRight:'3px'}}><ArrowBackIcon/>Back</button>
    <p className="h5" style={{paddingLeft:'80px',fontWeight:'bold',paddingBottom:"20px"}}>Change History</p>
        <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>History Logs table provides users data on the modifications made by any users in the application data. It consists of Sr No, User Name, Time Stamp, Item modified, Table Name, Old Value and New Value columns.</p>
        
        <img src={historyi} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'70px',paddingBottom:'30px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  Change History Log Table
 </p>
        
        <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:"20px"}}>Admin will be able to check the history of any modifications made by users by selecting To Date and 
From Date and By Date can be selected in the date range menu.
</p>
<p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:"20px"}}>Click on the required dates from the Date view and Click on Submi</p>
        <img src={history1} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'70px',paddingBottom:'30px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Date Selection for Change History Log </p>
        </div>
    )
}

export default History