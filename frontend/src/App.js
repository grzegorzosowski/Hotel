import './App.css';
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
import { Booking } from './components/Booking/Booking';
import Account from './components/Account/Account';

function App() {
    const user = useUser();
    return (
        <div className="App">
            <Navbar />

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
                <Route path="/Booking" element={<Booking />} />
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
        </div>
    );
}

export default App;
