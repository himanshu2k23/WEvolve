import React from 'react'
import { scrollToElement } from '../../Scroll'
import { useNavigate } from 'react-router-dom';


export default function Banner() {
    const navigate = useNavigate();

    const redirectToIndex = () => {
        navigate('/index');
    };


    return (
        < section
            className="relative bg-[url(/banner.avif)] bg-cover bg-center bg-no-repeat"
        >
            <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 sm:bg-gradient-to-r "></div>


            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="flex flex-col items-center max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Evolving Minds,

                        <strong className="block font-extrabold text-emerald-500"> Empowering Lives</strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        WEvolve offers compassionate online counseling, therapy, and helpline services to support your mental well-being. Together, we help you grow and thrive.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <button
                            className="block w-full rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring sm:w-auto"
                            onClick={redirectToIndex}
                        >
                            Check-out Our Doctors
                        </button>

                        <button

                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-emerald-600 shadow hover:text-emerald-700 focus:outline-none focus:ring  sm:w-auto"
                            onClick={() => scrollToElement('aboutUs')}
                        >
                            About Us
                        </button>
                    </div>
                </div>
            </div>
        </section >
    )
}
