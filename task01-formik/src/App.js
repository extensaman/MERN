import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function App() {
  const initialValues = { email: "", password: "" };
  const onSubmit = (values) => console.log(values);
  const validateSchema = Yup.object({
    email: Yup.string().email("Неверный формат email").required("Поле email обязательно"),
    password: Yup.string().required("Поле password обязательно"),
  });

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
        {({ values }) => (
          <Form>
            <Field name="email" type="text"></Field>
            <div className='contentBlock'><ErrorMessage name="email" /></div>
            <Field style={{ height: 14 }} name="password" type="password"></Field>
            <div className='contentBlock'><ErrorMessage name="password" /></div>
            <button type="submit">Enter</button>
            <div>{values.email}</div>
          </Form>
        )}
      </Formik>
    </div >
  );
}

export default App;
