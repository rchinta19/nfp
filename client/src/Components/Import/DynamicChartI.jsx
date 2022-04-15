import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels'


const VerticalBarI = () => {
  const defectTypesAndCount = useSelector((state) => state.dataset.typeF);
  const lables = [];
  const dataset= [{
    label: `Discoloration`,
    data: [],
    backgroundColor: "rgba(255, 99, 130, 0.8)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth:0.8,
    stack: "Stack 1",//rgba(255, 99, 132, 0.2),rgba(255, 99, 132, 1)
  },{
    label: 'Foreign Particles',
    data: [],
    backgroundColor: "rgba(54, 162, 235, 0.8)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth:0.8,
    stack: "Stack 1",
  },{
    label: 'Scratches',
    backgroundColor: "rgba(153, 102, 255, 0.8)",
    borderColor: "rgba(153, 102, 255, 1)",
    borderWidth:0.8,
    data: [],
   
    stack: "Stack 1",
  }]
  
  try {
    defectTypesAndCount.forEach(ele=>{
     
          dataset.forEach((item,index)=>
              {
              if(item.label===ele.Defect_Type){
                  if(lables.includes(ele.Bottle_Type)){
                    
                  }
                  else{
                    lables.push(ele.Bottle_Type)
                  }
                  dataset[index].data.push(ele.count)
                return 
              }
              return

          }
          )

      
  })
  } catch (err) {
    console.log(err);
  }
  console.log(dataset);
  //
  console.log(dataset)

  const data = {
    labels: lables,
    datasets: dataset,
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {

  datalabels: {

    backgroundColor: function(context) {

      return context.dataset.backgroundColor;

    },

    borderRadius: 4,

    color: 'white',

    font: {

      weight: 'bold'

    },

    formatter: Math.round,

    padding: 6

  }

},

  };
  return (
    <>
      <Bar data={data} options={options}  plugins={[ChartDataLabels]}/>
    </>
  );
};

export default VerticalBarI;
