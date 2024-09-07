import * as Yup from "yup";

export const registerFormScheams = Yup.object().shape({
    email: Yup.string().email("Geçerli bir e-posta adresi girin").required("E-posta gereklidir"),
    password: Yup.string().required("Şifre gereklidir"),
    name: Yup.string().required("Kullanıcı Adı gereklidir"),
  });