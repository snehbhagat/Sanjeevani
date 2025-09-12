import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Donors from './pages/Donors';
import Predict from './pages/Predict';
import Inventory from './pages/Inventory';
import GamificationProfile from './pages/GamificationProfile';
import Donation from './pages/Donation';
import Activity from './pages/Activity';
import Leaderboard from './pages/Leaderboard';
import Badges from './pages/Badges';
import Chatbot from './pages/Chatbot';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Navbar from './components/Navbar';

function HomeCard({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="card hover:shadow-md transition-shadow">
      <div className="card-body">
        <div className="text-base font-semibold">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{desc}</div>
      </div>
    </Link>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-6">
        <div className="container-page">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <HomeCard to="/donors" title="Donors" desc="Browse and filter the donor directory." />
                  <HomeCard to="/predict" title="Predict" desc="Run donor availability predictions." />
                  <HomeCard to="/inventory" title="Inventory" desc="Check current blood stock by group." />
                  <HomeCard to="/profile" title="Profile" desc="View stats, badges and progress." />
                  <HomeCard to="/donation" title="Donation" desc="Record a new donation." />
                  <HomeCard to="/activity" title="Activity" desc="Record non-donation activities." />
                  <HomeCard to="/leaderboard" title="Leaderboard" desc="Top users by points." />
                  <HomeCard to="/badges" title="Badges" desc="All badges available in the system." />
                  <HomeCard to="/chatbot" title="Chatbot" desc="Ask questions; multilingual support." />
                </div>
              }
            />
            <Route path="/donors" element={<Donors />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<ProtectedRoute><GamificationProfile /></ProtectedRoute>} />
            <Route path="/donation" element={<ProtectedRoute><Donation /></ProtectedRoute>} />
            <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>
      </main>
      <footer className="text-center text-xs py-6 text-gray-500">
        Sanjeevani AI Demo • Not for production use
      </footer>
    </div>
  );
}