import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "../../assets/css/Registration.css"
import Logo from "../../assets/images/Logo.png"

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="bg-image">
      <div className="mask d-flex align-items-center gradient-custom-3">
        <div className="container h-100 my-auto">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ "borderRadius": "15px;", "margin": "13px 0" }}>
                <div className="card-body p-3">
                  <div className="text-center mx-auto">
                    <img src={Logo}
                      width="60%"
                      alt="logo"
                    />
                  </div>
                  <h4 className="text-center my-2">Create Admin</h4>
                  <form>
                    <div className='text-center px-3'>
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-password-input"
                          label="Name"
                          name='name'
                          type="text"
                          autoComplete="name"
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-password-input"
                          label="Email"
                          name='email'
                          type="text"
                          autoComplete="Email"
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='mb-2'>
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
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-password-input"
                          label="Password"
                          name='password'
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          onChange={e => setPassword(e.target.value)}
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
                    <div className="form-check d-flex justify-content-center mb-1">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body border-none">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm;