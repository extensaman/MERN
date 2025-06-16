import React from "react";
import { TOKEN_KEY_NAME_IN_LOCAL_STORAGE } from "../constants";

class PrivateAccountLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
    };

    const tokenFromLocalStorage = localStorage.getItem(
      TOKEN_KEY_NAME_IN_LOCAL_STORAGE
    );
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
