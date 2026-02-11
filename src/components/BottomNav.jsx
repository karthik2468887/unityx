import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Wallet, User } from 'lucide-react';
import '../styles/BottomNav.css';

const BottomNav = () => {
    const location = useLocation();

    // Hide bottom nav on specific screens (like login or full-screen video)
    const hidePaths = ['/login', '/learn'];
    if (hidePaths.some(path => location.pathname.startsWith(path))) return null;

    return (
        <nav className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Home size={24} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/my-learning" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <BookOpen size={24} />
                <span>Learning</span>
            </NavLink>
            <NavLink to="/wallet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Wallet size={24} />
                <span>Wallet</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <User size={24} />
                <span>Profile</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
