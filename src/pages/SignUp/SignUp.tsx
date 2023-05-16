import React, { useState, useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../service/service';

import './Signup.css';

type TUser = {
    username: string;
    password: string;
    confirmation: string;
    email: string;
};

type TUserPart = {
    username?: string;
    password?: string;
    confirmation?: string;
    email?: string;
};

function userReducer(state: TUser, action: TUserPart) {
    return { ...state, ...action };
}

function Signup() {
    const [displayForm, setDisplayForm] = useState(true);
    const [errors, setErrors] = useState({});
    const [user, dispatchUser] = useReducer(userReducer, {
        username: '',
        password: '',
        confirmation: '',
        email: '',
    });

    console.log(errors);

    async function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        const newErrors = [];
        if (user.username.length === 0) {
            newErrors.push('Please enter a username!');
        }
        if (user.email.length === 0) {
            newErrors.push('Please enter an email address!');
        }
        if (user.password.length === 0) {
            newErrors.push('Please enter a password!');
        }
        if (user.confirmation.length === 0) {
            newErrors.push('Please repeat your password!');
        }
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const newUser = await api.signup(user);
            console.log(newUser);
        } catch (error: any) {
            console.error('[SIGNUP] error', error);
            if (error?.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else if (error.message !== undefined) {
                setErrors([error.message]);
            } else {
                setErrors(['Unknown Error when trying to regsiter']);
            }
        }
    }

    return (
        <section className="SignUp">
            <h2>Signup Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={(event) =>
                            dispatchUser({ username: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(event) =>
                            dispatchUser({ email: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(event) =>
                            dispatchUser({ password: event.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password_confirmatiom">
                        Password (repeat):
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={user.confirmation}
                        onChange={(event) =>
                            dispatchUser({ confirmation: event.target.value })
                        }
                    />
                </div>
                <div>
                    <input type="submit" value="Create Account" />
                </div>
                <p>
                    <Link to="/login">
                        You already have an account? Login here!
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Signup;
