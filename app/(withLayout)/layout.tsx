"use client";
import { ReactNode } from 'react';
import Navbar from '../../components/Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;
