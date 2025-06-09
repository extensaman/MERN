import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import axios from "axios";

function App() {
  const baseUrl = "http://localhost:5000";
  const initialValues = { email: "", password: "", confirmPassword: "" };

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post(baseUrl + "/signup", values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
          <Button type="submit" variant="outlined" fullWidth>
            Войти
          </Button>
        </form>
      </Grid>
      <Grid size="grow" />
    </Grid>
  );
}

export default App;
