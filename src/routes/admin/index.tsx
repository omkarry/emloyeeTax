import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import NoPage from '../../pages/common/NoPage';
import CreateEmployeePage from '../../pages/admin/CreateEmployeePage';
import CreateAdminPage from '../../pages/admin/CreateAdminPage';
import ViewEmployeesPage from '../../pages/admin/ViewEmployeesPage';
import AddSalaryDetails from '../../pages/admin/AddSalaryDetails';
import AdminMainContent from '../../layouts/Main/AdminMain';
import AddRegimeForm from '../../pages/admin/AddRegimePage';

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminMainContent />} >
          <Route path="/" element={<Navigate to="/Admin/Dashboard" replace />} />
          <Route index path="/Admin/Dashboard" element={<AdminDashboardPage />} />
          <Route path="/Admin/CreateEmployee" element={<CreateEmployeePage />} />
          <Route path="/Admin/CreateAdmin" element={<CreateAdminPage />} />
          <Route path="/Admin/Employees" element={<ViewEmployeesPage />} />
          <Route path="/Admin/AddSalaryDetails" element={<AddSalaryDetails />} />
          <Route path="/Admin/AddSlabDetails" element={<AddRegimeForm />} />
          {/* <Route path="/Employee/Profile" element={<EmployeeProfilePage />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;