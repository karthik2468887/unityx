import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { WalletProvider } from './context/WalletContext';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import BottomNav from './components/BottomNav';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import ConceptDetail from './pages/ConceptDetail';
import VideoPlayer from './pages/VideoPlayer';
import Wallet from './pages/Wallet';
import MentorUpload from './pages/MentorUpload';
import MyLearning from './pages/MyLearning';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import SubjectDashboard from './pages/SubjectDashboard';
import VideoView from './pages/VideoView';
import Credits from './pages/Credits';
import Contact from './pages/Contact';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import TeachingDashboard from './pages/TeachingDashboard';
import CategoryConcepts from './pages/CategoryConcepts';
import AccountSettings from './pages/AccountSettings';

// Role-based route protection component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isAdmin, isMentor } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (requiredRole === 'admin' && !isAdmin) return <Navigate to="/" replace />;
  if (requiredRole === 'mentor' && !isMentor) return <Navigate to="/" replace />;

  return children;
};

import MainLayout from './components/layout/MainLayout';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated on mount (except login page)
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/concept/:id" element={
          <ProtectedRoute>
            <ConceptDetail />
          </ProtectedRoute>
        } />

        <Route path="/learn/:id" element={
          <ProtectedRoute>
            <VideoPlayer />
          </ProtectedRoute>
        } />

        <Route path="/learn-module/:id" element={
          <ProtectedRoute>
            <VideoView />
          </ProtectedRoute>
        } />

        <Route path="/credits" element={<Credits />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/modules" element={
          <ProtectedRoute>
            <Modules />
          </ProtectedRoute>
        } />

        <Route path="/module/:id" element={
          <ProtectedRoute>
            <ModuleDetail />
          </ProtectedRoute>
        } />

        <Route path="/teaching-dashboard" element={
          <ProtectedRoute requiredRole="mentor">
            <TeachingDashboard />
          </ProtectedRoute>
        } />

        <Route path="/category/:categoryId" element={
          <ProtectedRoute>
            <CategoryConcepts />
          </ProtectedRoute>
        } />

        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />

        <Route path="/my-learning" element={
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        } />

        <Route path="/mentor/upload" element={
          <ProtectedRoute>
            <MentorUpload />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/profile/settings" element={
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/subject/:id" element={
          <ProtectedRoute>
            <SubjectDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <ContentProvider>
            <AppContent />
          </ContentProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
