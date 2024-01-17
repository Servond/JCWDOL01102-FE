import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Navigate } from "react-router-dom";
interface PrivateRouteProps {
  children: React.ReactNode;
  roleAccess: string[];
  unautorizedPath?: string;
}
export default function PrivateRoute(props: PrivateRouteProps) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const loginState = useSelector((state: RootState) => state.login);

  if (!props.roleAccess.includes(loginState.role) && isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return isAuthenticated ? props.children : <Navigate to={"/login"} />;
}
