import React, { useState, useEffect } from "react";
import BarPlot from "./BarPlot";
import LineChart from "./linechart";
import Select from "react-select";
import HashLoader from "react-spinners/HashLoader";

export default function CompanyStats() {
  const [lineOptions, setLineOptions] = useState({
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
      text: "Approval rate over years",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });
  const [lineSeries, setLineSeries] = useState([
    {
      name: "Approval Rate",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);

  const [barOptions, setBarOptions] = useState({
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
      categories: [
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
      ],
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
  });
  const [barData, setBarData] = useState([
    400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380,
  ]);

  const [wageBarOptions, setWageBarOptions] = useState({
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
      categories: [
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
      ],
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
  const [wageBarData, setWageBarData] = useState([
    400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380,
  ]);
  const [wageCurrentChoice, setWageCurrentChoice] = useState(
    "Computer and Mathematical Occupations"
  );

  const [waitingLineOptions, setWaitingLineOptions] = useState({
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
      text: "Waiting times over years",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });
  const [waitingLineSeries, setWaitingLineSeries] = useState([
    {
      name: "Waiting Time",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);

  const [savedData, setSavedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [jobIndustries, setJobIndustries] = useState([]);

  let params = {
    company_name: "MICROSOFT",
  };

  let query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");

  let url = "http://localhost:8000/search/?" + query;
  const getChartData = () => {
    const fetchAPI = url;
    setLoading(true);
    fetch(fetchAPI, {
      method: "GET",
      params: JSON.stringify({ params }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedData(data);
        if (data["data"].hasOwnProperty("approval_rate")) {
          setLineOptions(
            data.data["approval_rate"]["options"]["xaxis"]["categories"]
          );
          setLineSeries(data.data["approval_rate"]["series"]["data"]);
        }
        if (data["data"].hasOwnProperty("applications_count_groups")) {
          setBarOptions(
            data.data["applications_count_groups"]["options"]["xaxis"][
              "categories"
            ]
          );
          setBarData(data.data["applications_count_groups"]["series"]["data"]);
        }
        if (data["data"].hasOwnProperty("waiting_time")) {
          setWaitingLineOptions(
            data.data["waiting_time"]["options"]["xaxis"]["categories"]
          );
          setWaitingLineSeries(data["data"]["waiting_time"]["series"]["data"]);
        }
        setWageBarOptions(
          data.data["average_wage_on_job"][wageCurrentChoice]["options"][
            "xaxis"
          ]["categories"]
        );
        setWageBarData(
          data.data["average_wage_on_job"][wageCurrentChoice]["series"]["data"]
        );

        const tmp_options = [];
        for (var key in data.data["average_wage_on_job"]) {
          tmp_options.push({
            "value": key,
            "label": key,
          });
        }
        setJobIndustries(tmp_options);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeWageSelection = (option) => {
    setLoading(true);
    setWageCurrentChoice(option.value);
    setWageBarOptions(
      savedData.data["average_wage_on_job"][option.value]["options"]["xaxis"][
        "categories"
      ]
    );
    setWageBarData(
      savedData.data["average_wage_on_job"][option.value]["series"]["data"]
    );
    setLoading(false);
  };

  useEffect(() => {
    getChartData();
  }, []);
  return (
    <div>
      <div className="CompanyStats">
        {loading ? (
          <div className="loading-section">
            <HashLoader
              color={"#008ffb"}
              loading={loading}
              size={120}
              css={"align-self: center; margin-top:25%;"}
            />
            <div className="loading-text"> Getting the data for you </div>
          </div>
        ) : (
          <>
            <LineChart
              options={lineOptions}
              series={lineSeries}
              title={"Approval rate over years"}
            />
            <BarPlot
              data={barData}
              options={barOptions}
              title={"Number of applicants per job industry"}
            />
            <LineChart
              options={waitingLineOptions}
              series={waitingLineSeries}
              title={"Waiting times over years"}
            />
            <Select
              options={jobIndustries}
              defaultValue={wageCurrentChoice}
              placeholder={wageCurrentChoice}
              onChange={changeWageSelection}
            />
            <BarPlot
              data={wageBarData}
              options={wageBarOptions}
              title={"Average wage based on job"}
            />
            <button onClick={getChartData}>Get Data</button>
          </>
        )}
      </div>
    </div>
  );
}
