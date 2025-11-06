import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
// import Leads from "./pages/Leads";
// import ROI from "./pages/ROI";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";
import { DataProvider } from "./context/DataContext";
import ConnectAccounts from "./pages/ConnectAccounts";
import SyncLeads from "./pages/SyncLeads";
import AddPixels from "./pages/AddPixels";

function App() {
  return (
    <ThemeProvider>


    
    <Router>
<DataProvider>
          <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow"> <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard/connect-account" element={<ConnectAccounts />} />
        <Route path="/dashboard/sync-leads" element={<SyncLeads />} />
        <Route path="/dashboard/add-pixels" element={<AddPixels />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Protected / Dashboard Routes */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/leads" element={<Leads />} />
        <Route path="/roi" element={<ROI />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} /> */}

        {/* Redirect unknown routes */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes></main>
      
      <Footer />
    </div>

   
    </DataProvider>
    </Router>
    </ThemeProvider>
  );
}

export default App;
