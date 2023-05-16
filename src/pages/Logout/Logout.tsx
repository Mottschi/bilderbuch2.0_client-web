import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

function Logout(): JSX.Element {
    const { removeToken, authenticateUser } = useContext(AuthContext);
    useEffect(() => {
        removeToken();
        authenticateUser();
    }, [removeToken, authenticateUser]);

    return <Navigate to="/login" />;
}

export default Logout;
