import './App.css';
import LineChart from './linechart.js';
import React, { useState, useEffect} from 'react';
import BarPlot from "./BarPlot";
import Select from 'react-select'
import HashLoader from "react-spinners/HashLoader";

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

  const  [wageBarOptions, setWageBarOptions] = useState(
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
        text: "Average Wage Based on Job",
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
  const [wageBarData, setWageBarData] = useState([400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]);
  const [wageCurrentChoice, setWageCurrentChoice] = useState('Computer and Mathematical Occupations');

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

  const [savedData, setSavedData] = useState({})
  const [loading, setLoading] = useState(true);

  let params = {
    "company_name": "MICROSOFT"
  };

  const options = [
    { value: 'Architecture and Engineering Occupations', label: 'Architecture and Engineering Occupations' },
    { value: 'Arts, Design, Entertainment, Sports, and Media Occupations', label: 'Arts, Design, Entertainment, Sports, and Media Occupations' },
    { value: 'Business and Financial Operations Occupations', label: 'Business and Financial Operations Occupations' },
    { value: 'Computer and Mathematical Occupations', label: 'Computer and Mathematical Occupations' },
    { value: 'Life, Physical, and Social Science Occupations', label: 'Life, Physical, and Social Science Occupations' },
    { value: 'Management Occupations', label: 'Management Occupations' },
    { value: 'Sales and Related Occupations', label: 'Sales and Related Occupations' }
  ]

  let query = Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');
  
  let url = 'http://localhost:8000/search/?' + query;
  const getChartData = () => {
		const fetchAPI = url;
    setLoading(true);
		fetch(fetchAPI, {method: 'GET', params: JSON.stringify({"company_name": "MICROSOFT"})})
		  .then(res => res.json())
		  .then(data => {
      setSavedData(data);
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
    setWageBarOptions({
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
        categories: data.data['average_wage_on_job'][wageCurrentChoice]['options']['xaxis']['categories'],
      },
      title: {
        text: "Average Wage Based on Job",
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
    });
    setWageBarData(data.data['average_wage_on_job'][wageCurrentChoice]['series']['data']);
    }
		).finally(() => {
			setLoading(false);
		});
	}

  const changeWageSelection = (option) =>{
    setLoading(true);
    setWageCurrentChoice(option.value);
    setWageBarOptions({
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
        categories: savedData.data['average_wage_on_job'][option.value]['options']['xaxis']['categories'],
      },
      title: {
        text: "Average Wage Based on Job",
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
    });
    setWageBarData(savedData.data['average_wage_on_job'][option.value]['series']['data']);
    setLoading(false);
  }

  useEffect(() => {
    getChartData();
  }, [])
  return (
    <div className="App">
    {
   loading ? (
    <div className='loading-section'>
      <HashLoader color={"#008ffb"} loading={loading} size={120} css={"align-self: center; margin-top:25%;"}/>
      <div className='loading-text'> Getting the data for you </div>
    </div>
    ) : (
      <>
      <LineChart options={lineOptions} series={lineSeries} />
      <BarPlot data={barData} options={barOptions}/>
      <LineChart options={waitingLineOptions} series={waitingLineSeries} />
      <Select 
        options={options} 
        defaultValue={wageCurrentChoice} 
        placeholder={wageCurrentChoice} 
        onChange={changeWageSelection}
      />
      <BarPlot data={wageBarData} options={wageBarOptions}/>
      <button onClick={getChartData}>Get Data</button>
      </>
    )
  }
  </div>
  );
}

export default App;
