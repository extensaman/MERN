import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { BACK_SIGN_IN_URL } from "../constants";
import { useNavigate } from "react-router";
import { useState } from "react";
import LoadingProgress from "./LoadingProgress";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = { email: "", password: "" };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    setIsLoading(true);
    axios
      .post(BACK_SIGN_IN_URL, values)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate(-1);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Неверный формат email")
      .required("Поле email обязательно"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .required("Поле password обязательно"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validateSchema,
  });

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size="grow" />
        <Grid size={2}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              sx={{ my: "10px" }}
              size="small"
              id="email"
              name="email"
              label="Введите адрес электронной почты"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email && formik.touched.email}
              helperText={formik.touched.email && formik.errors.email}
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
            <Button type="submit" variant="outlined" fullWidth>
              Войти
            </Button>
          </form>
        </Grid>
        <Grid size="grow" />
      </Grid>
      {isLoading && <LoadingProgress />}
    </div>
  );
};

export default SignIn;
