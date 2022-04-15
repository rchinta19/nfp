import React ,{useState,useEffect} from "react";

//import rederhistory for rendering history log table
import Renderhistory from "./Renderhistorylog";

//import react icons
import { TiArrowUnsorted } from "react-icons/ti";

//mui style imports
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@material-ui/core";

//accessing state using useSelector in redux
import { useSelector } from "react-redux";

//getting styles for styling table
import './historylog.modules.css';
import axios from 'axios';

const Changedata = () =>{
  let fromdaydate = new Date().getFullYear() +  "-" +    pad2((new Date().getMonth() + 1)) +    "-" + pad2(new Date().getDate())   
  let todaydate =  new Date().getFullYear() +  "-" +    pad2((new Date().getMonth() + 1)) +    "-" +   pad2(new Date().getDate())
    const [from,set_From] = useState(fromdaydate);
    const [to,set_To] = useState(todaydate);

  const [historyData, set_HistoryData] = useState([]);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  
  //function for applying 0 before date,month and year
  function pad2(n) {

    return (n < 10 ? '0' : '') + n;

  }
  
  const nextPage = () => {
      setSkip(skip + limit)
      console.log("next"+skip)
      axios
      .post("/historyfilternextpage",
      {
        from:from,
        to:to,
        skip:skip,
        limit:limit
      } )
      .then((res) => {
        const hdfn = []
      res.data.map(ele=>{
      hdfn.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
      })
      set_HistoryData([...hdfn])
        
      })
      .catch(err=>console.log(err))  
      };

  

  const previousPage = () => {
      if(skip!=0){
        setSkip(skip-limit)
      console.log("previous"+ skip)
      axios
      .post("/historyfilterpreviouspage",
      {
        from:from,
        to:to,
        skip:skip,
        limit:limit
      } )
      .then((res) => {
        const hdfp = []
      res.data.map(ele=>{
      hdfp.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
      })
      set_HistoryData([...hdfp])
        
      })
      .catch(err=>console.log(err))  
      }
      else
      {setSkip(0)}
    
      };


useEffect(()=>{ 
      
  axios
  .post("/historydaydata",
  {
    from:from,
    to:to,
    skip:skip,
    limit:limit
  }
  )
  .then((res) => {
    const hd = []
    res.data.map(ele=>{
hd.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
})
set_HistoryData([...hd])
    
  })
  .catch(err=>console.log(err))  
  
},[skip, limit])


const applyFilterHandler = (e) => {
   
  axios
.post("/historyfilter",
{
  from:from,
  to:to,
  skip:skip,
  limit:limit
} )
.then((res) => {
  const hdf = []
res.data.map(ele=>{
hdf.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
})
set_HistoryData([...hdf])
  
})
.catch(err=>console.log(err))  
};

  return(
  <>
   <h1>Change History</h1>
<div className="history-filter">

<LocalizationProvider dateAdapter={AdapterDateFns}>
<DatePicker
               
                label="From Date"
                value={from}
                onChange={(newvalue)=>{
                  set_From(newvalue)
                  setSkip(0)
                  set_From((newvalue)=>{return `${newvalue.getFullYear()}-${pad2(newvalue.getMonth()+1)}-${pad2(newvalue.getDate())}`})
                }}
                renderInput={(params) => <TextField 
                  variant="outlined"
                  id="outlined-basic"
                  className="history-input" 
                  {...params} />}
                
              /> 
                       
<DatePicker
                label="To Date"
                value={to}
                className="dtpicker"
                onChange={(newvalue)=>{set_To(newvalue)
                  setSkip(0)
                  set_To((newvalue)=>{return `${newvalue.getFullYear()}-${pad2(newvalue.getMonth()+1)}-${pad2(newvalue.getDate())}`})
                }}
                renderInput={(params) => <TextField 
                  className="history-input"
                  variant="outlined"
                  id="outlined-basic"
                  {...params} />}
              />
  </LocalizationProvider>
  
     <button type="submit" className="history-submitbtn" onClick={applyFilterHandler} style={{cursor: "pointer"}} >
            Submit
          </button>
          </div>
  <div  className="historytable">
  <table >
              <thead >
                <tr>
                  <th className="thf">
                    S.No
                    <TiArrowUnsorted />
                    </th>
                  <th className="thf" >User Name</th>
                  <th className="thf">Time Stamp</th>
                  <th className="thf">Item Modified</th>
                  <th className="thf">Table Name</th>
                  <th className="thf">Old Value</th>
                  <th className="thf">New Value</th>
                </tr>
              </thead>
               <tbody>
                {historyData}
               </tbody>
            </table>
    </div>
            <div className="pages"> 
            <button onClick={previousPage}
            style={{backgroundColor:skip==0 ? "grey" : "#0f206c"}} 
             className="pagebutton" 
            disabled={skip==0 ? true : false} 
            > Previous Page </button>
            <button onClick={nextPage}  className="pagebutton" > Next Page </button> 
        </div>

 </>
  );
};

export default Changedata;