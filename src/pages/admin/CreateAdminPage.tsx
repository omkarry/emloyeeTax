import RegistrationForm from "../../components/common/RegistrationForm";
import Footer from "../../layouts/footer/Footer";
import AdminHeader from "../../layouts/header/AdminHeader";

const CreateAdminPage = () => {
  return (
    <>
      <AdminHeader />
      <RegistrationForm title="Admin"/>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default CreateAdminPage;