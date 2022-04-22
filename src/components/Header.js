import React from "react";
import logoUrl from "../logo.svg";

export default function Header() {
  return (
    <div className="header">
      <img
        src={logoUrl}
        alt="Logo"
        onClick={() => window.location.replace("/")}
      />
      <div id="navList">
        <a href={"/about"} style={{textDecoration: "none"}}>About Us</a>
      </div>
    </div>
  );
}
