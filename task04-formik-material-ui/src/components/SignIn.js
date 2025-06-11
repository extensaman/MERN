import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../constants";

const SignIn = (props) => {
  const initialValues = { email: "", password: "" };

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post(BASE_URL + "/signin", values)
      .then((response) => {
        console.log(response.data.token);
        props.setAppState({ token: response.data.token });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateSchema = Yup.object({
    email: Yup.string()
      //.email("Неверный формат email")
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
  );
};

export default SignIn;
