import { AppBar } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import "./Sidenav.modules.css";
import { Link } from "react-router-dom";
import { MdOutlineHistoryEdu } from "react-icons/md";
import styled from "styled-components";
import ImportExportIcon from '@mui/icons-material/ImportExport';
const StyledLink = styled(Link)`
   text-decoration: none;
   text-align:center;
    &:hover, &:active,  &:focus {
      color: rgb(180, 124, 233);
    }
`;
export default function Sidenav(props) {
  return (
    <div className="sidenav">
      <div>
        <StyledLink to="/homeDashboard/Dashboard">
          <DashboardIcon className="nav-icont-c" />
          <h3>Dashboard</h3>
        </StyledLink>
      </div>
      <div>
        <StyledLink to="/homeDashboard/Configuration">
          <SettingsApplicationsIcon />
          <h3>Configuration</h3>
        </StyledLink >
      </div>
      <div>
        <StyledLink to="/homeDashboard/History">
          <MdOutlineHistoryEdu />
          <h3>Change History</h3>
        </StyledLink >
      </div>
      {/* <div>
       <StyledLink  to="/homeDashboard/import">
       <ImportExportIcon/>
         <h3>Import</h3>
       </StyledLink >
     </div> */}
      <div>
        <StyledLink to="/homeDashboard/help">
          <HelpIcon />
          <h3>Help</h3>
        </StyledLink >
      </div>
    </div>
  );
}
