import { Navigate } from "react-router-dom";
import { Counter } from "./screens/Counter";
import Demo from "./screens/demo";
import { FetchData } from "./screens/FetchData";
import { HomeScreen } from "./screens/homepage";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";
import PostScreen from "./screens/post";

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
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/paraphrase",
    element: <Counter />,
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
    path: "404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

export default AppRoutes;
