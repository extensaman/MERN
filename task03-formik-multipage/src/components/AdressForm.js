import { Field } from "formik";

const AdressForm = () => {
  return (
    <div>
      <label htmlFor="city">Город:</label>
      <Field type="text" id="city" name="city" />
      <label htmlFor="street">Улица:</label>
      <Field type="text" id="street" name="street" />
      <label htmlFor="house">Дом:</label>
      <Field type="text" id="house" name="house" />
    </div>
  );
};
export default AdressForm;
