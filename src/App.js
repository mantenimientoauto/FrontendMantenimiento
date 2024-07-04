import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './pages/home';
import Mantenimiento from './pages/Mantenimiento';
import AuthProvider, {AuthContext} from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/mantenimiento" element={<ProtectedRoute component={Mantenimiento} />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ component: Component }) => {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => isAuthenticated ? <Component /> : <Navigate to="/" />}
    </AuthContext.Consumer>
  );
};


export default App;