import React from 'react';
import LoginForm from '../../components/common/LoginForm';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;