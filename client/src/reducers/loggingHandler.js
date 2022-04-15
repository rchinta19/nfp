import {createSlice} from '@reduxjs/toolkit'
const initialState={
    UserPresent:false,
    UserName:"",
}
const loggingSlice = createSlice({
    name:"logging",
    initialState,
    reducers:{
        LoggingUser:(state,action)=>{
            return {
                ...state,UserPresent:action.payload.UserPresent,currentPath:action.payload.path,UserName:action.payload.UserName
            }
        },

    }
})
export const {LoggingUser} = loggingSlice.actions;
export default loggingSlice.reducer;