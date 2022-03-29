import logo from './logo.svg';
import './App.css';
import LineChart from './linechart.js';
import React, { useState} from 'react';
import BarPlot from "./BarPlot";


function App() {
  const [lineOptions, setLineOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  });
  const [lineSeries, setLineSeries] = useState([{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]);
  const [barData, setBarData] = useState([400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]);
  const [barCategories, setBarCategories] = useState([
    "South Korea",
    "Canada",
    "United Kingdom",
    "Netherlands",
    "Italy",
    "France",
    "Japan",
    "United States",
    "China",
    "Germany",
  ]);

  const series = [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }];

  const getChartData = () => {
		const fetchAPI = '/company-charts';
		fetch(fetchAPI, {method: 'GET'})
		  .then(res => res.json())
		  .then(data => {
      if(data.hasOwnProperty('line_chart')){
         setLineOptions({
             chart: {
               height: 350,
               type: 'line',
               zoom: {
                 enabled: false
               }
             },
             dataLabels: {
               enabled: false
             },
             stroke: {
               curve: 'straight'
             },
             title: {
               text: 'Product Trends by Month',
               align: 'left'
             },
             grid: {
                row: {
                 colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                 opacity: 0.5
                },
             },
             xaxis: {
               categories: data['line_chart']['years'],
             }
           })
         setLineSeries(data['line_chart']['approval_rate_over_years'])
      }
      if(data.hasOwnProperty('bar_chart')){
        setBarData(data['bar_chart']['company_data']);
        setBarCategories(data['bar_chart']['categories']);
      }
      }
		).finally(() => {
			// pass
		});
	}

  return (
    <div className="App">
      <LineChart options={lineOptions} series={lineSeries} />
      <BarPlot data={barData} categories={barCategories}/>
    </div>
  );
}

export default App;
