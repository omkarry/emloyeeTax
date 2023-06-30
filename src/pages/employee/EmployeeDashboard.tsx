import React from 'react';
import EmployeeDashboard from '../../components/employee/EmployeeDashboard';
import EmployeeHeader from '../../layouts/header/EmployeeHeader';
import { Helmet } from 'react-helmet';

const EmployeeDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Employee Dashboard</title>
      </Helmet>
      <div className='container-fluid'>
        <EmployeeDashboard />
      </div>
    </>
  );
};

export default EmployeeDashboardPage;