import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//getting charts from their respective path for rendering graphs in one component
import DynamicChart from "./DynamicChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import axios from "axios";
///////////////////////////////////////////////////////

//getting defectlog table for displaying defectlog table
import DefectsTable from "../Defectlog/DefectLog";
//

//getting mui styles required for the project
import {
  FormGroup,
  Checkbox,
  Paper,
  FormControlLabel,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { filterHandler } from "../../../reducers/filter/filterSlice";
import { defectSettingHandler } from "../../../reducers/DatesettingSlice";
import "./Dashboard.modules.css";
import { makeStyles } from "@material-ui/core/styles";
//////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
 yellowPaper: {
  marginLeft:"12px",
  marginRight:'12px'
  },
}));


function Dashboard() {
  const classes = useStyles();

  const filterConditions = useSelector((state) => state.filter);
  const [tab, settab] = useState(true);
  const x = new Date();
  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  let givenDate = `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`;
  const [value, setValue] = useState({ fromd: givenDate, tod: givenDate });
  const [checkStates, setCheckStates] = useState([
    // true,
    true,
    true,
    true,
    true,
  ]);
  const [checkedValues, setCheckedValues] = useState({
    fromDate: givenDate,
    toDate: givenDate,
    // typeA: checkStates[0],
    // typeB: checkStates[1],
    Scratches: checkStates[0],
    Discoloration: checkStates[1],
    "Foreign Particles": checkStates[2],
    Others: checkStates[3],
    All: false,
  });

  

  const dispatch = useDispatch();

  const [table, setTable] = useState(true);
  
  const [disable, SetDisableButton] = useState(false);
  const applyFilterHandler = (e) => {
    if(checkStates[0]==true||checkStates[1]==true||checkStates[2]==true||checkStates[3]==true){
    SetDisableButton((prev) => !prev);
    dispatch(filterHandler({ ...checkedValues }));
    console.log(filterConditions);
    axios.post("/data/filter", checkedValues).then((res) => {
      console.log("here");
      console.log(res.data);
      dispatch(
        defectSettingHandler({
          typeA: res.data[0],
          typeB: res.data[1],
          typeC: res.data[2],
          typeD: res.data[3],
        })
      );
      SetDisableButton((prev) => !prev);
    });
  }
  else{
    alert("Please select atleast one check box")
  }
  };
  
  
  useEffect(() => {
    dispatch(filterHandler({ ...checkedValues }));
    axios.post("/data/filter", {...checkedValues,fromDate:`${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`,toDate:`${x.getFullYear()}-${pad2(x.getMonth()+1)}-${pad2(x.getDate())}`}).then((res) => {
      console.log("here");
      console.log(res.data);
      dispatch(
        defectSettingHandler({
          typeA: res.data[0],
          typeB: res.data[1],
          typeC: res.data[2],
          typeD: res.data[3],
        })
      );
    });
  },[]);
  return (
    <Grid container xs={12}>
        <Grid XS={12}>
<h1>Dashboard</h1>
</Grid>
      <Grid xs={12}>
        <Paper elevation={3} className={classes.yellowPaper}>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
               className="dtpicker"    
                label="From Date"
                value={value.fromd}
                sx={{ backgroundColor: "black" }}
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, fromd: value };
                  });
                  setCheckedValues({
                    ...checkedValues,
                    fromDate: `${value.getFullYear()}-${pad2(
                      value.getMonth() + 1)
                    }-${pad2(value.getDate())}`,
                  });
                  setValue((prev) => {
                    return {
                      fromd: `${value.getFullYear()}-${pad2(
                        value.getMonth() + 1)
                      }-${pad2(value.getDate())}`,
                      ...prev,
                    };
                  });
                }}
                renderInput={(params) => <TextField  className="defect-input" variant="outlined"
                id="outlined-basic" {...params} />}
              />
              <DatePicker
              
                label="To Date"
                value={value.tod}
                className="dtpicker"
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, tod: value };
                  });
                  setCheckedValues({
                    ...checkedValues,
                    toDate: `${value.getFullYear()}-${pad2(
                      value.getMonth() + 1)
                    }-${pad2(value.getDate())}`,
                  });
                  setValue((prev) => {
                    return {
                      tod: `${value.getFullYear()}-${pad2(
                        value.getMonth() + 1)
                      }-${value.getDate()}`,
                      ...prev,
                    };
                  });
                }}
                renderInput={(params) => <TextField  className="defect-input" variant="outlined"
                id="outlined-basic"
                 {...params} />}
              />
            </LocalizationProvider>
          </div>
          {/* <FormGroup className="checks">
            Bottle Types
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="TypeA"
                onChange={(e) => {
                  setCheckedValues((prev) => {
                    return { ...prev, typeA: !prev.typeA };
                  });
                  setCheckStates((prev) => {
                    let x = [...prev];
                    x[0] = !x[0];
                    return [...x];
                  });
                }}
                checked={checkStates[0]}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="TypeB"
                onChange={(e) => {
                  setCheckedValues((prev) => {
                    return { ...prev, typeB: !prev.typeB };
                  });
                  setCheckStates((prev) => {
                    let x = [...prev];
                    x[1] = !x[1];
                    return [...x];
                  });
                }}
                checked={checkStates[1]}
              />
            </div>
          </FormGroup> */}
          <FormGroup className="checks">
            <span> Defect Types</span>
            <div>
              <FormControlLabel
                control={<Checkbox />}
                label="Scratches"
                onChange={(e) => {
                  setCheckedValues((prev) => {
                    return { ...prev, Scratches: !prev.Scratches };
                  });
                  setCheckStates((prev) => {
                    let x = [...prev];
                    x[0] = !x[0];
                    return [...x];
                  });
                }}
                checked={checkStates[0]}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Foreign Particles"
                onChange={(e) => {
                  setCheckedValues((prev) => {
                    return {
                      ...prev,
                      "Foreign Particles": !prev["Foreign Particles"],
                    };
                  });
                  setCheckStates((prev) => {
                    let x = [...prev];
                    x[1] = !x[1];
                    return [...x];
                  });
                }}
                checked={checkStates[1]}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Discoloration"
                onChange={(e) => {
                  setCheckedValues((prev) => {
                    return { ...prev, Discoloration: !prev.Discoloration };
                  });
                  setCheckStates((prev) => {
                    let x = [...prev];
                    x[2] = !x[2];
                    return [...x];
                  });
                }}
                checked={checkStates[2]}
              />
               <FormControlLabel
                control={<Checkbox />}
                label="Others"
                onChange={(e) => {
                  setCheckedValues((prev) => {
                    return { ...prev,Others: !prev.Others };
                  });
                  setCheckStates((prev) => {
                    let x = [...prev];
                    x[3] = !x[3];
                    return [...x];
                  });
                }}
                checked={checkStates[3]}
              />
            </div>
          </FormGroup>
          <Button
            type="submit"
            className="dashboard-submitbtn"
            onClick={applyFilterHandler}
            disabled={disable}
          >
            Submit
          </Button>
        </Paper>
        <div style={{padding:"11px",display:"flex"}}>
        <button className="graphs" onClick={() => settab(true)}  style={ tab ? { backgroundColor:'#0f206c',width:"50vw",height:"5vh",color:'white',cursor: "pointer"} : {backgroundColor:'grey',width:"50vw",height:"5vh",color:'black',fontWeight:'bold',cursor: "pointer"}} >Graphs</button>



