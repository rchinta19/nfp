import React from "react";
import defectimage from "../../Assets/Help/defectimage.png";
import defectlog from "../../Assets/Help/defectlog.png"
import {
        BrowserRouter as Router,
        Switch,
        Route,
        useHistory,
        Redirect,
        withRouter,
      } from "react-router-dom";
      import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Defect = () => {
        const history=useHistory();
    return(
        <div>
                <button onClick={() => history.push('/homeDashboard/help') } style={{position:"fixed",marginLeft:"10px",paddingRight:'3px'}}><ArrowBackIcon/>Back</button>
                
                <p className="h5" style={{paddingLeft:'100px',fontWeight:'bold',paddingBottom:"20px"}}>Defect Log Table </p>
        <p style={{paddingLeft:'100px',fontSize:'15px',fontFamily:'Helvetica Neue'}}> User can find the list of recent Defects in a Log Table by clicking on the Defect Log Table option next to Graphs option.</p>
        <ul style={{fontSize:'15px',fontFamily:'Helvetica Neue',paddingLeft:'120px'}}>
        <li style={{paddingBottom:'20px'}}>Here user can view the details such as Sr No, Time Stamp, Bottle Type, Defect, Defect Type, Image, Score and Mark False Positive in a tabular format. </li>
<li style={{paddingBottom:'20px'}}>The image thumbnail will show us the defect bottle image. Manually operator can review the defect
type w.r.to defect image. </li>
<li style={{paddingBottom:'20px'}}>If there is any false detection by the system, operator can update the result as false positive. This will
help to improve the detection accuracy of the system. Whenever false positive button is pressed, it
turns Red, indicating correction is done </li>

<li style={{paddingBottom:'20px'}}>The Defect Log Interfaces are primarily used during the training of AI Model by the system
engineers.</li>
        </ul>
        <p style={{paddingLeft:'100px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>These reconciliation activities pertain to correction of the predictions in improving the accuracy of the
model. As the Model gets trained with identifying right defects, it will become more accurate and
efficient moving forward.</p>
<img src={defectlog} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'100px',height:'100%',width:'100%'}}></img>
<p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Defect Log Table </p>
<p style={{paddingLeft:'100px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>User can view the image by clicking on the thumbnail under the Image column for respective instances</p>
<img src={defectimage} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'100px',height:'100%',width:'100%'}}></img>
<p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Expanded thumbnail of defects </p>
<p style={{paddingLeft:'100px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingTop:'20px',paddingBottom:'20px'}} >User can Export the data in an Excel Sheet or a CSV format by clicking on the respective Export buttons.User can export up to 100 defects on clicking on export buttons</p>
<img src={defectlog} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'100px',height:'100%',width:'100%'}}></img>
<p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure:  Export buttons  </p>
        </div>
    )
}

export default Defect;