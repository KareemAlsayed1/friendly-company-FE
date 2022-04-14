import React, { memo } from "react";
import Chart from 'react-apexcharts'

const BarPlot = (props) =>{
  return(
    <div>
      <Chart
        options={props.options}
        series={[{data: props.data}]}
        type="bar"
        height={350}
        title={props.title}
      />
    </div>
  );
};

export default memo(BarPlot);