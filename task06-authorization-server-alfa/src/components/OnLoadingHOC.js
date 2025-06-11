export const OnLoadingHOC = (Component) => {
  return ({ isLoading, ...props }) => {
    if (!isLoading) {
      return <Component {...props} />;
    } else {
      return <h6>Please wait! Data is loading.</h6>;
    }
  };
};
