import React from "react";
import Filter from "./filters";
import SearchBar from "./SearchBar";
import logoUrl from '../logo.svg';
import "./commoncss.css";

export default function Home() {
    return (
        <div className="mainApp">
            <div>
                <div className="header">
                    <img src={logoUrl} alt="Logo" />
                </div>
            </div>
            <div id="filter-search-row">
                <h2>Search Filters</h2>
                <SearchBar />
            </div>
            <Filter />
        </div>
    )
}