import React, { FC, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar: FC = () => {
    const ctx = useContext(AuthContext);
    return (
        <nav>
            <div className="row"></div>
        </nav>
    );
};

export default Navbar;
