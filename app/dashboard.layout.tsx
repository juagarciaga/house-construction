import Link from "next/link";
import { ReactNode, useState } from "react";
import { eventsTranslate } from "./translate.dic";

interface DashboardLayoutProps {
    children: ReactNode;
    title?: string; // Optional title prop
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="mr-4 p-2 focus:outline-none lg:hidden"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                    {/* Current Page Info */}
                    <h1 className="text-xl font-semibold">{title}</h1>
                </div>
                {/* User Info */}
                <div className="flex items-center">
                    <span className="mr-2">Ju e Seba</span>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex ">
                {/* Side Navigation Menu */}
                <aside
                    className={`bg-gray-800 text-white w-64 space-y-2 p-4 transform transition-transform duration-200 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        } lg:translate-x-0 lg:static fixed h-full  min-h-screen z-5`}
                >
                    <nav>
                        <ul>
                            <li className="p-2 hover:bg-gray-700 hidden">
                                <Link href="/family" >
                                    Family Expenses
                                </Link>
                            </li>
                            <li className="p-2 hover:bg-gray-700">
                                <Link href="/construction" >
                                    {eventsTranslate['pt']['weeks']}
                                </Link>
                            </li>
                            <li className="p-2 hover:bg-gray-700">
                                <Link href="/metrics" >
                                    {eventsTranslate['pt']['metrics']}
                                </Link>
                            </li>
                            {/* <li className="p-2 hover:bg-gray-700">Home</li>
                            <li className="p-2 hover:bg-gray-700">Profile</li>
                            <li className="p-2 hover:bg-gray-700">Settings</li> */}
                            <li className="p-2 hover:bg-gray-700">Logout</li>
                        </ul>
                    </nav>
                </aside>

                {/* Page Content */}
                <main className="flex-1 p-4">{children}</main>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default DashboardLayout;
