import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import NoPage from '../../pages/common/NoPage';
import CreateEmployeePage from '../../pages/admin/CreateEmployeePage';
import CreateAdminPage from '../../pages/admin/CreateAdminPage';
import ViewEmployeesPage from '../../pages/admin/ViewEmployeesPage';

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Admin/Dashboard" />} />
        <Route path="/Admin/Dashboard" element={<AdminDashboardPage />} />
        <Route path="/Admin/CreateEmployee" element={<CreateEmployeePage />} />
        <Route path="/Admin/CreateAdmin" element={<CreateAdminPage />} />
        <Route path="/Admin/Employees" element={<ViewEmployeesPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;