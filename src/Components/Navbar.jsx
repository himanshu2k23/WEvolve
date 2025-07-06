import React, { useState } from 'react';
import { scrollToElement } from '../Scroll';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, isLoggedIn, logout } = useAuth();

    const navigateThenScroll = async (targetId) => {
        navigate('/');
        const checkElement = () => new Promise((resolve) => {
            const interval = setInterval(() => {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    clearInterval(interval);
                    resolve(targetElement);
                }
            }, 100);
        });
        const targetElement = await checkElement();
        if (targetElement) {
            scrollToElement(targetId);
        }
        setIsOpen(false)
    }

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg">
                <div className="container px-4 py-3 mx-auto ">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between">
                            <a href="/" className="flex items-center space-x-3">
                                <img className="w-auto h-9 sm:h-10 " src="/we.jpg" alt="Logo" />
                            </a>

                            {/* Mobile menu button */}
                            <div className="flex lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300 ease-in-out"
                                    aria-label="toggle menu"
                                >
                                    {!isOpen ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div className={`${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} 
                            absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out 
                            bg-white shadow-lg rounded-b-lg lg:shadow-none
                            lg:border-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent 
                            lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}>
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 lg:space-x-4">
                                {['About Us', 'Get Started', 'Contact Us', 'Experts'].map((item, index) => (
                                    <button
                                        key={item}
                                        className="px-4 py-2 text-gray-700 font-medium relative 
                                        after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                                        hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300
                                        hover:text-emerald-600 transition-colors"
                                        onClick={() =>
                                            item === 'Experts'
                                                ? navigate('/index')
                                                : navigateThenScroll(item.toLowerCase().replace(' ', ''))
                                        }
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col lg:flex-row items-center justify-center mt-4 lg:mt-0 lg:ml-8 space-y-3 lg:space-y-0 lg:space-x-4">
                                {isLoggedIn ? (
                                    <div className="relative group">
                                        <button
                                            type="button"
                                            className="flex items-center space-x-2 focus:outline-none 
                                            bg-emerald-50 hover:bg-emerald-100 rounded-full px-3 py-1.5 
                                            transition-all duration-300 ease-in-out"
                                            aria-label="toggle profile dropdown"
                                        >
                                            <div className="w-9 h-9 overflow-hidden border-2 border-emerald-500 rounded-full">
                                                <img
                                                    src={
                                                        user?.image ||
                                                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                                    }
                                                    className="object-cover w-full h-full"
                                                    alt="avatar"
                                                />
                                            </div>
                                            <h3 className="text-gray-700 text-sm font-medium">{user?.name || 'Guest'}</h3>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-emerald-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 
                                            transition-all duration-300 ease-in-out right-0 mt-2 w-52 
                                            bg-white rounded-lg shadow-lg border border-emerald-100 z-20 
                                            overflow-hidden">
                                            <button
                                                onClick={() => navigate('/bookings')}
                                                className="block px-4 py-2.5 text-gray-700 hover:bg-emerald-50 
                                                hover:text-emerald-600 w-full text-left transition-colors 
                                                duration-200 flex items-center space-x-3"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                                <span>My Bookings</span>
                                            </button>
                                            <div className="border-t border-emerald-100"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2.5 text-red-600 hover:bg-red-50 
                                                hover:text-red-700 w-full text-left transition-colors 
                                                duration-200 flex items-center space-x-3"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full lg:w-auto px-6 py-2 text-emerald-600 font-medium 
                                            border-2 border-emerald-500 rounded-lg hover:bg-emerald-50 
                                            transition-colors duration-300 flex items-center justify-center space-x-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Login</span>
                                        </button>
                                        <button
                                            onClick={() => navigate('/signup')}
                                            className="w-full lg:w-auto px-6 py-2 text-white font-medium 
                                            bg-lime-500 rounded-lg hover:bg-lime-600 
                                            transition-colors duration-300 flex items-center justify-center space-x-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                            <span>Sign Up</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='h-[67px]'></div>
        </>
    );
};

export default Navbar;