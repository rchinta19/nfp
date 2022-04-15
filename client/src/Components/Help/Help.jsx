
import * as React from 'react';

//getting styles from Help.modules.css
import "./Help.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

//getting table of contents of help page and its pages
import Login from "./Login";
  import System from "./System";
  import  Model from "./Model";
  import Dash from "./Dash"
  import Defect from "./Defect";
  import History from "./History"
  export default function ModalGalleryExample() {
    return (
      <Router>
        <ModalSwitch />
      </Router>
    );
  }
  
  function ModalSwitch() {
    let location = useLocation();
    let background = location.state && location.state.background;
  
    return (
      <div>
        <Switch location={background || location}>
          <Route exact path="/homeDashboard/help" children={<Home />} />
          <Route path="/homeDashboard/login" children={<Login/>} />
          <Route path="/homeDashboard/Dash" children={<Dash />} />
          <Route path="/homeDashboard/Defect" children={<Defect />} />
          <Route path="/homeDashboard/System" children={<System />} />
          <Route path="/homeDashboard/Model" children={<Model />} />
          <Route path="/homeDashboard/History" children={<History />} />
        </Switch>
  
      </div>
    );
  }
  
  
  function Home() {
    return (
      <div class="container">
      <p style={{fontWeight:'bold',fontSize:"24",fontFamily:'Helvetica Neue'}} class="h3">INTRODUCTION: </p>
      <p style={{fontSize:'15px',fontFamily:'Helvetica Neue'}}> The Defect Detection system swiftly identifies defects in the product using deep learning technology and advanced machine vision, assisting NFPC in cost reduction and improved customer satisfaction. The deep learning approach enables application to learn and discriminate between images of Good and Bad or Defected and Acceptable. With its seamless integration with Machine Vision components, software is enabled with rapid surface defect detection and qualification. </p>
      <p style={{fontSize:'15px',fontFamily:'Helvetica Neue'}}> The AI Interface Application is a hosted HTML web application for viewing the system performance reports and configuring AI/ML model. The application is a very user friendly, intuitive and provides deeper insights into the Defect Detection process.   </p>
      <p style={{fontSize:'15px',fontFamily:'Helvetica Neue'}}> The application is designed and coded after an extensive research and development into the product manufacturing system process. It provides NFPC support in scaling their manufacturing process, in this case water bottle packaging.     </p>
      <p style={{fontSize:'15px',fontFamily:'Helvetica Neue'}}> This will be hosted in the same server controller and are recommended to use only when the Visual Inspection System is not running. Accessing the Web Reports when the system is Live can impact the performance of the Inspection process.     </p>
      <p style={{fontSize:'15px',fontFamily:'Helvetica Neue'}}> The purpose of this Help document is to provide Users with initial guidance for easy understanding of the usage of this application.      </p>
      <nav>
      <p style={{fontWeight:'bold',paddingBottom:"20px",fontSize:"24",fontFamily:'Helvetica Neue'}} class="h3">TABLE OF CONTENTS FOR HELP</p>
        <ul class="list-group">
          <li class="list-group-item">
            <Link to="/homeDashboard/login">Login </Link>
          </li>
          <li class="list-group-item">
            <Link to="/homeDashboard/Dash">Dashboard</Link>
          </li>
          <li class="list-group-item">
            <Link to="/homeDashboard/Defect">Defect Log Table</Link>
          </li>
          <li class="list-group-item">
            <Link to="/homeDashboard/System">System Configuration and Threshold</Link>
          </li>
          <li class="list-group-item">
            <Link to="/homeDashboard/Model">Model Upload</Link>
          </li>
          <li class="list-group-item">
            <Link to="/homeDashboard/History"> Change History</Link>
          </li>
        </ul>
      </nav>
</div>
    );
  }
