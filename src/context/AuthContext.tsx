import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../service/service';

type TUser = {
    username: string;
    id: string;
    email: string;
};

export interface IAuthContext {
    user: TUser | null;
    token: string | null;
    isLoading: boolean;
    storeToken: (token: string) => void;
    removeToken: () => void;
    authenticateUser: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

// For the default value, the functions will be initialized with 'do nothing' functions, as they are required part of the interface but can only be
// setup inside the component, when the actual dispatch functions are available
export const AuthContext = createContext<IAuthContext>({
    user: null,
    token: null,
    isLoading: true,
    removeToken,
    storeToken: (token: string) => {
        token;
        return;
    },
    authenticateUser: async () => {
        return;
    },
    setUser: () => {
        return;
    },
});

type Props = {
    children: JSX.Element;
};

function retrieveToken(): string | null {
    return localStorage.getItem('token');
}

function removeToken(): void {
    localStorage.removeItem('token');
}

function AuthContextWrapper(props: Props) {
    const [user, setUser] = useState<TUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const storeToken = useCallback(
        (token: string) => {
            localStorage.setItem('token', token);
            setToken(token);
        },
        [setToken],
    );

    async function authenticateUser(): Promise<void> {
        const currentToken = retrieveToken();

        setToken(currentToken);

        // if there is no current token set, no need to try to authenticate
        if (!currentToken) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.user();

            if (response.status === 200) {
                setUser(response.data);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                storeToken,
                removeToken,
                user,
                setUser,
                authenticateUser,
                isLoading,
                token,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextWrapper;
