import {createSlice} from '@reduxjs/toolkit';
const initialState={
  Model:"",
  Scratches:"",
  ForeignParticles:"",
  Discolortion:"",
  Others:"",
  Sno:"",
};
const SystemSlice = createSlice({
    name:"systemdata",
    initialState,  
reducers:{
    Systemdata:(state, action) => {
        return {
          Model: action.payload.Model,
          Scratches:action.payload.Scratches,
          ForeignParticles:action.payload.ForeignParticles,
          Discoloration:action.payload.Discoloration,
          Others:action.payload.Others,
          Sno:action.payload.Sno
        };
    }
}
})
export const {Systemdata} = SystemSlice.actions;
export default SystemSlice.reducer;