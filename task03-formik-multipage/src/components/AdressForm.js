import { ErrorMessage, Field } from "formik";

const AdressForm = () => {
  return (
    <div>
      <label htmlFor="city">Город:</label>
      <Field type="text" id="city" name="city" />
      <ErrorMessage name="city" />
      <label htmlFor="street">Улица:</label>
      <Field type="text" id="street" name="street" />
      <ErrorMessage name="street" />
      <label htmlFor="house">Дом:</label>
      <Field type="text" id="house" name="house" />
      <ErrorMessage name="house" />
    </div>
  );
};
export default AdressForm;
