import Home from "@/pages/home/Home";
import About from "@/pages/about/About";

export const routes: {
  path: string;
  element: React.JSX.Element;
}[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
];
