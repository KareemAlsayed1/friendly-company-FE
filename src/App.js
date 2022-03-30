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

  let params = {
    "company_name": "MICROSOFT"
  };
  
  let query = Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');
  
  let url = 'http://localhost:8000/search/?' + query;
  const getChartData = () => {
		const fetchAPI = url;
		fetch(fetchAPI, {method: 'GET', params: JSON.stringify({"company_name": "MICROSOFT"})})
		  .then(res => res.json())
		  .then(data => {
      if(data['data'].hasOwnProperty('approval_rate')){
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
               categories: data.data['approval_rate']['options']['xaxis']['categories'],
             }
           })
         setLineSeries(data['data']['approval_rate']['sesries']['data'])
      }
      // if(data.hasOwnProperty('bar_chart')){
      //   setBarData(data['bar_chart']['company_data']);
      //   setBarCategories(data['bar_chart']['categories']);
      // }
      }
		).finally(() => {
			// pass
		});
	}

  return (
    <div className="App">
      <LineChart options={lineOptions} series={lineSeries} />
      <BarPlot data={barData} categories={barCategories}/>
      <button onClick={getChartData}>Get Data</button>
    </div>
  );
}

export default App;
