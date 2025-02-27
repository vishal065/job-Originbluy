import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/Notfound";
import { UserPrivateRoutes } from "./UserPrivateRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { userAuthRoute } from "./userAuthRoute";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";

const RootRouting = () => {
  const { auth } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {auth?.statusCode === 200 && auth?.data.accessToken && (
        <Route element={<PrivateLayout />}>
          {UserPrivateRoutes.map((item, i) => (
            <Route path={item.path} key={i} element={item.element} />
          ))}
        </Route>
      )}
      {auth?.statusCode != 200 ? (
        <Route element={<PublicLayout />}>
          {userAuthRoute.map((item, i) => (
            <Route path={item.path} key={i} element={item.element} />
          ))}
        </Route>
      ) : (
        userAuthRoute.map((item, i) => (
          <Route path={item.path} key={i} element={<Navigate to={"/"} />} />
        ))
      )}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootRouting;
