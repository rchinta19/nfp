

import React from "react";
import dashboard from '../../Assets/Help/dashboard.png'
import topmenu from '../../Assets/Help/topmenu.png'
import sidebar from '../../Assets/Help/sidebar.png'
import profile from '../../Assets/Help/profle.png'
import changep from '../../Assets/Help/changep.png'
import {
        useHistory
      } from "react-router-dom";
      import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Dash = () => {
        const history=useHistory();
    return(
        <div>
                <button onClick={() => history.push('/homeDashboard/help') } style={{position:"fixed",marginLeft:"10px",paddingRight:'3px'}}><ArrowBackIcon/>Back</button>
                <p className="h5" style={{paddingLeft:'80px',fontWeight:'bold',paddingBottom:"20px"}}>Dashboard</p>
                <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>The application has Dashboard that appears on the Homepage after Login is Successful. The user can
navigate to various Menu options on the left-hand side of the Application.  </p>
<p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>On Top Menu Bar of the application provides are options for the application. On the Top Menu Bar the
application Menu bar options are – File, Edit, View, Window and Help.  </p>
                <img src={topmenu} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',width:'100%',height:'100%'}}></img>
                <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Dashboard Menu Bar</p>
                <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>Menu Bar options</p>
                <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>The Home page provides side bar menu options to access Dashboard, Configuration, Change History,
and Help. Users can go to the required Menu options directly by clicking on the respective Menu
headings placed on the left-hand side.  </p>
                <img src={sidebar} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'370px',width:'40%',height:'100%'}}></img>
                <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',paddingLeft:'340px'}}>Figure: Dashboard Menu Bar</p>
                <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>Profile icon </p>
                <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>The Profile option is placed on the right-side-top on the Menu Bar. User can Click on the Icon to find 
Change Password and Logout Option.
headings placed on the left-hand side.  </p>
                <img src={profile} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',width:'50%',height:'100%'}}></img>
                <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',paddingLeft:'220px'}}>Figure: Change Password option </p>
                <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>Change Profile Password </p>
                <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>To change the Profile Login Password, follow the following steps:  </p>
                <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 1: Click on the Profile icon on the top corner</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 2: Click on ‘Change Password’ option
</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 3:  A pop-up for entering Passwords will appear</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 4: Enter the field for Current Password</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 5: Enter the field with the desired New Password. Re-enter the New Password
</p>
        <p style={{paddingLeft:'120px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Step 6: Click on Submit button
</p>
                <img src={changep} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',width:'50%',height:'100%'}}></img>
                <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',paddingLeft:'220px'}}>Figure:  Change Password Pop-up  </p>
                <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>Logout from the application</p>
                <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>To Logout from the application click on the Profile icon on the Top-Right-side of the page and Click on 
Logout  </p>
                <img src={profile} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',width:'600px',height:'400px'}}></img>
                <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',paddingLeft:'260px'}}>Figure:Logout </p>
                <p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px'}}>Dashboard Visualization Charts </p>
                <p style={{paddingLeft:'80px',fontSize:'15px',fontFamily:'Helvetica Neue'}}>Dashboard provides visualization charts of Inspection results for the specified filter conditions. Filter 
options include From & To Dates, Defect Types and Bottle Types. Sample Filtered output displayed
below: </p>
<p className="h6" style={{paddingLeft:'80px',fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold'}}>Types of Filters: </p>
<ol style={{fontSize:'15px',fontFamily:'Helvetica Neue',paddingLeft:'110px',paddingTop:'20px'}}>
<li style={{paddingBottom:'20px'}} >Filter by Date: The ‘From’ Date and ‘To’ Date can be selected to get defect data for the range of date.</li>
<li style={{paddingBottom:'20px'}}>Filter by Bottle Type: The Bottle type can be chosen from Type A and Type B.</li>
<li style={{paddingBottom:'20px'}}>Filter by Defect Type: The Defect Types that can be chosen are Scratch, Foreign Particles,
Discoloration and All.</li>
</ol>
<p className="h6" style={{paddingLeft:'80px',fontWeight:'bold',paddingBottom:'20px'}}>Steps to view Defects:</p>
        <p style={{paddingLeft:'40px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingLeft:'100px'}}>Step 1: Users can select From Date and To Date for the duration of defects to be displayed</p>
        <p style={{paddingLeft:'40px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingLeft:'100px'}}>Step 2: Select Bottle Type by checking on Tick boxes for Types of Bottles.</p>
        <p style={{paddingLeft:'40px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingLeft:'100px'}}>Step 3: User should select the tick boxes corresponding to Defect types: 1. Scratches 2. Foreign Particles 3. Discoloration</p>
        <p style={{paddingLeft:'40px',fontSize:'15px',fontFamily:'Helvetica Neue',paddingLeft:'100px',paddingBottom:'20px'}}>Step 4: Click on Submit button on the right hand side</p>
        <img src={dashboard} className="mx-auto img-fluid" alt="Responsive image" style={{paddingLeft:'80px',width:'100%',height:'100%'}}></img>
        <p className="h6" style={{fontFamily:'Helvetica Neue',paddingTop:'20px',fontWeight:'bold',paddingBottom:'10px',textAlign:'center'}}>Figure: Application Dashboard </p>
        </div>
    )
}

export default Dash;