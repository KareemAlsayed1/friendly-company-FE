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
    const approval_rate = company.approval_rate;
    const wage_range = `${company.wage_range[0]}-${company.wage_range[1]}`;
    return { id, name, approval_rate, wage_range };
  }
  const rows = [];
  for (var key in companies) {
    let company = companies[key];
    console.log(company);
    rows.push(createData(key, company));
  }

  const columns = [
    { field: "name", headerName: "Company Name", width: 130 },
    { field: "approval_rate", headerName: "Approval rate", width: 130 },
    { field: "wage_range", headerName: "Wage range", width: 130 },
  ];

  const handleSubmit = (companyName) => {
    navigate({
      pathname: "/company",
      search: `?${createSearchParams({ company_name: companyName })}`,
    });
  };

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={(params, event, details) =>
            handleSubmit(params.row.name.toUpperCase())
          }
        />
      </div>
    </div>
  );
};

export default memo(CompaniesList);
