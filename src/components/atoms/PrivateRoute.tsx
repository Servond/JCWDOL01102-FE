import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props: React.PropsWithChildren) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );

  return isAuthenticated ? props.children : <Navigate to={"/login"} />;
}
