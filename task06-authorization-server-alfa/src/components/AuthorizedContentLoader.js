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
    token: tokenFromLocalStorage,
    data: null,
  });

  useEffect(() => {
    console.log("useEffect started");
    console.log("appState.token = " + appState.token);
    console.log("tokenFromLocalStorage = " + tokenFromLocalStorage);
    setAppState({ loading: true });

    axios
      .post(BASE_URL, { token: appState.token })
      .then((authorizedData) => {
        console.log(authorizedData);
        if (authorizedData.data) {
          setAppState({
            loading: false,
            authorized: true,
            data: authorizedData.data,
          });
        } else {
          setAppState({ loading: false, authorized: false, data: null });
        }
      })
      .catch((err) => {
        console.log(err);
        setAppState({ loading: false, authorized: false, data: null });
      });
  }, [appState.token]);

  return (
    <>
      <DataLoading
        isLoading={appState.loading}
        data={appState.data}
        setAppState={setAppState}
      />
    </>
  );
};
