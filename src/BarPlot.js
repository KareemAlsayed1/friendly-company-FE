import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class BarPlot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: this.props.data,
        },
      ],
      options: {
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
          categories: this.props.categories,
        },
        title: {
          text: "hello",
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
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
          title={this.state.title}
        />
      </div>
    );
  }
}

export default BarPlot;
