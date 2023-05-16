import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import AuthContextWrapper from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextWrapper>
                <App />
            </AuthContextWrapper>
        </BrowserRouter>
    </React.StrictMode>,
);
