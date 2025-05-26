import * as Yup from 'yup';

const stepOneSchema = Yup.object({
    name: Yup.string().required("Поле с именем обязательно для заполнения"),
    surname: Yup.string().required("Поле с фамилией  обязательно для заполнения")
})

const stepTwoSchema = Yup.object({
    city: Yup.string().required("Поле с городом обязательно для заполнения"),
    street: Yup.string().required("Поле с улицей обязательно для заполнения"),
    house: Yup.string().required("Поле с номером дома обязательно для заполнения")
})

const stepThreeSchema = Yup.object({
    cardNumber: Yup.string().required("Поле номер карты обязательно для заполнения"),
    expire: Yup.string().required("Поле дата годности обязательно для заполнения")
})

const GetValidationSchema = (step) => {
    switch (step) {
        case 0: return stepOneSchema;
        case 1: return stepTwoSchema;
        case 3: return stepThreeSchema;
        default: return null;
    }
}

export default GetValidationSchema;