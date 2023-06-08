import AdminDashboard from '../../components/admin/AdminDashboard';
import Footer from '../../layouts/footer/Footer';
import AdminHeader from '../../layouts/header/AdminHeader';

const AdminDashboardPage = () => {
  return (
    <>
      <AdminHeader />
      <div className="container">
        <AdminDashboard />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AdminDashboardPage;
