import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
//getting render file for rendering table data in render.js
import Render from "./Render.js";
//getting system threshold table for rendering in model status list component
import System from "../System/system.js";
import { TiArrowUnsorted } from "react-icons/ti";
//getting styles for styling the table
import "./model.Modules.css";
//getting image for displaying tick mark
import  tick from "./tick/tick.png";

import { useSelector } from "react-redux";

const Modelstatuslist = (props) => {
  const activeNo = useSelector((state)=>state.status.Sl_No)
  const [value, set_Value] = useState("");
  const [version, set_Version] = useState("");
  const [display, set_Display] = useState(false);
  const[mstatus,set_Mstatus]=useState([])
  const [y,set_y ]= useState(false)
const[z,set_z]=useState(false)

  
const getReqHandler = ()=>{
    axios
  .get('/status')
  .then(res=> {

 
  const x = []
  res.data.map(ele=>{
    x.push(<Render key={Math.random().toString()} itm={ele}  hsc={ handleStatusChange}/>)
  })
  set_Mstatus([...x])
 
  })
  .catch(err=>console.log(err))  
  
  }
  
  const [file, setFile] = useState([]);
      const [data, getFile] = useState({ name: "", path: "" });
      const [progress, setProgess] = useState(0);
      const el = useRef();
  
  
      const handlefilechange = (e) => {
        setProgess(0)
        const file = e.target.files;
        setFile(file)
    }
    
    const uploadFile = () => {
      if(value){
      for(var i= 0; i<file.length; i++){
        const formData = new FormData();
        formData.append('file', file[i])
        formData.append('value',value)
        formData.append('version',version)
        axios.post('/uploadfile', formData, {
         
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress)
            }
        }).then(res => {
            if(res.data==true){
            set_Display(true);
            }
            else if(res.data==false)
            {
              alert("Model/Version upload is already exits")
            }
            
             })
        }
       
  
          }
        }

const handleStatusChange=( )=>{
  set_y(!y)

}

   useEffect(()=>{

    getReqHandler()
   
    },[display,y])

    //rendering configuration page
  return (

    <>
      <div className="div-configpage">
        <h1>System Configuration </h1>
        <div className="div-model-1">
          <div className="tablecontainer">
            <h3>Model Status List</h3>
            <form className="form">
              <table className="table">
                <thead>
                  <tr>
                    <th className="th">
                      Sno
                      <TiArrowUnsorted />
                    </th>
                    <th className="th">Model</th>
                    <th className="th">Version</th>
                    <th className="th">LastUpdate</th>
                    <th className="th">Status</th>
                  </tr>
                </thead>
                <tbody>
          { mstatus}
          </tbody>
         
     
    
              </table>
            </form>
          </div>

          <div>

            <System hsc={y} mod={z} key={mstatus}  />
          </div>
        </div>

        {/* below is insertion page */}
        <div className="div-model-2">
          <div>
            <h3>Upload a model</h3>
            <div className="configupload">
              <div className="config-uploadmodel">
                <label className="option" for="value">
                Model Name
                </label>
                <br />
                <input
                  className="select"
                  type="text"
                  name="value"
                  placeholder="Enter a Model Name..."
                  required
                  onChange={(e) => set_Value(e.target.value.replace(/[^a-zA-Z\-\_ ]/g, ""))}
                  value={value}
                  maxlength="15"
                />
              </div>
              <div className="config-uploadmodel">
                <label className="option" for="version">
                  Version
                </label>
                <br />
                <input
                  className="select"
                  type="text"
                  name="version"
                  placeholder="Enter a Version..."
                  maxlength="8"
                  required
                  onChange={(e) => set_Version(e.target.value.replace(/[^\w\s\.]/gi, ""))}
                  value={version}
                />
              </div>

              <div className="fileupload">
                <div className="config-uploadmodel">
                  <label for="fileInput" className="option">
                    Upload file
                  </label>
                  <br />
                  <label htmlFor="fileInput">
                    <input
                      type="text"
                      value={file.length +  " files selected"}
                      placeholder="No file choosen"
                      className="select"
                    />

                    <span className="configbrowse"> Browse </span>
                  </label>

                  <input
                    type="file"
                    id="fileInput"
                    ref={el}
                    multiple
                    onChange={handlefilechange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <button
                onClick={uploadFile}
                type="submit"
                className="uploadbutton"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

      
        {/* below code is upload image */}

        {display ? (
          <>
            <div className="sucess"  onClick={()=>set_Display(false)} >
              <div className="abcdef">
                <img
                  className="sucesslogo"
                  src={tick}
                 
                />
                <div className="sucesstext">
                
                  Model has been uploaded successfully.
                </div>
               
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        
      </div>
    </>
  );
};
export default Modelstatuslist;