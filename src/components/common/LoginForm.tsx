import React, { useState } from 'react';
import OnlyLogo from "../../assets/images/favicon.png"
import Logo from "../../assets/images/Logo.png"
import { useNavigate } from 'react-router-dom';
import "../../assets/css/LoginForm.css"
import { useAuth } from '../../services/authService';
import useHttp from '../../config/https';
import Loader from './Loader';
import TextField from '@mui/material/TextField/TextField';
import jwt_decode from "jwt-decode";
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = () => {
  const { login} = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [validUser, setValidUser] = useState("");
  const { axiosInstance, loading } = useHttp();
  const [load, setload] = useState(loading);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    setUsername("");
    setPassword("");
    setValidUser("");
    setShowModal(false);
  }

  // const handleLogin = () => {
  //   const token = 'example-token';
  //   const role = 'admin';
  //   login(token, role);
  //   navigate(`/${role}/dashboard`);
  // };


  const handleLogin = () => {
    axiosInstance
      .post("Authenticate/Login", {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data: any = response.data.result;

        if (response.status === 200) {
          setValidUser("");
          console.log(data.token);
          localStorage.setItem("access_token", JSON.stringify(data));
          login(data.token, data.role, data.userId);
          navigate(`/${data.role}/dashboard`);
          window.location.reload();
          console.log(data);
        } else {
          setValidUser("Invalid username or password");
          alert(response.data.result)
          console.error(data.error);
        }
      })
      .catch((error) => {
        alert(error);
        setValidUser("Invalid username or password");
        console.error(error);
      });
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="container gradient-form my-3 p-0 shadow bg-light rounded align-content-center">
        <div className='row my-auto mh-100 align-self-center'>
          <div className="col-md-6 ">
            <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4 rounded">
              <img src={OnlyLogo}
                width="20%"
                alt="logo"
                className="mx-auto rounded"
              />
              <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">We are more than just a company</h4>
                <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mx-auto">
            <div className='text-end mx-2 '>
              <div className="btn btn-lg close" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </div>
            </div>
            <div className="d-flex flex-column ms-5">
              <div className="text-center mx-auto">
                <img src={Logo}
                  width="60%"
                  alt="logo"
                />
              </div>
              <div className='text-center'>
                <h4 className="mt-1 pb-1 h3">We are the Team</h4>
              </div>
              <div className='p-3 border bg-white rounded w-75 mx-auto my-4'>
                <div className='text-center h5'>
                  <p>Please login to your account</p>
                </div>
                <div className='text-center px-3'>
                  <div className='my-2'>
                    <TextField
                      className='w-75 bg-white'
                      id="outlined-password-input"
                      label="Username"
                      name='username'
                      type="text"
                      autoComplete="current-password"
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <div className='my-2'>
                    <TextField
                      className='w-75 bg-white'
                      id="outlined-password-input"
                      label="Password"
                      name='password'
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      onChange={e => setPassword  (e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                </div>
                <div className="text-center my-1">
                  <button
                    className="btn mb-4 w-50 gradient-custom-2 text-white"
                    onClick={handleLogin}>Log In</button>
                </div>
                <div className="text-center py-1 mb-5">
                  <a className="text-muted" href="#!">Forgot password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
