import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "../../assets/css/Registration.css"
import Logo from "../../assets/images/Logo.png"
import { type } from "os";
import useHttp from "../../config/https";
import { RegisterData } from "../../data/RegisterData";
import { useNavigate } from "react-router-dom";

type Props = {
  title: String;
}

const RegistrationForm: React.FC<Props> = ({ title }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { axiosInstance, loading } = useHttp();
  const [register, setRegisterData] = useState<RegisterData>({
    name: "",
    username: "",
    password: "",
    email: ""
  })

  const [emailAlertMessage, setEmailAlertMessage] = useState("");
  const [emailAlert, setEmailAlert] = useState<boolean>(false);
  const [usernameAlertMessage, setUsernameAlertMessage] = useState("");
  const [usernameAlert, setUsernameAlert] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterData({
      ...register,
      [name]: value
    });
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target
    setRegisterData({
      ...register,
      [name]: value
    });
    if (validateEmail(value)) {
      axiosInstance
        .get(`Authenticate/IsEmailExist/${value}`)
        .then(res => {
          if (res.data.result) {
            setEmailAlert(true);
            setEmailAlertMessage(res.data.message);
          }
          else {
            setEmailAlert(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      setEmailAlert(false);
    }
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target
    setRegisterData({
      ...register,
      [name]: value
    });
    if (validateName(value)) {
      axiosInstance
        .get(`Authenticate/IsUsernameExist/${value}`)
        .then(res => {
          if (res.data.result) {
            setUsernameAlert(true);
            setUsernameAlertMessage(res.data.message);
          }
          else {
            setUsernameAlert(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      setUsernameAlert(false);
    }
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger
    event.preventDefault();
    const { name, value } = event.target;
    setRegisterData({
      ...register,
      [name]: value
    });
    if (validatePassword(value)) {
      setPasswordMessage("");
    }
    else {
      setPasswordMessage("* Password should start with capital letter and contain numbers and special characters");
    }
  }

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title == 'Admin') {
      axiosInstance
        .post("Authenticate/register-admin", register)
        .then(res => {
          navigate('/Admin/Dashboard')
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      const newEmployee = { ...register };
      axiosInstance
        .post(`Employee/AddEmployee`, newEmployee)
        .then(res => {
          console.log(res.data.result)
          navigate("/Admin/Dashboard")
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  function validateName(name: string) {
    var re = /^[a-zA-Z ]+$/;
    return re.test(name);
  }

  function validatePassword(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])(?!.*\s)[A-Z][a-zA-Z0-9!@#$%^&*()_+~`|\\{}\[\]:\";'<>?,./]{7,14}$/;
    return regex.test(password);
  }


  function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <section className="bg-image">
      <div className="mask d-flex align-items-center gradient-custom-3">
        <div className="container h-100 my-auto">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ "borderRadius": "15px", "margin": "13px 0" }}>
                <div className="card-body p-3">
                  <div className="text-center mx-auto">
                    <img src={Logo}
                      width="60%"
                      alt="logo"
                    />
                  </div>
                  <h4 className="text-center my-2">Create {title}</h4>
                  <form>
                    <div className='text-center px-3'>
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-name-input"
                          label="Name"
                          name='name'
                          value={register.name}
                          type="text"
                          autoComplete="name"
                          onChange={handleChange}
                          required
                        />
                        {/* {register.name == "" ? <p className="text-danger font-weight-bold">* Please enter the name</p> : null}
            {!validateName(register.name) && register.name !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid name</p> : null} */}
                      </div>
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-email-input"
                          label="Email"
                          name='email'
                          value={register.email}
                          type="text"
                          autoComplete="Email"
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-username-input"
                          label="Username"
                          name='username'
                          value={register.username}
                          type="text"
                          autoComplete="username"
                          onChange={handleUsernameChange}
                        />
                      </div>
                      <div className='mb-2'>
                        <TextField
                          className='w-75 bg-white'
                          id="outlined-password-input"
                          label="Password"
                          name='password'
                          value={register.password}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          onChange={handlePassword}
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