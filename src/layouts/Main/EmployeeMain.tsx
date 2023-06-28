import { Outlet } from "react-router-dom";
import "../../assets/css/Header.css";
import EmployeeHeader from "../header/EmployeeHeader";
import React from "react";

const EmployeeMainContent = () => {

  return (
    <React.Fragment>
      <EmployeeHeader />
      <div className="bg-color-1 min-height">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default EmployeeMainContent;