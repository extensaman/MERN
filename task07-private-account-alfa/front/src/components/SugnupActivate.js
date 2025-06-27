import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import {
  BACK_SIGN_UP_ACTIVATE_URL,
  TOKEN_KEY_NAME_IN_LOCAL_STORAGE,
} from "../constants";
import { useState } from "react";
import LoadingProgress from "./LoadingProgress";
import { useLocation, useNavigate } from "react-router";

const SignupActivate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const email = useLocation().state.email;
  const navigate = useNavigate();

  const initialValues = { code: "", password: "", confirmPassword: "" };

  const onSubmit = (values) => {
    console.log(values);
    setIsLoading(true);
    axios
      .post(BACK_SIGN_UP_ACTIVATE_URL, {
        email: email,
        ...values,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(
          TOKEN_KEY_NAME_IN_LOCAL_STORAGE,
          response.data.token
        );
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const validateSchema = Yup.object({
    code: Yup.string().required("Поле код обязательно"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .required("Поле password обязательно"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли должны совпадать")
      .required("Поле подтверждения пароля обязательно"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validateSchema,
  });

  return (
    <Grid container spacing={2}>
      <Grid size="grow" />
      <Grid size={2}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            sx={{ my: "10px" }}
            size="small"
            id="code"
            name="code"
            label="Введите код направленный на Вашу электронную почту"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.code && formik.touched.code}
            helperText={formik.touched.code && formik.errors.code}
          />
          <TextField
            fullWidth
            sx={{ my: "10px" }}
            size="small"
            id="password"
            name="password"
            type="password"
            label="Введите пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password && formik.touched.password}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            sx={{ my: "10px" }}
            size="small"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Повторите пароль"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          {isLoading ? (
            <LoadingProgress />
          ) : (
            <Button type="submit" variant="outlined" fullWidth>
              Установить новый пароль
            </Button>
          )}
        </form>
      </Grid>
      <Grid size="grow" />
    </Grid>
  );
};

export default SignupActivate;
