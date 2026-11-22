import { BrowserRouter } from "react-router-dom";
import RouteView from "@/routes";
import Header from "@/components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen max-h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-x-auto bg-slate-100">
          <RouteView />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
