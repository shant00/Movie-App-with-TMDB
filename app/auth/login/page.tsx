"use client";
import ThemeToggle from '@/components/ThemeToggle';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuthContext();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            login(data.token);
            router.push('/');
        } else {
            alert('Login failed');
        }
    };

    return (<>
        <div className="flex justify-end">
            <ThemeToggle />
        </div>


        <div className="flex min-h-screen items-center justify-center ">

            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <div className=" justify-between items-center">
                    <h1 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">Login</h1>
                    <p className="mb-2 dark: text-white">To login, use the following credentials:</p>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded-md border border-gray-300 dark:border-gray-600 ">
                        <p className="font-mono text-sm">
                            <strong className='dark:text-gray-200'>Username:</strong> <span className="text-gray-900 dark:text-gray-100">admin@admin.com</span>
                        </p>
                        <p className="font-mono text-sm">
                            <strong className='dark:text-gray-200'>Password:</strong> <span className="text-gray-900 dark:text-gray-100">Admin@123</span>
                        </p>
                    </div>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    </>
    );
};

export default LoginPage;