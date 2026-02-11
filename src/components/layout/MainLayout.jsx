import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDeviceType } from '../../hooks/useDeviceType';
import TopNavbar from './TopNavbar';
import BottomNav from '../BottomNav';

const MainLayout = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { isMobile } = useDeviceType();

    if (!isAuthenticated) return (
        <div className="container">
            <main className="main-content">
                {children}
            </main>
        </div>
    );

    return (
        <div className="container">
            <TopNavbar />

            <main className="main-content">
                {children}
            </main>

            {isMobile && <BottomNav />}
        </div>
    );
};

export default MainLayout;
