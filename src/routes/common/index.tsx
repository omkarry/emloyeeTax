
import { Route, Routes } from 'react-router-dom';

import LoginPage from '../../pages/common/LoginPage';
import HomePage from '../../pages/common/HomePage';

const CommonRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};
export default CommonRoutes;