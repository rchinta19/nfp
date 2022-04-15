import {createSlice} from '@reduxjs/toolkit'
const initialState={
    Sl_No:"",
}
const statusSlice = createSlice({
    name:"statusSlice",
    initialState,
    reducers:{
        Modelstatus:(state,action)=>{
            return {
                ...state,Sl_No:action.payload.sno
            }
        },

    }
})
export const {Modelstatus} = statusSlice.actions;
export default statusSlice.reducer;