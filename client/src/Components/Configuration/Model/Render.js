import React  from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
//mui design files
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
//////////////////////////////////////////


//getting system data reducer for passing data to threshold table
import { Systemdata } from "../../../reducers/systemredux";
/////////////////////////////////////////////////////////////////


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  height:135,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};
const Render = (props) => {
  const [open, set_Open] = React.useState(false);
  const handleOpen = () => {
    if(props.itm.Status=="Inactive"){
    set_Open(!open)}
    else{
      alert("Model already is in Active State ")
    }
  };
  const handleClose = () => set_Open(false);
  const dispatch = useDispatch()
  // const activeNo =  useSelector(state => state.status.Sl_No)
const handletoggle = () => {
  
  axios.post("/updatestatus",{Sl_No:props.itm.Sl_No }).then((res) =>{
      props.hsc()
   })
    .catch((err)=>{console.log("status is not updated")})
  };


  const handlethresholdvalues = () =>{

    if (props.itm.Status=="Active"){

      alert("Selected Model Threshold values are already displayed as it is a active model")

    }else{

      axios.post('/tableseevlues',{model:props.itm.Model})

       .then(res=> {

      dispatch(Systemdata({Model:res.data[0].Model,Scratches:res.data[0].Scratches,ForeignParticles:res.data[0].Foreign_Particles,Discoloration:res.data[0].Discoloration,Sno:res.data[0].Sl_No})) 

      })

      .catch(err=>console.log(err))  

      }

    }
  
   return (
    <tr>
      <td className="td"> {props.itm.Sl_No }</td>
      <td className="td" onClick={handlethresholdvalues} style={{cursor:"pointer"}}>{props.itm.Model}</td>
      <td className="td">{props.itm.Version }</td>
      <td className="td">{props.itm.Last_Update }</td>
      <td>
      {/* if( props.itm.Status=="Inactive") */}
      {/* { */}
      {  
      <div className="tda" onClick={handleOpen} style={(props.itm.Status=="Active" )? {color:"Green"} : {color:"red"}} >{props.itm.Status}
      {
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        onBackgroundClick={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <p>Do You Want To Change The Status of Model?</p>
        <button onClick={handletoggle} style={{color:"white",backgroundColor:"green",height:"35px",width:"100px",marginLeft:"8rem",marginTop:"10px",cursor:"pointer"}}> Yes </button>
        <button  onClick={(e)=>set_Open(!open)} style={{color:"white",backgroundColor:"red",height:"35px",width:"100px",cursor:"pointer"}}> No </button>
        </Box>
      </StyledModal>}
      </div>}
      {/* } */}
      </td>
      {/* // :(< div className="tda"  style={(props.itm.Status=="Active" )? {color:"Green"} : {color:"red"}}>active</div>) }</td> */}
      </tr>
     );
    };

export default Render;