<button className="defect" onClick={()=>settab(false)} style={ tab ? {backgroundColor:'grey',width:"50vw",height:"5vh",color:'black',fontWeight:'bold',cursor: "pointer"}: { backgroundColor:'#0f206c',width:"50vw",height:"5vh",color:'white',cursor: "pointer"} } >Defect log table</button>
</div>
      </Grid>

      {tab ? (
        <>
          <Grid xs={4}>
            <Paper className="bar-chart" >
              {disable ? <div class="loader">
  <div class="outer"></div>
  <div class="middle"></div>
  <div class="inner"></div>
</div>: <DynamicChart />}
            </Paper>
          </Grid>
          {table ? (
            <>
              <Grid xs={4}>
                <Paper className="bar-chart ">
                  {disable ? <div className="spinner"></div> : <PieChart />}
                </Paper>
              </Grid>
              <Grid xs={4}>
              
                <Paper className="bar-chart">
                  {disable ? (
                    <div class="balls">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <span className="harsha">
                    <LineChart />
                    </span>
                    )}
                </Paper>
              </Grid>
            </>
          ) : (
            <Grid xs={6}>
              <Paper className="bar-chart">
              </Paper>
            </Grid>
          )}
        </>
      ) : (
        <Grid xs={12}>
          <DefectsTable
            fromDate={checkedValues.fromDate}
            toDate={checkedValues.toDate}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default Dashboard;
