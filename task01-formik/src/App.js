import { Formik, Form, Field } from 'formik';
import './App.css';

function App() {
  initialValues = { email: "", password: "" };
  const onSubmit = (values) => console.log(values);

  return (
    <div className="App">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>

      </Formik>
    </div>
  );
}

export default App;
