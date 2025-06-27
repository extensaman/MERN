import React from "react";
import axios from "axios";
import { OnLoadingHOC } from "./OnLoadingHOC";
import { PrivateAccountVisualization } from "./PrivateAccountVisualization";
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
      .then((authorizedData) => {
        console.log(authorizedData);
        this.setState({ isLoading: false, data: authorizedData.data.email });
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
    const DataLoading = OnLoadingHOC(PrivateAccountVisualization);
    return (
      <>
        <DataLoading isLoading={this.state.isLoading} data={this.state.data} />
      </>
    );
  }
}

export default PrivateAccountLoader;
