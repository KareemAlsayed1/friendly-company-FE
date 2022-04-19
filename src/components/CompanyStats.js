import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BarPlot from "./BarPlot";
import LineChart from "./linechart";
import Select from "react-select";
import HashLoader from "react-spinners/HashLoader";
import SearchBar from "./SearchBar";

export default function CompanyStats() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [lineOptions, setLineOptions] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);

  const [barOptions, setBarOptions] = useState([]);
  const [barData, setBarData] = useState([]);

  const [wageBarOptions, setWageBarOptions] = useState([]);
  const [wageBarData, setWageBarData] = useState([]);
  const [wageCurrentChoice, setWageCurrentChoice] = useState("");

  const [waitingLineOptions, setWaitingLineOptions] = useState([]);
  const [waitingLineSeries, setWaitingLineSeries] = useState([]);

  const [savedData, setSavedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [jobIndustries, setJobIndustries] = useState([]);
  let companyName = searchParams.get("company_name");

  useEffect(() => {
    if (companyName) {
      getChartData(companyName);
    }
  }, [companyName]);

  const getChartData = (companyName) => {
    let params = {
      company_name: companyName,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const fetchAPI = "http://localhost:8000/search/?" + query;
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

        if (data["data"].hasOwnProperty("average_wage_on_job")) {
          const tmp_options = [];
          for (var key in data.data["average_wage_on_job"]) {
            tmp_options.push({
              value: key,
              label: key,
            });
          }
          setJobIndustries(tmp_options);

          setWageCurrentChoice(key);

          setWageBarOptions(
            data.data["average_wage_on_job"][key]["options"]["xaxis"][
              "categories"
            ]
          );
          setWageBarData(
            data.data["average_wage_on_job"][key]["series"]["data"]
          );
        }
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
            <SearchBar />
            {companyName ? (
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
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
