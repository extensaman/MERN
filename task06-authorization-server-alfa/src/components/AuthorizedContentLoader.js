import axios from "axios";
import { BACK_URL } from "../constants";
import { OnLoadingHOC } from "./OnLoadingHOC";
import { AuthorizedContentVisualization } from "./AuthorizedContentVisualization";
import React from "react";

class AuthorizedContentLoader extends React.Component {
  constructor(props) {
    super(props);
    //localStorage.setItem("token", null);
    const tokenFromLocalStorage = localStorage.getItem("token");

    this.state = {
      loading: true,
      data: null,
    };

    console.log(
      "AuthorizedContentLoader CONSTRUCTOR. token = " + tokenFromLocalStorage
    );

    axios
      .post(BACK_URL, { token: tokenFromLocalStorage })
      .then((authorizedData) => {
        console.log(authorizedData.data);
        if (authorizedData.data) {
          this.setState({ loading: false, data: authorizedData.data.user });
        } else {
          this.setState({ loading: false, data: null });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false, data: null });
      });
  }

  render() {
    const DataLoading = OnLoadingHOC(AuthorizedContentVisualization);
    return (
      <>
        <DataLoading isLoading={this.state.loading} data={this.state.data} />
      </>
    );
  }
}

export default AuthorizedContentLoader;

// export const AuthorizedContentLoader = () => {
//   var tokenFromLocalStorage = localStorage.getItem("token");

//   const DataLoading = OnLoadingHOC(AuthorizedContentVisualization);

//   const [appState, setAppState] = useState({
//     loading: false,
//     data: null,
//   });

//   useEffect(() => {
//     console.log("useEffect started");
//     console.log("tokenFromLocalStorage = " + tokenFromLocalStorage);
//     setAppState({ loading: true });

//     axios
//       .post(BASE_URL, { token: tokenFromLocalStorage })
//       .then((authorizedData) => {
//         console.log(authorizedData.data);
//         if (authorizedData.data) {
//           setAppState({
//             loading: false,
//             data: authorizedData.data.user,
//           });
//         } else {
//           setAppState({
//             loading: false,
//             data: null,
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setAppState({
//           loading: false,
//           data: null,
//         });
//       });
//   }, []);

//   return (
//     <>
//       <DataLoading isLoading={appState.loading} data={appState.data} />
//     </>
//   );
// };
