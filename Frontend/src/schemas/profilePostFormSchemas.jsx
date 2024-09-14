import * as Yup from "yup";

export const profilePostFormScheams = Yup.object().shape({
    title: Yup.string().required("Başlık alanı gereklidir"),
    description: Yup.string().required("Açıklama alanı gereklidir"),
    images: Yup.string().required("Resim alanı gereklidir"),
  });