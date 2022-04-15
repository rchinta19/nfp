import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChartI = () => {

  const defectTypesAndCount = useSelector(state => state.dataset.typeD)
  console.log(defectTypesAndCount)
  const lables = []
  const dataset = []
  // const clrs= []
  const count = defectTypesAndCount.filter(item => item.Scratches).length
  console.log(count);

  try{
  defectTypesAndCount.map((ele,index)=>{
    lables.push(ele.Defect_Type)
    dataset.push(ele.filter(index.Defect_Type).length)
  })
}catch(err){
  console.log(err)
}
  const data = {
    labels: lables,
    datasets: [
      {
        label: '# of Votes',
        data: dataset,
        //render: 'percentage',
        //fontColor: ['green', 'white', 'red'],
        //precision: 2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
         // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  
  };
 var options = {
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        let datasets = ctx.chart.data.datasets;

        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
          let sum = datasets[0].data.reduce((a, b) => a + b, 0);
          var percentage = Math.round((value / sum) * 100) + "%";
          return percentage;
        } else {
          return percentage;
        }
      },
      color: 'white',

    font: {

      weight: 'bold'

    },
    }
  }
};

return(
  <>
    <Pie data={data} plugins={[ChartDataLabels]} options={options} />
  </>
)};

export default PieChartI;