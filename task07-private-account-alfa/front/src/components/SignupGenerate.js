import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { BACK_SIGN_UP_GENERATE_URL } from "../constants";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingProgress from "./LoadingProgress";

const SignupGenerate = () => {
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = { email: "" };

    const navigate = useNavigate();

    const onSubmit = (values) => {
        console.log(values);
        setIsLoading(true);
        axios
            .post(BACK_SIGN_UP_GENERATE_URL, values)
            .then((response) => {
                console.log(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    };

    const validateSchema = Yup.object({
        email: Yup.string()
            .email("Неверный формат email")
            .required("Поле email обязательно")
    });

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validateSchema,
    });

    return (
        <Grid container spacing={2}>
            <Grid size="grow" />
            <Grid size={2}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        sx={{ my: "10px" }}
                        size="small"
                        id="email"
                        name="email"
                        label="Введите адрес электронной почты"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email && formik.touched.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    {isLoading ? <LoadingProgress /> : <Button type="submit" variant="outlined" fullWidth>
                        Отправить код
                    </Button>}
                </form>
            </Grid>
            <Grid size="grow" />
        </Grid>
    );
}

export default SignupGenerate;
