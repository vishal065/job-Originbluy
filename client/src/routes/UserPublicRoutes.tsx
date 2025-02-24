import Hero from "../components/Hero";
import Images from "../pages/Images";

export const UserPublicRoutes = [
  {
    path: "/",
    element: <Hero />,
  },

  {
    path: "/images",
    element: <Images />,
  },
];
