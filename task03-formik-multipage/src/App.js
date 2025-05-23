import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import ChooseForm from "./components/ChooseForm";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const initialValues = {
    name: "",
    surname: "",
    city: "",
    street: "",
    house: "",
    cardNumber: "",
    expire: "",
  };

  const pages = ["Name and surname", "Address", "Payment information"];

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const onSubmit = (values) => console.log(values);

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Неверный формат email")
      .required("Поле email обязательно"),
    password: Yup.string().required("Поле password обязательно"),
  });

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values }) => {
          return (
            <Form>
              <h1>{pages[currentPage]}</h1>
              <ChooseForm page={currentPage} />

              <button
                type="button"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                Prev page
              </button>

              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
              >
                Next page
              </button>

              <button
                type="submit"
                style={{
                  visibility:
                    currentPage === pages.length - 1 ? "visible" : "hidden",
                }}
              >
                Enter
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
