import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './App.css';

function App() {
  const initialValues = { email: "", password: "" };
  const onSubmit = (values) => console.log(values);
  const validateSchema = Yup.object({
    email: Yup.string().email("Неверный формат email").required("Поле email обязательно"),
    password: Yup.string().required("Поле email обязательно"),
  });

  return (
    <div className="App">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            <Field name="email" type="email"></Field>
            <Field name="password" type="password"></Field>
            <button type="submit">Enter</button>
            <div>{values.email}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
