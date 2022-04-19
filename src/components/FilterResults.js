import React, { useState, useEffect } from "react";
import {
  useSearchParams,
} from "react-router-dom";

import Filter from "./filters";
import CompaniesList from "./CompaniesList";
import HashLoader from "react-spinners/HashLoader";

export default function FilterResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const definedState = searchParams.get("state");
  const definedJobIndustry = searchParams.get("jobIndustry");
  const definedCity = searchParams.get("city");
  const definedJobType = searchParams.get("jobType");
  const [loading, setLoading] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    if (definedJobIndustry && definedState && definedCity && definedJobType) {
      getCompaniesList(
        definedJobIndustry,
        definedState,
        definedCity,
        definedJobType
      );
    }
  }, [definedJobIndustry, definedState, definedCity, definedJobType]);
  const getCompaniesList = (
    definedJobIndustry,
    definedState,
    definedCity,
    definedJobType
  ) => {
    let params = {
      job_industry: definedJobIndustry,
      state: definedState,
      city: definedCity,
      job_type: definedJobType,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    const fetchAPI = "http://localhost:8000/filters/?" + query;
    setLoading(true);
    fetch(fetchAPI, {
      method: "GET",
      params: JSON.stringify({ params }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCompaniesList(data.companies);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
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
        <div>
          <h2>Search Results</h2>
          <Filter />
          <CompaniesList companies={companiesList} />
        </div>
      )}
    </div>
  );
}
