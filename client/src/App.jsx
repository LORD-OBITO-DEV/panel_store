import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PanelList from "./pages/PanelList";
import Checkout from "./pages/Checkout";

function App() {
  const [theme, setTheme] = React.useState("dark"); // ou "light"

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
        <Route path="/panels/:type" element={<PanelList theme={theme} />} />
        <Route path="/checkout" element={<Checkout theme={theme} />} />
      </Routes>
    </Router>
  );
}

export default App;
