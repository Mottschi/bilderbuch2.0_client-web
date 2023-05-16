import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import SignUp from './pages/SignUp/SignUp';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';

import './App.css';
import NonAuthenticatedOnly from './components/RouteProtection/NonAuthenticatedOnly';
import AuthenticatedOnly from './components/RouteProtection/AuthenticatedOnly';

function App() {
    return (
        <div>
            <Routes>
                <Route element={<NonAuthenticatedOnly />}>
                    <Route element={<Layout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                </Route>
                <Route element={<AuthenticatedOnly />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
