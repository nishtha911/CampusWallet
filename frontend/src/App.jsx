import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
