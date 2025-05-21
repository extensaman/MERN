import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import ChooseForm from './components/ChooseForm';

function App() {

  const { currentPage, setCurrentPage } = useState(0);

  const initialValues = {
    name: "",
    surname: "",
    city: "",
    street: "",
    house: "",
    card: "",
    expire: ""
  };

  const pages = ["Name and surname", "Adress", "Payment information"];

  const onSubmit = (values) => console.log(values);

  const validateSchema = Yup.object({
    email: Yup.string().email("Неверный формат email").required("Поле email обязательно"),
    password: Yup.string().required("Поле password обязательно"),
  });

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
        {({ values }) => {
          return (
            <Form>
              {console.log(currentPage)}
              <ChooseForm page={currentPage} />
              <button type="submit">Enter</button>
              <div>{values.email}</div>
            </Form>
          )
        }}
      </Formik>
    </div >
  );
}

export default App;
