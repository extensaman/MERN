import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants";
import { OnLoadingHOC } from "./OnLoadingHOC";
import { AuthorizedContentVisualization } from "./AuthorizedContentVisualization";

export const AuthorizedContentLoader = () => {
  var tokenFromLocalStorage = localStorage.getItem("token");

  const DataLoading = OnLoadingHOC(AuthorizedContentVisualization);

  const [appState, setAppState] = useState({
    loading: false,
    data: null,
  });

  useEffect(() => {
    console.log("useEffect started");
    console.log("tokenFromLocalStorage = " + tokenFromLocalStorage);
    setAppState({ loading: true });

    axios
      .post(BASE_URL, { token: tokenFromLocalStorage })
      .then((authorizedData) => {
        console.log(authorizedData.data);
        if (authorizedData.data) {
          setAppState({
            loading: false,
            data: authorizedData.data.user,
          });
        } else {
          setAppState({
            loading: false,
            data: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAppState({
          loading: false,
          data: null,
        });
      });
  }, []);

  return (
    <>
      <DataLoading isLoading={appState.loading} data={appState.data} />
    </>
  );
};
