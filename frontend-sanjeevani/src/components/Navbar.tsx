import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../auth/firebase';
import { useAuthContext } from '../auth/useAuthContext';

const links = [
  { to: '/donors', label: 'Find Donors', icon: '👥' },
  { to: '/predict', label: 'Predict', icon: '🔮' },
  { to: '/inventory', label: 'Blood Bank', icon: '🏥' },
  { to: '/leaderboard', label: 'Heroes Board', icon: '🏆' },
  { to: '/badges', label: 'Achievements', icon: '🎖️' },
  { to: '/chatbot', label: 'Assistant', icon: '💬' }
];

export default function Navbar() {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white grid place-items-center font-bold text-lg shadow-elevated group-hover:shadow-lg transition-shadow duration-200">
                🩸
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-secondary-900">Sanjeevani</span>
                <span className="text-xs text-secondary-500 font-medium">Blood Warriors</span>
              </div>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                  }
                >
                  <span className="text-base">{l.icon}</span>
                  {l.label}
                </NavLink>
              ))}
              {user && (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                  }
                >
                  <span className="text-base">👤</span>
                  Profile
                </NavLink>
              )}
            </nav>
          </div>
          {/* User Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-secondary-900">Welcome back!</span>
                  <span className="text-xs text-secondary-500">{user.email}</span>
                </div>
                <button onClick={() => logout()} className="btn btn-outline">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Join as Blood Warrior
              </Link>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              aria-label="Toggle navigation"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {open && (
        <div className="lg:hidden border-t border-secondary-200 bg-white shadow-elevated">
          <nav className="px-4 py-4 flex flex-col gap-2 max-w-7xl mx-auto">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                }
              >
                <span className="text-base">{l.icon}</span>
                {l.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                }
              >
                <span className="text-base">👤</span>
                Profile
              </NavLink>
            )}
            <div className="pt-4 mt-4 border-t border-secondary-200">
              {user ? (
                <button 
                  onClick={() => { logout(); setOpen(false); }} 
                  className="btn btn-outline w-full"
                >
                  Sign Out
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setOpen(false)} 
                  className="btn btn-primary w-full"
                >
                  Join as Blood Warrior
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}