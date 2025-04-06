import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Alapértelmezett átirányítás a login oldalra */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Nyilvános útvonal */}
        <Route path="/login" element={<LoginScreen />} />
        
        {/* Védett útvonal */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
