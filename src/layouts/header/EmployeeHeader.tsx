import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png"
import { useAuth } from "../../services/authService";
import { Nav, Navbar } from "react-bootstrap";
import "../../assets/css/Header.css";
import { useEffect, useState } from "react";
import ProfilePhoto from "../../assets/images/img_avatar.png"
import useHttp from "../../config/https";
import { EmployeeData } from "../../data/EmployeeData";

const EmployeeHeader = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { logout } = useAuth();
  const { axiosInstance, loading } = useHttp();
  const [user, setUserDetails] = useState<EmployeeData>();

  const handleLogout = () => {
    logout();
    window.location.reload();
  }

  const getEmployeeDetails = () => {
    axiosInstance.get(`Employee/${userId}`)
      .then(response => {
        const employeesWithImage:(EmployeeData) = response.data.result;
          const profileImageBytes = employeesWithImage.profileImageBytes;
          const profileImage = profileImageBytes ? `data:image/jpeg;base64,${profileImageBytes}` : undefined;
          setUserDetails({...employeesWithImage, profileImage});
      })
      .catch(error => {
        console.log(error);
      })
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
          <NavLink to="/Employee/Dashboard" className="mx-2 navLink shadow-sm p-2 rounded">Dashboard</NavLink>
          <NavLink to="/Employee/SeeSalaryDetails" className="mx-2 navLink shadow-sm p-2 rounded">See Salary Details</NavLink>
          <NavLink to="/Employee/TaxDeclaration" className="mx-2 navLink shadow-sm p-2 rounded">Tax Declaration</NavLink>
          <NavLink to="/Employee/ViewInvestmentDeclarations" className="mx-2 navLink shadow-sm p-2 rounded">Past Declarations</NavLink>
          <NavLink to="/Employee/SlabDetails" className="mx-2 navLink shadow-sm p-2 rounded">Slab Details</NavLink>
        </Nav>
      </Navbar>
      <div className="dropdown col-md-2 text-center">
        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle h5" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={user?.profileImage != undefined ? user.profileImage : ProfilePhoto} className="rounded-circle shadow-4 mx-1"
            width={"40px"} height={"40px"} />
          {user?.name}
        </a>
        <ul className="dropdown-menu text-small">
          <li><Link className="dropdown-item" to="/Employee/Profile">Profile</Link></li>
          <li><a className="dropdown-item" onClick={handleLogout}>Log out</a></li>
        </ul>
      </div>
    </header>
  );
}

export default EmployeeHeader;