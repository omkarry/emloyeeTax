import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png"
import { useAuth } from "../../services/authService";
import { Nav, Navbar } from "react-bootstrap";
import "../../assets/css/Header.css";
import useHttp from "../../config/https";
import { useEffect, useState } from "react";
import ProfilePhoto from "../../assets/images/img_avatar.png"
import { EmployeeData } from "../../data/EmployeeData";
import { Admin } from "../../data/Admin";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userId = localStorage.getItem('userId');
  const { axiosInstance, loading } = useHttp();
  const [user, setUserDetails] = useState<Admin>();

  const getEmployeeDetails = () => {
    axiosInstance.get(`Admin/${userId}`)
      .then(response => {
        setUserDetails({ ...response.data.result, profileImageBytes: response.data.profileImageBytes ? URL.createObjectURL(new Blob(response.data.profileImageBytes)) : null })
      })
      .catch(error => {
        console.log(error);
      })
  }
  
  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between pb-2 pt-2 justify-content-md-between border-bottom bg-color-2">
      <div className="col-md-2 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
          <img src={Logo} className="img-responsive w-100" style={{ mixBlendMode: "multiply" }} />
        </a>
      </div>
      <Navbar>
        <Nav className="mx-auto">
          <NavLink to="/Admin/Dashboard" className="mx-2 navLink shadow-sm p-2 rounded">Dashboard</NavLink>
          <NavLink to="/Admin/CreateEmployee" className="mx-2 navLink shadow-sm p-2 rounded">Create Employee</NavLink>
          <NavLink to="/Admin/CreateAdmin" className="mx-2 navLink shadow-sm p-2 rounded">Create Admin</NavLink>
          <NavLink to="/Admin/Employees" className="mx-2 navLink shadow-sm p-2 rounded">View Employees</NavLink>
          <NavLink to="/Admin/AddSalaryDetails" className="mx-2 navLink shadow-sm p-2 rounded">Add Salary Details</NavLink>
          <NavLink to="/Admin/AddSlabDetails" className="mx-2 navLink shadow-sm p-2 rounded">Add Slab Details</NavLink>
        </Nav>
      </Navbar>
      <div className="dropdown col-md-1 text-center">
        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle h5" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={ProfilePhoto} className="rounded-circle shadow-4 mx-1"
            width="30px" />
          {user?.username}
        </a>
        <ul className="dropdown-menu text-small">
          <li><Link className="dropdown-item" to="/Admin/Profile">Profile</Link></li>
          <li><a className="dropdown-item" onClick={handleLogout}>Log out</a></li>
        </ul>
      </div>
    </header>
  );
}

export default AdminHeader;