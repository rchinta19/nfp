import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';
import { useDispatch} from "react-redux";
import DynamicChartI from "./DynamicChartI";
import PieChartI from "./PieChartI";
import LineChartI from "./LineChartI";

// import DefectsTable from "./DefectLog.jsx";
import {
  Paper,
  Grid,
} from "@mui/material";
// import { yellow } from '@mui/material/colors'
// import { filterHandler } from "../../features/filter/filterSlice";
import { defectSettingHandler } from "../../reducers/DatesettingSlice";
import * as d3 from "d3";

import "../Dashboard/Graphs/Dashboard.modules.css";

const buttonRef = React.createRef();

const Import=()=> {
  const [tab, settab] = useState(true);
  const [table, setTable] = useState(true);
  const[Data,setData]=useState([])
  const dispatch = useDispatch();
  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

 const handleOnFileLoad = (data) => {
   
  dispatch(
    defectSettingHandler({
      typeD: data,
      typeE: data,
      typeF: data,
    })
  );
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };




    return (
      <Grid container xs={12}>
        <Grid xs={12}>
        <h5>Basic Upload</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
          onRemoveFile={handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                onClick={handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '40%',
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Browse file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%',
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
        </Grid>
        {tab ? (
        <>
          <Grid xs={4}>
            <Paper className="bar-chart" >
      <DynamicChartI />
            </Paper>
          </Grid>
          {table ? (
            <>
              <Grid xs={4}>
                <Paper className="bar-chart ">
                    <PieChartI />
                </Paper>
              </Grid>
              <Grid xs={4}>
                <Paper className=" bar-chart">
                    <LineChartI />
                </Paper>
              </Grid>
            </>
          ) : (
            <Grid xs={6}>
              <Paper className="bar-chart">
                {/* <DefectLogTables /> */}
              </Paper>
            </Grid>
          )}
        </>
      ) :""}

      </Grid>
    );
  }
 export default Import