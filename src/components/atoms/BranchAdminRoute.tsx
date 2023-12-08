import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Navigate } from "react-router-dom";

export default function BranchAdminRoute(props: React.PropsWithChildren) {
  const userState = useSelector((state: RootState) => state.login);

  if (userState.role === "branch_admin" && userState.isAuthenticated) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
