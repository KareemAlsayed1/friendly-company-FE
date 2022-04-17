import React, { useState } from "react";
import { DATA_FOR_FILTERS } from "./constant";

export default function Filter() {
  const data = DATA_FOR_FILTERS;
  const [selectJobIndustry, setJobIndustry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const availableCities = data.states.find((c) => c.name === selectedState);

  return (
    <div id="container">
      <h2>Cascading or Dependent Dropdown using React</h2>
      <div>
        <label>Job Industry</label>
        <select
          placeholder="jobIndustry"
          value={selectJobIndustry}
          onChange={(e) => setJobIndustry(e.target.value)}
        >
          <option>--Choose Job Industry--</option>
          {data.jobIndustries.map((value, key) => {
            return (
              <option value={value.name} key={key}>
                {value.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>State</label>
        <select
          placeholder="State"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option>--Choose State--</option>
          {data.states.map((value, key) => {
            return (
              <option value={value.name} key={key}>
                {value.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>City</label>
        <select
          placeholder="City"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option>--Choose City--</option>
          {availableCities?.cities.map((e, key) => {
            return (
              <option value={e.name} key={key}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
