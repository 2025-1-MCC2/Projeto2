// components/ProtectedRoute.js
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner de loading
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;