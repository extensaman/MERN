import { Field } from 'formik';

const PayForm = () => {
    return (
        <div>
            <label htmlFor="cardNumber">Номер карты:</label>
            <Field type="text" id="card-number" name="cardNumber" />
            <label htmlFor="expire">Срок действия:</label>
            <Field type="text" id="expire" name="expire" />
        </div>
    )
}

export default PayForm;