import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png"
import { useAuth } from "../../services/authService";
import { Nav, Navbar } from "react-bootstrap";
import "../../assets/css/Header.css";
import AdminHeader from "../header/AdminHeader";

const AdminMainContent = () => {

  return (
    <>
      <AdminHeader />
      <div className="bg-color-1 min-height">
        <Outlet />
      </div>
    </>
  );
}

export default AdminMainContent;