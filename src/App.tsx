import React, { useLayoutEffect, useState } from 'react'
import './App.css'
import Calendar from './components/calendar'
import { useLocation } from 'react-router-dom'
import useAuth from '@store/useAuth';
import STORAGE_KEY from '@utils/storage-key';
import ProtectedRoutes from '@components/routes/ProtectedRoutes';
import UnprotectedRoutes from '@components/routes/UnprotectedRoutes';

function App() {
  const auth = useAuth();

  const [routeComponents, setRouteComponents] = useState<React.ReactElement>(
    localStorage.getItem(STORAGE_KEY.AUTHUSER) != null ? (
      <ProtectedRoutes />
    ) : (
      <UnprotectedRoutes />
    )
  );

  useLayoutEffect(() => {
    setRouteComponents(
      auth.isAuthenticated ? <ProtectedRoutes /> : <UnprotectedRoutes />
    );
  }, [auth.isAuthenticated]);

  return (
    <div className='min-h-screen'>
      {routeComponents}
    </div>
  )
}

export default App
