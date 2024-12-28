import Create from "./components/create";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Read from "./components/read";
import Update from "./components/update";
import './index.css'; // Adjust the path as necessary
import Sidebar from "./components/sidebar";
import Welcome from "./components/welcome";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen"> {/* Full height for the parent div */}
        <div className="w-full h-screen md:w-2/12 border mr-2 rounded-l"> {/* Sidebar takes full height */}
          <Sidebar />
        </div>
        <div className=" bg-slate-300 flex-1 p-4 overflow-auto"> {/* Main content with overflow handling */}
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update" element={<Update />} /> 
            <Route path="/read" element={<Read />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
