import { useReducer, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import api from '../../service/service';

import './Login.css';

type TUser = {
    email: string;
    password: string;
};

function Login() {
    const [user, dispatchUser] = useReducer(
        (state: TUser, action: { email?: string; password?: string }) => {
            return { ...state, ...action };
        },
        {
            email: '',
            password: '',
        },
    );
    const [errors, setErrors] = useState<Array<string>>([]);
    const { storeToken, authenticateUser } = useContext(AuthContext);

    async function handleLoginSubmit(event: React.FormEvent) {
        event.preventDefault();

        const newErrors = [];
        if (user.email.length === 0) {
            newErrors.push('Please enter your email address!');
        }
        if (user.password.length === 0) {
            newErrors.push('Please enter your password!');
        }
        if (newErrors.length > 0) {
            setErrors(newErrors);
            console.log('errors', newErrors);
            return;
        }

        try {
            // call api login and get token from the response
            const response = await api.login(user);
            const token: string = response.data.authToken;

            // set token
            storeToken(token);

            // authenticate user
            await authenticateUser();
        } catch (error) {
            console.error('[LOGIN]', error);
            setErrors(['Error while trying to login, check console']);
        }
    }

    return (
        <section className="Login">
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(event) =>
                            dispatchUser({ email: event.target.value })
                        }
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(event) =>
                            dispatchUser({ password: event.target.value })
                        }
                        required
                    />
                    <input type="submit" value="Login" />
                </form>
                <Link to="/signup">
                    You don't have an account? Sign up for free
                </Link>
            </div>
        </section>
    );
}

export default Login;
