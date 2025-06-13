import { CircularProgress, Grid } from "@mui/material";
import { useState } from "react";

const LoadingProgress = () => {
  const [visibility, setVisibility] = useState(false);

  setTimeout(() => {
    setVisibility(true);
  }, 500);

  return (
    <div>
      {visibility && (
        <Grid container spacing={2}>
          <Grid size="grow" />
          <Grid size={1}>
            <CircularProgress />
          </Grid>
          <Grid size="grow" />
        </Grid>
      )}
    </div>
  );
};

export default LoadingProgress;
