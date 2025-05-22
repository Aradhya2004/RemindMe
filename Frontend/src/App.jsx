import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReminderForm from "./components/ReminderForm";
import ReminderList from "./components/ReminderList";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <nav className="bg-blue-600 p-4 text-white flex justify-center gap-8 sticky top-0 z-10">
          <Link to="/list" className="hover:underline">
            View Reminders
          </Link>
        </nav>

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ReminderForm />} />
            <Route path="/list" element={<ReminderList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
