import React from "react";
import axios from "axios";
import { BACK_URL, TOKEN_KEY_NAME_IN_LOCAL_STORAGE } from "../constants";

class PrivateAccountLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
    };

    const tokenFromLocalStorage = localStorage.getItem(
      TOKEN_KEY_NAME_IN_LOCAL_STORAGE
    );

    axios
      .post(BACK_URL, { token: tokenFromLocalStorage })
      .then((response) => {
        console.log(response);
        this.setState({ isLoading: false, data: "FROM BACK" });
      })
      .catch((err) => {
        if (err.response) {
          console.log(
            "Есть связь с сервером, но код ответа от него следующий:" +
              err.response.status
          );
        } else {
          console.log("Нет связи с сервером");
        }

        this.setState({ isLoading: false, data: null });
      });
  }

  render() {
    return (
      <div>
        <h1>PrivateAccountLoader component</h1>
      </div>
    );
  }
}

export default PrivateAccountLoader;
