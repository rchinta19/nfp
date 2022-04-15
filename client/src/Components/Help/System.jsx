
import React from "react";
import model from "../../Assets/Help/system.png";
import edit from "../../Assets/Help/edit.png";
import active from "../../Assets/Help/active.png";
import {
  useHistory
  } from "react-router-dom";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const System = () => {
    const history=useHistory();
    return(
        <div>
             <button onClick={() => history.push('/homeDashboard/help') } style={{position:"fixed",marginLeft:"10px",paddingRight:'3px'}}><ArrowBackIcon/>Back</button>
             <p className="h5" style={{paddingLeft:'80px',fontWeight:'bold',paddingBottom:"20px"}}>System Configuration and Threshold</p>
        <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Clicking on Configuration tab will display the System configuration page. Here operator can check the
software model version currently active as well as the other models available. </p>
<ul style={{fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:"20px",paddingLeft:'100px'}}><li style={{paddingBottom:'20px'}}>Any models could be made active from the Model Status List by selecting the respective 
Checkbox in front of the Model serial number. The Model selected by a user will be moved to 
Active category </li>
<li style={{paddingBottom:'20px'}}>Model threshold values can be updated through this screen from System Threshold table on the
right side. For example, when Model A has selected, its threshold values are displayed on right
side table. User can modify and save the settings of the required Model & its respective
threshold settings, which will be recorded in log details. </li>
</ul>
        <img src={model} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  : System Configuration Tables  </p>
        <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>From the list of Models, user can activate a desired model by following these steps:</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 1: Click on Inactive status box under Status heading</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:'20px'}}>Step 2: A pop-up with confirmation request will appear. Click on Yes to Activate the selected Model</p>
        <img src={active} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  Active Status pop-up </p>
        <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>
The system threshold values for an active model can be set as per user discretion and acceptance. To edit system threshold values for an active model, here are the steps: 
</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 1: Click on Edit button under Action for the Active Model</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 2: Enter the required percentage values for Scratches, Foreign Particles & Discoloration</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:'20px'}}>Step 3: Click on Save</p>
        <img src={edit} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  System Threshold Values & Action   </p>
        </div>
    )
}

export default System;