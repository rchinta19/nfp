import React,{useState} from "react";
//getting styles for styling the table data
import './Defectlog.modules.css';

//getting mui styles
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import CloseIcon from '@mui/icons-material/Close';

//assigning a variable for 
const PF = "http://localhost:1919/Images/";

//styling for model in the image rows in defectlog table
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

//styling for background of the image in model
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

//styling for width and height of the model in image column
const style = {
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};


//getting data from defectlog table component as props and rendering it
const Renderdefectlog = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("4"+ props.dlitm.Image)
  return (
    <tr>
      <td className="tdf"> {props.dlitm.SNO}</td>
      <td className="tdf">{props.dlitm.Time_Stamp}</td>
      {/* <td className="tdf" style={(props.dlitm.Bottle_Type=="typeA" )? {color:"Green"} : {color:"blue"}}>{props.dlitm.Bottle_Type}</td> */}
      <td className="tdf">{props.dlitm.Defect}</td>
      <td className="tdf" style={(props.dlitm.Defect_Type=="Scratches" ) ? 
       ({color:"Green"} )
       : 
      (
      
      (props.dlitm.Defect_Type=="Discoloration" ) ? 
       {color:"red"} 
       : 
       ( (props.dlitm.Defect_Type=="Foreign Particles" ) ? 
       {color:"blue"} 
       :{color:"violet"} ))
      
   } >{props.dlitm.Defect_Type}</td>
      <td className="tdf"><div className="image"><button type="button" onClick={handleOpen}><img className="dli" src={PF+props.dlitm.Image}  alt="" style={{border:"1px solid #ddd",borderRadius:"4px",padding:'5px',width:'30px'}}/></button><StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <button onClick={(e)=>setOpen(false)} style={{float: "right",color:"red"}}> <CloseIcon  /> </button>
        {/* <img  src={PF+`${props.dlitm.Image}`}  alt="" style={{height:'100%' ,width:'100%' }} /> */}
        {/* <img  src={`http://localhost:1919/Images/defect1.png`}  alt="" style={{height:'100%' ,width:'100%' }} /> */}
        <img  src={`http://localhost:1919/Images/${props.dlitm.Image}`}  alt="No Image" style={{height:'100%' ,width:'100%' }} />

        </Box>
      </StyledModal>
    </div></td>
      <td className="tdf">{props.dlitm.Score1}</td>
      <td className="tdf"><input type="checkbox" id="topping" name="topping" style={{cursor:'pointer'}} value={props.dlitm.Mark_False_Positive} onChange={()=>{props.selectHandler(props.dlitm.Mark_False_Positive,props.dlitm.SNO)}} checked={props.checkValue==0?false:true} /></td>
    </tr>
  );
};

export default Renderdefectlog;
