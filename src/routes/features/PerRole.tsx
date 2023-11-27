import { Navigate, useLocation } from "react-router-dom";
import { getLocalStoredUser } from "../../api/authentication";

type PerRoleProps = {
  roleElements?: {
    role: string,
    element: JSX.Element
  }[]
}

export const PerRole: React.FC<PerRoleProps> = (props) => {

  const localUser = getLocalStoredUser();
  const location = useLocation();

  if (localUser && (localUser.userRole !== undefined)) {
    const userRole = localUser.userRole;
    const roleElement = props.roleElements?.find((roleElement) => roleElement.role === userRole);

    if (roleElement) {
      return roleElement.element;
    } else {
      return (
        <Navigate to="/login?reason=unauthorized" state={{ from: location.pathname }} replace />
      )
    }

  } else {
    return (
      <Navigate to="/login?reason=nocredentials" state={{ from: location.pathname }} replace />
    )
  }

}

export default PerRole;