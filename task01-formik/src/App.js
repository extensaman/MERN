import { Formik, Form, Field, ErrorMessage } from "formik";
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

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Field
              className={errors.email && touched.email ? "input-error" : ""}
              name="email"
              type="text"
            />
            <div className="contentBlock">
              <ErrorMessage name="email" />
            </div>
            <Field
              style={{ height: 14 }}
              className={
                errors.password && touched.password ? "input-error" : ""
              }
              name="password"
              type="password"
            />
            <div className="contentBlock">
              <ErrorMessage name="password" />
            </div>
            <Field
              style={{ height: 14 }}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "input-error"
                  : ""
              }
              name="confirmPassword"
              type="password"
            />
            <div className="contentBlock">
              <ErrorMessage name="confirmPassword" />
            </div>
            <button type="submit">Enter</button>
            <div>{values.email}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
