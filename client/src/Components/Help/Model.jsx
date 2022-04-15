import React from "react";
import upload from "../../Assets/Help/model.png";
import success from "../../Assets/Help/success.png";
import browse from "../../Assets/Help/browse.png"
import {
    useHistory,
  } from "react-router-dom";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Model = () => {
    const history=useHistory();
    return(
        <div>
            <button onClick={() => history.push('/homeDashboard/help') } style={{position:"fixed",marginLeft:"10px",paddingRight:'3px'}}><ArrowBackIcon/>Back</button>
            <p className="h5" style={{paddingLeft:'100px',fontWeight:'bold',paddingBottom:"20px"}}>Model Upload</p>
        <p style={{paddingLeft:'100px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>The AppsTek AI Software can even upload the updated model or new models as the models evolve for
better futuristic outlook and performance:</p>
<ul style={{fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:'20px',paddingLeft:'120px'}}>
<li style={{paddingBottom:'20px'}}>This can be done here by giving a model name, version, attach the model file and finally click on
upload. </li>
<li style={{paddingBottom:'20px'}}>The latest model will be added in the model status list and click on status to switch the latest
model as active. </li>
<li style={{paddingBottom:'20px'}}>User can set the Defect Detection Threshold Range for Models as per requirement </li>
    </ul>
        <img src={upload} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'100px',paddingBottom:'20px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  Upload a Model 
   </p>
        <p className="h6" style={{paddingLeft:'100px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>To Upload a new Model into the system, user needs to follow these steps:</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 1: Enter a Model Name under the New Model Name</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 2: Enter the model version under - Version under Version</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 3: Now to upload the Model file, click on Browse button</p>
        
        <img src={browse} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'70px',paddingBottom:'30px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  File browse pop-up for New Model Upload 
  </p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:'20px'}}>Step 4:A pop-up will appear for user to select the Model File from file location. Then, Select the required Model File. Click on Open.</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingBottom:'20px'}}>Step 5:Click on Upload button</p>
        <img src={success} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'100px',height:'100%',width:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: New Model Upload Success pop-up </p>
        <p style={{paddingLeft:'100px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingTop:'20px',paddingBottom:'20px'}}>User will get a pop-up confirmation once a new Model has been successfully uploaded to the system.</p>
        </div>
    )
}

export default Model;