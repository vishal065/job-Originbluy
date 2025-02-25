import Dashboard from "../pages/dashboard";
import Images from "../pages/Images";
import Videos from "../pages/Videos";

export const UserPrivateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },

  {
    path: "/images",
    element: <Images />,
  },
  {
    path: "/videos",
    element: <Videos />,
  },
];
