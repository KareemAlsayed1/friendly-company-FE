import React from "react";
import Filter from "./filters";
import SearchBar from "./SearchBar";
import Header from "./Header";
import "./commoncss.css";

export default function Home() {
    return (
        <div className="mainApp">
            <div>
                <Header />
            </div>
            <div id="filter-search-row">
                <h2>Search Filters</h2>
                <SearchBar />
            </div>
            <Filter />
        </div>
    )
}