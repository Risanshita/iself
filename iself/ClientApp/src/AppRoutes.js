import { Navigate } from "react-router-dom";
import BrowseScreen from "./screens/Browse";
import { Counter } from "./screens/Counter";
import { FetchData } from "./screens/FetchData";
import { HomeScreen } from "./screens/homepage";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";
import PostScreen from "./screens/post";
// import Rateus from "screens/RateUs";
import { ProfileScreen } from "./screens/profile";
import RateUs from "./screens/RateUs/RateUs";

const AppRoutes = [
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/post",
    element: <PostScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
  {
    path: "/paraphrase",
    element: <Counter />,
  },
  {
    path: "/RateUs",
    element: <RateUs />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <BrowseScreen />,
  },

  {
    path: "404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

export default AppRoutes;
