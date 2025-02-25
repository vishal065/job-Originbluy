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
  console.log("RootRouting ", auth.auth);

  return (
    <Routes>
      {auth.auth && (
        <Route element={<PrivateLayout />}>
          {UserPrivateRoutes.map((item, i) => (
            <Route path={item.path} key={i} element={item.element} />
          ))}
        </Route>
      )}
      {!auth.auth ? (
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
