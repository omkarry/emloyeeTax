import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboardPage from '../../pages/employee/EmployeeDashboard';
import NoPage from '../../pages/common/NoPage';
import EmployeeProfilePage from '../../pages/employee/EmployeeProfilePage';
import ViewInvestmentDeclarationsPage from '../../pages/employee/ViewInvestmentDeclarationsPage';
import TaxDeclarationPage from '../../pages/employee/TaxDeclarationPage';
import EmployeeMainContent from '../../layouts/Main/EmployeeMain';
import SeeSalaryDetails from '../../pages/employee/SeeSalaryDetails';
import SlabDetails from '../../pages/employee/SlabDetails';
import InvestmentDeclarationPage from '../../pages/employee/InvestmentDeclarationPage';

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeMainContent />} >
      <Route path="/" element={<Navigate to="/Employee/Dashboard" replace/>} />
        <Route path="/Employee/Dashboard" element={<EmployeeDashboardPage />} />
        <Route path="/Employee/SeeSalaryDetails" element={<SeeSalaryDetails />} />
        <Route path="/Employee/Profile" element={<EmployeeProfilePage />} />
        <Route path="/Employee/ViewInvestmentDeclarations" element={<ViewInvestmentDeclarationsPage />} />
        <Route path="/Employee/TaxDeclaration" element={<TaxDeclarationPage />} />
        <Route path="/Employee/TaxDeclaration/OldRegime" element={<InvestmentDeclarationPage />} />
        {/* <Route path="/Employee/TaxDeclaration" element={<TaxDeclarationPage />} /> */}
        <Route path="/Employee/SlabDetails" element={<SlabDetails />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

export default EmployeeRoutes;