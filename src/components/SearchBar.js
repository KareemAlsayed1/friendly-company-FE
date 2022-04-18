import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import InputBase from '@mui/material/InputBase';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


export default function SearchBar() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate({
        pathname: '/company',
        search: `?${createSearchParams({company_name : inputText})}`,
      });
  };

  return (
    <div>
      <div className="search">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            id="outlined-basic"
            onChange={(e) => setInputText(e.target.value.toUpperCase())}
            variant="outlined"
            fullWidth
            placeholder="Or search company name"
          />
          <IconButton onClick={handleSubmit} sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
