import { Navigate } from "react-router-dom";
import { Counter } from "./screens/Counter";
import { FetchData } from "./screens/FetchData";
import { Home } from "./screens/Home";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
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
