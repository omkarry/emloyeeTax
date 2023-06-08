import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useAuth } from "../../services/authService";

const EmployeeHeader = () => {
  const { logout } = useAuth();
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3 px-4 border-bottom">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
          <img src={Logo} className="img-responsive w-50" style={{ mixBlendMode: "multiply" }} />
        </a>
      </div>
      <div className="col-md-5 mb-2 mb-md-0 text-start">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="dropdown col-md-1 text-center">
        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle h5" data-bs-toggle="dropdown" aria-expanded="false">
          Employee
        </a>
        <ul className="dropdown-menu text-small">
          <li><Link to={"/createEmployee"} className="dropdown-item">Create New Employee</Link></li>
          <li><Link to={"/createAdmin"} className="dropdown-item">Create New Admin</Link></li>
          <li><Link to={"/employees"} className="dropdown-item">See Employees</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" onClick={logout}>Log out</a></li>
        </ul>
      </div>
    </header>
  );
}