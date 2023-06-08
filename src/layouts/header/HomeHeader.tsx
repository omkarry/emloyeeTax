import Logo from "../../assets/images/Logo.png"
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <div className="container-fluid mx-0 px-0 position-sticky">
      <header className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-between py-3 px-4 shadow">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none text-center">
            <img src={Logo} className="img-responsive" width="50%" style={{ mixBlendMode: "multiply" }} />
          </a>
        </div>
        <div className="col-md-3 text-end">
          <Link to={"/login"} type="button" className="btn bg-primary text-white btn-outline-primary me-2">Login</Link>
        </div>
      </header>
    </div>
  );
}

export default HomeHeader;