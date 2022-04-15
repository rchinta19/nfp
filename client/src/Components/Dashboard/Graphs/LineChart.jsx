import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels'

const LineChart = () => {
  const defectTypesAndCount = useSelector(state => state.dataset.typeB)
  const lables = []
  const dataset = []
  const clrs= []
  try{
   defectTypesAndCount.map((ele,index)=>{
    lables.push(ele.TimeStamp)
    dataset.push(ele.TotalCount)
  })
}catch(err){
  console.log(err)
}
  const data = {
    labels: lables,
    datasets: [
      {
        label: "Defects Count",
        data: dataset,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 9, 136, 1)",
        // margin:"5px",
         tension:0.3,
         pointStyle: "circle",
  //        config: {
  //         lineWidth: 100000,
  //          drawCircles: false,
  //         drawFilled: false,
  //         drawLabels: false,
  //         drawValues: false,
  //         // color: processColor('blue'),
  //         // fillColor: processColor('blue'),
  //         xEntrySpace: 1000,
  //         // yEntrySpace: 10,
  //  }
      },
    ],
  };
  
  const options = {
    responsive:false,
    maintainAspectRattio:false,
  //   layout: {
  //     padding: 9,
  //     margin:2000
  // },
    // lables:{
    //   margin:"20px",
    //   backgroundColor:"red",
    // },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          afterFit:function(scale){
          scale.width=2000}
        },
      ],
    },
    plugins: {

      datalabels: {

        backgroundColor: function(context) {

          return context.dataset.backgroundColor;

        },

        borderRadius: 50,
          
        color: 'white',

        font: {

          weight: 'bold'

        },

        formatter: Math.round,
// margin:"10%",
// backgroundColor:"red",

        padding: 6

      }

    },
  };
  return(
  <>
  {/* classsName="line-g"   */}
  <div style={{overflow:"scroll",width:"350px",marginLeft:"10px"}}>
    <Line  style={{overflow:"scroll",width:"500px"}}
     data={data} options={options}
    plugins={[ChartDataLabels]}
     />
     </div>
  </>
  )
};

export default LineChart;
