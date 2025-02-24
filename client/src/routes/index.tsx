import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/Notfound";
import SignUp from "../pages/SignUp";
// import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import UserLayout from "./UserLayout";
import { UserPublicRoutes } from "./UserPublicRoutes";

const RootRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        {UserPublicRoutes.map((item, i) => (
          <Route path={item.path} key={i} element={item.element} />
        ))}
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootRouting;
