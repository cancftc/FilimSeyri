import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useFormik } from 'formik';
import { loginFormScheams } from "../schemas/loginFormSchemas";

function Login() {
  const navigate = useNavigate();

  const login = () => {
    axios.post("http://localhost:5000/api/auth/login",values).then(res=>{
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user))
      window.location.reload(navigate('/'))
    })        
    .catch((err)=>{
      alert(err.response.data.message);
    })
  };

  const {values, errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginFormScheams,
    onSubmit: login
  });

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="logo">
          <h2>GİRİŞ YAP</h2>
        </div>
        <div className="login-form">
          <form action="" onSubmit={handleSubmit}>
            <input
              value={values.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="form-input2"
              placeholder="E-posta"
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              value={values.password}
              onChange={handleChange}
              type="password"
              className="form-input2"
              name="password"
              placeholder="Şifre"
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit" className="button">
              Giriş yap
            </button>
          </form>
        </div>
        <div>
          Hesabın yok mu?
          <Link to="/register" className="register">
            <strong> Kayıt Ol</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
