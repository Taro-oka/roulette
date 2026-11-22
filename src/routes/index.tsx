import { Routes, Route as Route } from "react-router-dom";
import { routes } from "./routes";

function RouteView() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default RouteView;
