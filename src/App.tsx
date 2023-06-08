import { BrowserRouter as Router } from 'react-router-dom';
import CommonRoutes from './routes/common';
import AdminRoutes from './routes/admin';
import EmployeeRoutes from './routes/employee';
import { useAuth } from './services/authService';

const App = () => {
  const { isAuthenticated, isAdmin, isEmployee } = useAuth();
  return (
      <Router>
        {/* <CommonRoutes />
        {isAuthenticated() && isAdmin() && <AdminRoutes />}
        {isAuthenticated() && isEmployee() && <EmployeeRoutes />} */}

        { isAuthenticated() && isAdmin() ? <AdminRoutes /> :
        isAuthenticated() && isEmployee() ? <EmployeeRoutes /> : <CommonRoutes />}
      </Router>
  );
};

export default App;
