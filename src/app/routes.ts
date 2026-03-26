import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Compare } from "./pages/Compare";
import { Map } from "./pages/Map";
import { Learn } from "./pages/Learn";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "compare", Component: Compare },
      { path: "map", Component: Map },
      { path: "learn", Component: Learn },
    ],
  },
]);