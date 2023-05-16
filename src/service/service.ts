import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// interface IBook {
//     owner?: string;
//     title?: string;
//     thumbnail?: string;
//     pages?: Array<{ text: string; picture: string }>;
// }

const api = axios.create({
    baseURL: BACKEND_URL,
    // validateStatus: (status) => {
    //     console.log('validating axios status', status);
    //     return true;
    // },
});

api.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    request.headers.Authorization = token ? `Bearer ${token}` : null;
    return request;
});

async function login(user: { email: string; password: string }) {
    return api.post('/auth/login', user);
}

async function user() {
    return api.get('/auth/me');
}

async function signup(user: {
    email: string;
    username: string;
    password: string;
}) {
    return api.post('/auth/register', user);
}

async function createBook(book: { title: string }) {
    try {
        const response = await api.post('/api/book', book);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response)
            throw Error(
                `[API] Axios Error when trying to create book: ${error.response.data.message}`,
            );
        else if (error instanceof Error) {
            throw Error(
                `[API] Unknown Error when trying to create book: ${error.message}`,
            );
        }
    }
}

async function getOneBook(bookId: string) {
    try {
        const response = await api.get(`/api/book/${bookId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response)
            throw Error(
                `[API] Axios Error when trying to retreive book data: ${error.response.data.message}`,
            );
        else if (error instanceof Error) {
            throw Error(
                `[API] Unknown Error when trying to retreive book data: ${error.message}`,
            );
        }
    }
}

async function getAllBooks() {
    try {
        const response = await api.get('/api/book');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response)
            throw Error(
                `[API] Axios Error when trying to retreive book data: ${error.response.data.message}`,
            );
        else if (error instanceof Error) {
            throw Error(
                `[API] Unknown Error when trying to retreive book data: ${error.message}`,
            );
        }
    }
}

async function deleteBook(bookId: string) {
    try {
        const response = await api.delete(`/api/book/${bookId}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response)
            throw Error(
                `[API] Axios Error when trying to delete book: ${error.response.data.message}`,
            );
        else if (error instanceof Error) {
            throw Error(
                `[API] Unknown Error when trying to delete book: ${error.message}`,
            );
        }
    }
}

async function updateBook(book: { id: string; title?: string }) {
    try {
        const response = await api.patch(`/api/book/${book.id}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response)
            throw Error(
                `[API] Axios Error when trying to retreive book data: ${error.response.data.message}`,
            );
        else if (error instanceof Error) {
            throw Error(
                `[API] Unknown Error when trying to retreive book data: ${error.message}`,
            );
        }
    }
}

export default {
    user,
    login,
    createBook,
    deleteBook,
    getAllBooks,
    getOneBook,
    updateBook,
    signup,
};
