import React from "react";
import Filter from "./filters";
import SearchBar from "./SearchBar";

export default function Home() {
    return (
        <div>
            <h2>Search Filters</h2>
            <Filter />
            <SearchBar />
        </div>
    )
}