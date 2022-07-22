import { Counter } from "./screens/Counter";
import { FetchData } from "./screens/FetchData";
import { Home } from "./screens/Home";
import Login from "./screens/login";

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
];

export default AppRoutes;
