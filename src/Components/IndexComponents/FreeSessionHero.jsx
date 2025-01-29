import React from 'react';
import { useNavigate } from 'react-router-dom';

const FreeSessionHero = () => {
    return (
        <div className="w-full bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl text-center">
                <p className="text-xl md:text-2xl font-bold mb-3 text-emerald-800">
                    Your Mental Well-being Matters to Us
                </p>
                <p className="text-base md:text-lg text-zinc-700 mb-5 ">
                    Begin your journey to better mental health with us. Take the first step toward a happier, healthier you by starting with a free counseling session. We're here to guide you every step of the way with care and understanding.
                </p>
                <button className="bg-emerald-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition duration-200">
                    Click Here to Get Started
                </button>
            </div>
        </div>

    );
};

export default FreeSessionHero;