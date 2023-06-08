import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png"
import { useAuth } from "../../services/authService";
import { Nav, Navbar } from "react-bootstrap";
import "../../assets/css/Header.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between pb-2 pt-2 justify-content-md-between border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
          <img src={Logo} className="img-responsive w-50" style={{ mixBlendMode: "multiply" }} />
        </a>
      </div>
      <Navbar>
        <Nav className="mx-auto">
          <NavLink to="/Admin/Dashboard" className="mx-2 text-dark navLink shadow-sm px-2 rounded">Dashboard</NavLink>
          <NavLink to="/Admin/CreateEmployee" className="mx-2 text-dark navLink shadow-sm px-2 rounded">Create Employee</NavLink>
          <NavLink to="/Admin/CreateAdmin" className="mx-2 text-dark navLink shadow-sm px-2 rounded">Create Admin</NavLink>
          <NavLink to="/Admin/Employees" className="mx-2 text-dark navLink shadow-sm px-2 rounded">View Employees</NavLink>
          <NavLink to="/Admin/AddSalaryDetails" className="mx-2 text-dark navLink shadow-sm px-2 rounded">Add Salary Details</NavLink>
          <NavLink to="/Admin/AddSlabDetails" className="mx-2 text-dark navLink shadow-sm px-2 rounded">Add Slab Details</NavLink>
        </Nav>
      </Navbar>
      <div className="dropdown col-md-1 text-center">
        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle h5" data-bs-toggle="dropdown" aria-expanded="false">
          Admin
        </a>
        <ul className="dropdown-menu text-small">
          <li><a className="dropdown-item" onClick={handleLogout}>Log out</a></li>
        </ul>
      </div>
    </header>
  );
}

export default AdminHeader;