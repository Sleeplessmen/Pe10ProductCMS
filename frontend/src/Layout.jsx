import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

const Layout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <header className="flex justify-end p-4 border-b dark:border-gray-700">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                    {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
                </button>
            </header>
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
