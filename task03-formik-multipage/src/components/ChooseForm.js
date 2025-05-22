import AdressForm from "./AdressForm";
import FioForm from "./fioForm";
import PayForm from "./PayForm";

const ChooseForm = (props) => {
  switch (props.page) {
    case 0:
      return <FioForm />;
    case 1:
      return <AdressForm />;
    case 2:
      return <PayForm />;
    default:
      return null;
  }
};

export default ChooseForm;
