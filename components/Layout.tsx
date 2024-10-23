
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <header>
                <h1>Movie App</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
