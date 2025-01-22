import React, { useState } from 'react';
import { scrollToElement } from '../Scroll';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();


    return (
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-md">
            <div className="container px-4 py-3 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="/" className="flex items-center space-x-2">
                            <img className="w-auto h-8 sm:h-9" src="/we.jpg" alt="Logo" />
                        </a>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
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

                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div className={`${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white border-b lg:border-none lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}>
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8 lg:space-x-4">
                            <button className="px-4 py-2 text-gray-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300"
                                onClick={() => scrollToElement('aboutUs')}
                            >About Us</button>
                            <button className="px-4 py-2 text-gray-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300"
                                onClick={() => scrollToElement('gettingStarted')}
                            >Get Started</button>
                            <button className="px-4 py-2 text-gray-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-500 after:transition-all after:duration-300"
                                onClick={() => scrollToElement('contactUs')}
                            >Contact Us</button>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0 lg:ml-8 space-y-2 lg:space-y-0 lg:space-x-3">
                            {
                                login ?
                                    <>
                                        <button className="hidden lg:block text-gray-600 hover:text-emerald-600 transition-colors duration-200" aria-label="show notifications">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                            <div className="w-8 h-8 overflow-hidden border-2 border-emerald-500 rounded-full">
                                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" className="object-cover w-full h-full" alt="avatar" />
                                            </div>
                                            <h3 className="mx-2 text-gray-700 lg:hidden">Jane Doe</h3>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full lg:w-auto px-6 py-2 text-emerald-600 font-medium border-2 border-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => navigate('/signup')}
                                            className="w-full lg:w-auto px-6 py-2 text-white font-medium bg-lime-500 rounded-lg hover:bg-lime-600 transition-colors duration-200"
                                        >
                                            Sign Up
                                        </button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;