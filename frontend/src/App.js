import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Rooms from './components/Rooms/Rooms';
import HomePage from './components/HomePage/HomePage';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar';
import Logout from './components/Logout/Logout';
import Manager from './components/Manager/Manager';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { useUser } from './UserProvider';
import Account from './components/Account/Account';
import Reservations from './components/Reservations/Reservations';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';

function App() {
    const user = useUser();
    return (
        <div className="App">
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <Navbar />
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/About" element={<HomePage />} />
                                <Route path="/Rooms" element={<Rooms />} />
                                <Route path="/Contact" element={<Contact />} />
                                <Route
                                    path="/Login"
                                    element={
                                        <ProtectedRoute isAllowed={!user}>
                                            <Login />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/Signup"
                                    element={
                                        <ProtectedRoute isAllowed={!user}>
                                            <Signup />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/Logout" element={<Logout />} />
                                <Route
                                    path="/Reservations"
                                    element={
                                        <ProtectedRoute isAllowed={!!user}>
                                            <Reservations />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/Account"
                                    element={
                                        <ProtectedRoute isAllowed={!!user}>
                                            <Account />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/Manager"
                                    element={
                                        <ProtectedRoute isAllowed={!!user && user.roles === 'admin'} redirectPath="/">
                                            <Manager />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Box>
                    </Container>
                </React.Fragment>
            </SnackbarProvider>
        </div>
    );
}

export default App;
