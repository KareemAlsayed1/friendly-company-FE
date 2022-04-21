import React, { useState, useCallback, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import Button from "@mui/material/Button";

import Select from "./Select";
import { DATA_FOR_FILTERS } from "./constant";

import { State, City } from "country-state-city";

export default function Filter() {
  const data = DATA_FOR_FILTERS;
  const navigate = useNavigate();
  const [citiesList, setCitiesList] = useState([]);
  const jobIndustriesList = [];
  for (var key in data.jobIndustries) {
    jobIndustriesList.push(data.jobIndustries[key].name);
  }

  const countryCode = "US";
  const states = State.getStatesOfCountry(countryCode);
  const statesList = [];
  states.forEach((state) => {
    statesList.push(state.isoCode);
  });

  const jobTypesList = [];
  for (key in data.jobTypes) {
    jobTypesList.push(data.jobTypes[key].name);
  }

  const generateOptions = (data) => {
    const tmp = [];

    for (var key in data) {
      tmp.push({
        value: data[key],
        label: data[key],
      });
    }
    return tmp;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const definedState = searchParams.get("state");
  const definedJobIndustry = searchParams.get("jobIndustry");
  const definedCity = searchParams.get("city");
  const definedJobType = searchParams.get("jobType");

  const [form, setForm] = useState({
    jobIndustry: definedJobIndustry,
    state: definedState,
    city: 'N/A',
    jobType: definedJobType,
  });

  useEffect(() => {
    if (definedState) {
      const availableCities = City.getCitiesOfState(countryCode, definedState);
      const tmp = [];
      availableCities.forEach((city) => {
        tmp.push(city.name);
      });
      setCitiesList(tmp);
    }
  }, [definedState, countryCode]);

  const onValidate = (value, name) => {
    setError((prev) => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value },
    }));
  };

  const [error, setError] = useState({
    jobIndustry: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    state: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    city: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
    jobType: {
      isReq: true,
      errorMsg: "",
      onValidateFunc: onValidate,
    },
  });

  const onHandleChange = useCallback(
    (value, name) => {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (name === "state") {
        const availableCities = City.getCitiesOfState(
          countryCode,
          value
        );
        const tmp = [];
        availableCities.forEach((city) => {
          tmp.push(city.name);
        });
        setCitiesList(tmp);
      }
    },
    [data]
  );

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach((x) => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onValidate(true, x);
      }
    });
    return !isInvalid;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error("Invalid Form!");
      return false;
    }
    navigate({
      pathname: "/results",
      search: `?${createSearchParams(form)}`,
    });
  };

  return (
    <div id="container">
      <div className="form" id="filter-home">
        <div id="filter-row">
          <Select
            name="jobIndustry"
            title="Job Industry"
            value={form.jobIndustry}
            options={generateOptions(jobIndustriesList)}
            onChangeFunc={onHandleChange}
            {...error.jobIndustry}
          />
          <Select
            name="state"
            title="State"
            value={form.state}
            options={generateOptions(statesList)}
            onChangeFunc={onHandleChange}
            {...error.state}
          />
          <Select
            name="jobType"
            title="Job Type"
            value={form.jobType}
            options={generateOptions(jobTypesList)}
            onChangeFunc={onHandleChange}
            {...error.jobType}
          />
        </div>
        <div id={"button-area"}>
          <Button id={"filter-button"} variant="outlined" onClick={handleSubmit}>
            Find Companies
          </Button>
        </div>
        {/* <Select
          name="city"
          title="City"
          value={form.city}
          options={generateOptions(citiesList)}
          onChangeFunc={onHandleChange}
          {...error.city}
        /> */}
      </div>
    </div>
  );
}
