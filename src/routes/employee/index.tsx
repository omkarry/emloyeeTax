import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboardPage from '../../pages/employee/EmployeeDashboard';
import NoPage from '../../pages/common/NoPage';
import EmployeeProfilePage from '../../pages/employee/EmployeeProfilePage';
import ViewInvestmentDeclarationsPage from '../../pages/employee/ViewInvestmentDeclarationsPage';
import TaxDeclarationPage from '../../pages/employee/TaxDeclarationPage';

const EmployeeRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Employee/dashboard" replace />} />
        <Route path="/Employee/dashboard" element={<EmployeeDashboardPage />} />
        <Route path="/Employee/Profile" element={<EmployeeProfilePage />} />
        <Route path="/Employee/ViewInvestmentDeclarations" element={<ViewInvestmentDeclarationsPage />} />
        <Route path="/Employee/TaxDeclaration" element={<TaxDeclarationPage />} />
        {/* <Route path="/Employee/TaxDeclaration/OldRegime" element={<OldRegimePage />} />
        <Route path="/Employee/TaxDeclaration/NewRegime" element={<NewRegimePage />} /> */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default EmployeeRoutes;