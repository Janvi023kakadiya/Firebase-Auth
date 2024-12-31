import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser  } from './features/auth/authSlice';
import { auth } from './service/firebase';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NoteList from './components/notes/NoteList';
import AddNote from './components/notes/AddNote';
import ProtectedRoute from './components/auth/ProtectRoute';
import'./styles/main.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser ({ uid: user.uid, email: user.email }));
      } else {
        dispatch(setUser (null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleErrorClose = () => {
    setError(null);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            backgroundColor: '#f5f5f5',
            minHeight: '100vh'
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <>
                    <AddNote />
                    <NoteList />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={handleErrorClose}
        >
          <Alert 
            onClose={handleErrorClose} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Router>
  );
};

export default App;
