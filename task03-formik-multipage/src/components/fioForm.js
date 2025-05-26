import { ErrorMessage, Field } from "formik";
const FioForm = () => {
  return (
    <div>
      <label htmlFor="name">Имя:</label>
      <Field type="text" id="name" name="name" />
      <ErrorMessage name="name" />
      <label htmlFor="surname">Фамилия:</label>
      <Field type="text" id="surname" name="surname" />
      <ErrorMessage name="surname" />
    </div>
  );
};

export default FioForm;
