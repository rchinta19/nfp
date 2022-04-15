import React, { useState, useEffect } from "react";

//getting Renderdefectlog for rendering defectlog table data
import Renderdefectlog from "./Renderdefectlog";
////////////////////////////////////////////////////////////

//getting Icons from react-icons/ti
import { TiArrowUnsorted } from "react-icons/ti";
/////////////////////////////////////////////////

//getting useselector from redux for getting state
import { useSelector } from "react-redux";
//////////////////////////////////////////////////

//getting Defectlog.modules.css file for styling the table
import "./Defectlog.modules.css";
//////////////////////////////////////////////////////////

//getting axios for sending and receiving data from the server
import axios from "axios";
//////////////////////////////////////////////////////////////

//getting CSVLink library for exporting table data as csv file
import { CSVLink } from "react-csv";
//////////////////////////////////////////////////////////////

//getting ExporttoExcel custom component for exporting table data as Excel file
import {ExportToExcel} from "./ExportToExcel"
///////////////////////////////////////////////////////////////////////////////

const Defectlog = (props) => {
  //getting filter reducer and its states from redux
  const filterConditions = useSelector((state) => state.filter);

//Variables for managing the state of defectlog table
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [totalBottleCount, settotalBottleCount] = useState([]);
  const [ticked, setticked] = useState(false);
  const [vsc ,setvsc] = useState([])

  //File name for the excel file
  const fileName = "Defectlog";

  //label and keys for csv file generation
  const headers = [
    { label: "SNO", key: "SNO" },

    { label: "Time_Stamp", key: "Time_Stamp" },

    // { label: "Bottle_Type", key: "Bottle_Type" },

    { label: "Defect", key: "Defect" },

    { label: "Defect_Type", key: "Defect_Type" },

    { label: "Image", key: "Image" },

    { label: "Score", key: "Score" },

    { label: "Mark_False_Positive", key: "Mark_False_Positive" },
  ];
  
  //function for exporting data in csv format
  const csvReport = {
    data: vsc,

    headers: headers,

    filename: "Defectlog.csv",
    className:"exportbutton"
  };

  //function for handling checkbox in defectlog table
  const checkBoxSelectionHandler = (check, sno) => {
    let checkCondition = check;
    if (checkCondition == 0) {
      setticked(!ticked);
      axios
        .post("/markfalsepositiveto1", { SNO: sno })
        .then((res) => {
        });
    } else if (checkCondition == 1) {
      axios
        .post("/markfalsepositiveto0", { SNO: sno })
        .then((res) => {
        });
      setticked(!ticked);
    }
  };

  //Handling Next page button in Defectlog table for swithching to the next page
  const nextPage = () => {
    // if(skip==0){
    //   setSkip( 50 );
    //   console.log("next if"+skip)
    // }
    // else{
    // setSkip(skip + limit);
    // console.log("next else"+skip)
    // }
       
      setSkip(skip+limit)

      console.log("next"+skip)
      
    try {
      axios
        .post("/defectfilternextpage", {
          from: props.fromDate,
          to: props.toDate,
          skip: skip+50,
          limit: limit,
          filterConditions
        })
        .then((res) => {
          const dlfn = [];
          res.data.map((ele) => {
            dlfn.push(
              <Renderdefectlog key={Math.random().toString()} dlitm={ele}  selectHandler={checkBoxSelectionHandler}
              checkValue={ele.Mark_False_Positive}/>
            );
          });
          settotalBottleCount([...dlfn]);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  
  // else{
  //   alert("you are not able to enter into nextpage as it is the last page of the records");
  // }
  };

  //Handling Previous page button in Defectlog table for swithching to the previous page
  const previousPage = () => {
    if (skip) {
    //   setSkip(skip-limit)
    //   console.log("previous"+ skip)
      if(skip == limit){
        setSkip("0");
        console.log("previous if" + skip)
      }
      else{
        setSkip(skip - limit);
        console.log("previous else" + skip)
      }
      axios
        .post("/defectfilterpreviouspage", {
          from: props.fromDate,
          to: props.toDate,
          skip: skip-50,
          limit: limit,
          filterConditions
        })
        .then((res) => {
          const dffp = [];
          res.data.map((ele) => {
            dffp.push(
              <Renderdefectlog key={Math.random().toString()} dlitm={ele}  selectHandler={checkBoxSelectionHandler}
              checkValue={ele.Mark_False_Positive}/>
            );
          });
          settotalBottleCount([...dffp]);
        })
        .catch((err) => console.log(err));
    } else {
      setSkip(0);
    }
  };

  
//useEffect for getting and updating data from the server continously on dom manipulation
  useEffect(() => {
    axios
      .post(
        "/defectlogdaydata",
        {
          from: props.fromDate,
          to: props.toDate,
          skip: skip,
          limit: limit,
          filterConditions
        }
      )
      .then((res) => {
        setvsc(res.data)
        const ld = [];
        res.data.map((ele) => {
          ld.push(
            <Renderdefectlog
              key={Math.random().toString()}
              dlitm={ele}
              selectHandler={checkBoxSelectionHandler}
              checkValue={ele.Mark_False_Positive}
            />
          );
        });
        settotalBottleCount([...ld]);
        
      })
      .catch((err) => console.log(err));
  }, [ props.fromDate, ticked, filterConditions]);

  
  return (
    <>
      <h1>Recent Defect logs</h1>

      <div className="defecttable">
      <ExportToExcel className="exportbutton" apiData={vsc} fileName={fileName} />
        <>
          <CSVLink  {...csvReport}><button className="csvexport">Export to CSV</button></CSVLink>
        </>

        <table>
          <thead>
            <tr>
              <th className="thf">
                S.No
                <TiArrowUnsorted />
              </th>
              <th className="thf">Time Stamp</th>
              {/* <th className="thf">Bottle Type</th> */}
              <th className="thf">Defect</th>
              <th className="thf">Defect Type</th>
              <th className="thf">Image</th>
              <th className="thf">Score </th>
              <th className="thf">Mark False Postive</th>
            </tr>
          </thead>
          <tbody>{totalBottleCount}</tbody>
        </table>
      </div>
      <div className="pages">
        <button onClick={previousPage} className="pagebutton"  
        style={{backgroundColor:skip==0 ? "grey" : "#0f206c"}} 
            disabled={skip==0 ? true : false} 
            >
          {" "}
          Previous Page{" "}
        </button>
        <button onClick={nextPage} className="pagebutton">
          {" "}
          Next Page{" "}
        </button>
      </div>
    </>
  );
};

export default Defectlog;