import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const initialValues = { email: "", password: "", confirmPassword: "" };

  const onSubmit = (values) => console.log(values);

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
    <div>
      <form onSubmit={formik.handleSubmit}></form>
    </div>
  );
}

export default App;
