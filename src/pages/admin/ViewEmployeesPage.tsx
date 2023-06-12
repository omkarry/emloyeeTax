import { useEffect } from "react";
import useHttp from "../../config/https";
import AdminHeader from "../../layouts/header/AdminHeader";
import Footer from "../../layouts/footer/Footer";
import ViewEmployees from "../../components/admin/ViewEmployees";

const ViewEmployeesPage = () => {
  return (
    <>
      <AdminHeader />
      <ViewEmployees />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default ViewEmployeesPage;