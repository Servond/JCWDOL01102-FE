import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Navigate } from "react-router-dom";
import { Role } from "../../data/constants";

export default function BranchAdminRoute(props: React.PropsWithChildren) {
  const role = useSelector((state: RootState) => state.login.role);
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );

  if (role === Role.BRANCH_ADMIN && isAuthenticated) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
