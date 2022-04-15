import React from 'react'
//getting xlsx and filesaver for generating excel file and also saving  locally
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

//ExporttoExcel component for exporting data in excel format
export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };


  //these component will render export to excel button for generating excel file
  return (
    <button onClick={(e) => exportToExcel(apiData, fileName)} className='excelexport'>Export to Excel</button>
  );
};