import React, { memo } from "react";
import {
  useNavigate,
  createSearchParams,
} from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";

const CompaniesList = (props) => {
  const companies = props.companies;
  const navigate = useNavigate();

  console.log(companies);
  function createData(id, company) {
    const name = company.name;
    const approval_rate = `${Math.round(company.approval_rate)}%`;
    const wage_range = `$${Math.round(company.wage_range[0])} - $${Math.round(company.wage_range[1])}`;
    const average_wage = `$${Math.round(company.average_wage)}`;

    return { id, name, approval_rate, wage_range, average_wage};
  }
  const rows = [];
  for (var key in companies) {
    let company = companies[key];
    console.log(company);
    rows.push(createData(key, company));
  }

  const columns = [
    { field: "name", headerName: "Company Name", width: 800 },
    { field: "approval_rate", headerName: "Approval rate", width: 170 },
    { field: "wage_range", headerName: "Wage range (Min - Max)", width: 180 },
    { field: "average_wage", headerName: "Average Wage", width: 170 },
  ];

  const handleSubmit = (companyName) => {
    navigate({
      pathname: "/company",
      search: `?${createSearchParams({ company_name: companyName })}`,
    });
  };

  return (
    <div>
      <div style={{ height: 660, width: 1350 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowClick={(params, event, details) =>
            handleSubmit(params.row.name.toUpperCase())
          }
        />
      </div>
    </div>
  );
};

export default memo(CompaniesList);
