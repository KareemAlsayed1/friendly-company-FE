import React, { memo } from "react";
import Chart from "react-apexcharts";

const BarPlot = (props) => {
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: props.options,
    },
    title: {
      text: props.title,
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
  };
  return (
    <div>
      <Chart
        options={options}
        series={[{ data: props.data }]}
        type="bar"
        height={350}
        title={props.title}
      />
    </div>
  );
};

export default memo(BarPlot);
