import Home from "@/pages/home/Home";
import About from "@/pages/about/About";
import { Settings } from "@/pages/settings/Settings";

export const routes: {
  path: string;
  element: React.JSX.Element;
}[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/about",
    element: <About />,
  },
];
