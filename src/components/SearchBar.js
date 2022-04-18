import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate({
      pathname: "/company",
      search: `?${createSearchParams({ company_name: inputText })}`,
    });
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed.");
        event.preventDefault();
        navigate({
          pathname: "/company",
          search: `?${createSearchParams({ company_name: inputText })}`,
        });
        setInputText("");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [navigate, inputText]);

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
          <IconButton
            onClick={handleSubmit}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
