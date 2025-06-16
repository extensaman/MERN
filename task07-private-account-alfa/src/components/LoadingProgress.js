import { CircularProgress } from "@mui/material";
import { useState } from "react";

const LoadingProgress = () => {
  const [visibility, setVisibility] = useState(false);

  setTimeout(() => {
    setVisibility(true);
  }, 500);

  return (
    <div className="loadingProgress">{visibility && <CircularProgress />}</div>
  );
};

export default LoadingProgress;
