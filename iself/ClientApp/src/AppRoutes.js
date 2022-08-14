import { Navigate } from "react-router-dom";
import BrowseScreen from "./screens/browse";
import { Counter } from "./screens/Counter";
import { FetchData } from "./screens/FetchData";
import { HomeScreen } from "./screens/homepage";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";
import PostScreen from "./screens/post";
import { ProfileScreen } from "./screens/profile";
import RateUs from "./screens/RateUs/RateUs";
import SignUp from "./screens/signup/signup";
import UsersList from "./screens/userslist/userslist";

const AppRoutes = [
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/post",
    element: <PostScreen />,
    isProtected: true,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
    isProtected: true,
  },
  {
    path: "/paraphrase",
    element: <Counter />,
  },
  {
    path: "/users",
    element: <UsersList />,
  },
  {
    path: "/feedback",
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
    path: "/signup",
    element: <SignUp />,
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

export const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AppRoutes;
