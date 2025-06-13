import LoadingProgress from "./LoadingProgress";

export const OnLoadingHOC = (Component) => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) {
      return <Component {...props} />;
    } else {
      return <LoadingProgress />;
    }
  };
};
