import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  typeA: [],
  typeB: [],
  typeC:[],
  typeD:[],
  typeE:[],
  typeF:[]
};
const dataSlice = createSlice({ 
  name: "dataSlice",
  initialState,
  reducers: {
      defectSettingHandler: (state, action) => {
      return {
        typeA: action.payload.typeA,typeB: action.payload.typeB,typeC: action.payload.typeC,typeD: action.payload.typeD,typeE: action.payload.typeE,typeF: action.payload.typeF
      };
    },
  },
});

export const { defectSettingHandler,ManagedLogging } = dataSlice.actions;
export default dataSlice.reducer;
