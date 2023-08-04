
type ShieldComponent = ((props: any) => JSX.Element) | React.LazyExoticComponent<(props: any) => JSX.Element>;

const useRefreshToken = () => {
  const shield = (Component: ShieldComponent) => {
    // if (!token) return <Navigate to={'/sign-in'} replace />;
    return <Component/>;
  };

  return { shield };
};

export default useRefreshToken;
