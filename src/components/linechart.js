import Chart from "react-apexcharts";
import React, { memo } from "react";

const LineChart = (props) => {
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: props.title,
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: props.options,
    },
  };

  const series = [
    {
      name: "Average",
      data: props.series,
    },
  ]
  return (
    <div>
      <Chart
        options={options}
        series={series}
        title={props.title}
        type="line"
        height={350}
      />
    </div>
  );
};
export default memo(LineChart);
