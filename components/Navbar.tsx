
"use client";
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthContext();
    const router = useRouter();

    const handleLogOut = async () => {
        logout();
        router.push('/auth/login');
        await fetch('/api/auth', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded">
                        Home
                    </Link>
                    <Link href="/watchlist" className="hover:bg-blue-700 px-3 py-2 rounded">
                        WatchList
                    </Link>
                </div>

                <div>


                    {!isAuthenticated ? (
                        <Link href="/auth/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleLogOut}
                            className="hover:bg-blue-700 px-3 py-2 rounded">
                            Logout
                        </button>
                    )}
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;