import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import './Layout.css';

function Layout() {
    const { isLoading, user } = useContext(AuthContext);

    if (isLoading)
        return (
            <>
                <header>
                    <nav></nav>
                </header>
                <main>
                    <Outlet />
                </main>
            </>
        );

    return (
        <>
            <header>
                <nav>
                    <NavLink to="/" className="logo-nav">
                        Home
                    </NavLink>
                    {user && <NavLink to="/logout">Logout</NavLink>}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
