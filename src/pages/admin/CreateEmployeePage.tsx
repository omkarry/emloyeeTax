import RegistrationForm from "../../components/common/RegistrationForm";
import Footer from "../../layouts/footer/Footer";
import AdminHeader from "../../layouts/header/AdminHeader";

const CreateEmployeePage = () => {
  return (
    <>
      <AdminHeader />
      <RegistrationForm title="Employee" />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CreateEmployeePage;