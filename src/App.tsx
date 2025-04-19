
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pricing from "./pages/Pricing";
import SignUp from "./pages/SignUp";

// Add our new pages
import BatchManagementPage from "./pages/dashboard/student/BatchManagementPage";
import GroupCheckoutPage from "./pages/dashboard/student/GroupCheckoutPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/student/batch-management" element={<BatchManagementPage />} />
        <Route path="/dashboard/student/group-checkout" element={<GroupCheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
