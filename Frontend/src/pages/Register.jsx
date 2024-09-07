import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { useFormik } from "formik";
import { registerFormScheams } from "../schemas/registerFormSchemas";

export default function Register() {
  const navigate = useNavigate();

  const register = () => {
    axios.post("http://localhost:5000/api/auth/register",values).then(res=>{
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user))
    navigate("/");
    })        
    .catch((err)=>{
      alert(err.response.data.message);
    })
  };

  const {values, errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: registerFormScheams,
    onSubmit: register
  });

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="logo">
          <h2>KAYIT OL</h2>
        </div>
        <div className="login-form">
          <form action="" onSubmit={handleSubmit}>
            <input
              value={values.name}
              onChange={handleChange}
              type="text"
              name="name"
              className="form-input3"
              placeholder="Kullanıcı Adı"
            />
             {errors.name && <p className="error">{errors.name}</p>}
            <input
              value={values.email}
              onChange={handleChange}
              type="text"
              name="email"
              className="form-input3"
              placeholder="E-posta"
            />
             {errors.email && <p className="error">{errors.email}</p>}
            <input
              value={values.password}
              onChange={handleChange}
              type="text"
              name="password"
              className="form-input3"
              placeholder="Şifre"
            />
             {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit" className="button">Kayıt Ol</button>
          </form>
        </div>
        <div>
          Hesabın var mı?
          <Link to="/login" className="register">
            <strong> Giriş Yap</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
