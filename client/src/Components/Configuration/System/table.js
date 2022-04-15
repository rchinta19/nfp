import React from "react";
import { useState } from "react";
import "./table.modules.css";
import axios from "axios";
import { useSelector } from "react-redux";

//table component is responsible for rednering table 

const Table = (props) => {
  
  const defecttypes = 
    {Scratches:props.itm.Scratches,ForeignParticles:props.itm.Foreign_Particles, Discoloration:props.itm.Discoloration};
  

  const [edit, setedit] = useState(true);
  // const [editvalue, seteditvalue] = useState([defecttypes]);
 
  
      const [store, setstore] = useState(defecttypes);

      const activeNo =  useSelector(state => state.status.Sl_No)


  const handleEdit = () => {
  
    let Scratche = props.itm.Scratches.slice(0,-1)
    let ForeignParticle = props.itm.Foreign_Particles.slice(0,-1)
    let  Discoloratio = props.itm.Discoloration.slice(0,-1)
   
    setstore({Scratches:Scratche,ForeignParticles:ForeignParticle, Discoloration:Discoloratio})
    setedit(false);
  };
  const handleCancel = () => {
    setedit(true);
    setstore(defecttypes)
  };
  const handlesave = (e) => {
    if(store.Scratches.length!=0 && store.ForeignParticles.length!=0 && store.Discoloration.length!=0){
      if(store.Scratches.length<=3 && store.ForeignParticles.length<=3 && store.Discoloration.length<=3){
    // e.preventDefault();

    e.preventDefault();
    axios
    .post('/edit', {
       store,
      Sl_No:props.itm.Sl_No,
      
      
    })
    
  }else {
    alert("Threshold Values should not exceed morethan 100, Please enter the values between 1-100");
  }
}
else{
  alert("Threshold Values should not be empty, Please enter the values between 1-100");
}
    // window.location.reload()
    props.editinf()
    setedit(true);
    
// }
  };
  
  return (
  <>

    <tr>
      
      <td className="td"> {props.itm.Sl_No}</td>
      <td className="td">
     
     {edit ? (store.Scratches
       
     ) : (
       <>
       
         <input
           type="number"
            required
           style={{width:"60px"}}
           name="Scratches"
           //suffix={'%'}
            
            min="1"
            max="100" 
           value={ store.Scratches}
           onChange={(e) => setstore({...store,Scratches:e.target.value})
          }
         />
         
       </>
     )}
     
   </td>
    
      <td className="td"> 
     
     {edit ? (store.ForeignParticles
       
     ) : (
       <>
       
         <input
           type="number"
           required
           style={{width:"60px"}}
           name="ForeignParticles"
             max="100"
            min="1"
            //pattern="/[^0-9-%]/*"
            //pattern="^-?[0-9]\d*\.?\d*$"
         
           defaultValue={ store.ForeignParticles}
           onChange={(e) => setstore({...store,ForeignParticles:e.target.value})
          }
         />
         
       </>
     )}
     
   </td>
      
      {/* <td>{props.itm.Description}</td> */}
      <td className="td">
     
        {edit ? (store.Discoloration 
          
        ) : (
          <>
          
            <input
              type="number"
              required
              style={{width:"60px"}}
              name="Discoloration"
                max="100"
               min="1"
              defaultValue={ store.Discoloration }
              onChange={(e) => setstore({...store,Discoloration:e.target.value})
            }
            />
            
          </>
        )}
        
      </td>
      <td className="td">{props.itm.Model}</td>
      <td >
        {edit ? (<button onClick={(event) => handleEdit(event)} style={{color:"#005FFF",cursor:"pointer",alignItems:'center'}} >Edit</button>
         
        ) : ( <div >
          <button type="submit" 
          onClick={handlesave}
          className="editbutton"
          
          >
            Save
          </button>
          <button type="button" onClick={handleCancel}
          className="editbutton"
          >
            Cancel
          </button>
        </div>
          
        )}
      </td>   </tr>
    </>
  );
};

export default Table;