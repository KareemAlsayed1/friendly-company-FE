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
      text: 'Approval rate over years',
      align: 'center'
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
    name: "Approval Rate",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]);

  const [barOptions, setBarOptions] = useState(
    {
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
        categories:['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        'United States', 'China', 'Germany'],
      },
      title: {
        text: "Number of applicants per job industry",
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
    }
  );
  const [barData, setBarData] = useState([400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]);

  // const  [wageBarOptions, setWageBarOptions] = useState(
  //   {
  //     chart: {
  //       type: "bar",
  //       height: 350,
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 4,
  //         horizontal: true,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     xaxis: {
  //       categories:['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
  //       'United States', 'China', 'Germany'],
  //     },
  //     title: {
  //       text: "Average Wage Based on Job",
  //       align: "center",
  //       margin: 10,
  //       offsetX: 0,
  //       offsetY: 0,
  //       floating: false,
  //       style: {
  //         fontSize: "14px",
  //         fontWeight: "bold",
  //         fontFamily: undefined,
  //         color: "#263238",
  //       },
  //     },
  //   }
  // );


  const [waitingLineOptions, setWaitingLineOptions] = useState({
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
      text: 'Waiting times over years',
      align: 'center'
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
  const [waitingLineSeries, setWaitingLineSeries] = useState([{
    name: "Waiting Time",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]);

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
      // console.log(data.data)
      // console.log(data.data['applications_count_groups']['options']['xaxis']['categories'])
      // console.log(data.data['applications_count_groups']['series']['data'])
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
               text: 'Approval rate over years',
               align: 'center'
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
        setLineSeries([{name: "Acceptance Rate", data: data['data']['approval_rate']['series']['data']}])
      }
      if(data['data'].hasOwnProperty('applications_count_groups')){
        setBarOptions({
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
            categories: data.data['applications_count_groups']['options']['xaxis']['categories'],
          },
          title: {
            text: "Number of applicants per job industry",
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
        })
        setBarData(data.data['applications_count_groups']['series']['data']);
      }
      if(data['data'].hasOwnProperty('waiting_time')){
        setWaitingLineOptions({
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
              text: 'Waiting time over years',
              align: 'center'
            },
            grid: {
               row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
               },
            },
            xaxis: {
              categories: data.data['waiting_time']['options']['xaxis']['categories'],
            }
          })
        setWaitingLineSeries([{name: "Waiting Time", data: data['data']['waiting_time']['series']['data']}])
     }
    }
		).finally(() => {
			// pass
		});
	}

  return (
    <div className="App">
      <LineChart options={lineOptions} series={lineSeries} />
      <BarPlot data={barData} options={barOptions}/>
      <LineChart options={waitingLineOptions} series={waitingLineSeries} />
      <button onClick={getChartData}>Get Data</button>
    </div>
  );
}

export default App;
