import Chart from 'react-apexcharts'
import React,  { memo } from "react";

const LineChart = (props) =>{
    return(
        <div>
            <Chart options={props.options} series={props.series} type="line" height={350} />
        </div>
    );
};
export default memo(LineChart);