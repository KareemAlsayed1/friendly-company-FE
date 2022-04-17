import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";

import { DATA_FOR_FILTERS } from "./constant";

export default function Filter() {
  const data = DATA_FOR_FILTERS;
  const [selectedJobIndustry, setJobIndustry] = useState(
    "--Choose Job Industry--"
  );
  const [selectedState, setSelectedState] = useState("--Choose State--");
  const [selectedCity, setSelectedCity] = useState("--Choose City--");
  const [selectedJobType, setJobType] = useState("--Choose Job Type--");
  const [citiesList, setCitiesList] = useState([]);
  const jobIndustriesList = [];
  for (var key in data.jobIndustries) {
    jobIndustriesList.push(data.jobIndustries[key].name);
  }

  const statesList = [];
  for (var key in data.states) {
    statesList.push(data.states[key].name);
  }

  const jobTypesList = [];
  for (var key in data.jobTypes) {
    jobTypesList.push(data.jobTypes[key].name);
  }

  const changeStateSelection = (option) => {
    setSelectedState(option.value);
    const availableCities = data.states.find((c) => c.name === option.value);
    setCitiesList(availableCities.cities);
  };

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

  const {
    filters,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div id="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cascading or Dependent Dropdown using React</h2>
        <div>
          <label>Job Industry</label>
          <Select
            placeholder={selectedJobIndustry}
            defaultValue={selectedJobIndustry}
            onChange={(e) => setJobIndustry(e.value)}
            options={generateOptions(jobIndustriesList)}
          />
        </div>

        <div>
          <label>State</label>
          <Select
            placeholder={selectedState}
            defaultValue={selectedState}
            onChange={(e) => changeStateSelection(e)}
            options={generateOptions(statesList)}
          />
        </div>

        <div>
          <label>City</label>
          <Select
            placeholder={selectedCity}
            defaultValue={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={generateOptions(citiesList)}
          />
        </div>

        <div>
          <label>Job Type</label>
          <Select
            placeholder={selectedJobType}
            defaultValue={selectedJobType}
            onChange={(e) => setJobType(e.value)}
            options={generateOptions(jobTypesList)}
          />
        </div>
        <button type="submit">Find Companies</button>
      </form>
    </div>
  );
}
