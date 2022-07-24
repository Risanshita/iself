import { Navigate } from "react-router-dom";
import { Counter } from "./screens/Counter";
import { FetchData } from "./screens/FetchData";
import { Home, LineHome } from "./screens/homepage";
import Login from "./screens/login";
import NotFound from "./screens/NotFound";

const AppRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/line",
    element: <LineHome />,
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
