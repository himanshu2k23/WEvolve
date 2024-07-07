import React from 'react';

const platformData = [
    {
        id: 1,
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
        ),
        title: 'Certified Specialists',
        description: `Connect with certified specialists in mental health who offer personalized guidance and support tailored to your unique needs and goals. Our experts are here to help you navigate your mental health journey with compassion and expertise.`,
    },
    {
        id: 2,
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
            </svg>
        ),
        title: 'Tailored Matching',
        description: `Discover the perfect counselor or therapist through our advanced matching system, which considers your individual preferences and requirements. We ensure you find a professional who aligns with your specific needs, making your therapy experience as effective and comfortable as possible.`,
    },
    {
        id: 3,
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        title: 'Wellness Diary',
        description: `Track your mental health and holistic well-being with our comprehensive wellness diary. Monitor emotional and psychological health, and analyze sleep patterns to empower proactive steps towards better mental and physical health. Benefit from personalized insights and guidance for optimal well-being.`,
    },
];


const OurPlatform = () => {
    return (
        <section id='aboutUs' className="mt-10">
            <div className="container px-6 py-4 mx-auto">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                        Welcome to <span className=" text-green-500">WEvolve</span>, your trusted partner in mental health and well-being.
                    </h1>
                    <p className="text-lg text-center text-gray-500 mb-6">
                        At <span className=" text-green-500">WEvolve</span>, we believe that mental health is fundamental to a fulfilling life. Our mission is to offer comprehensive, accessible, and compassionate care to individuals striving to enhance their mental well-being.
                    </p>

                    <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-4">
                            Our Services
                        </h2>
                        <p className="text-lg text-center text-gray-500 mb-6">
                            We provide a diverse range of services tailored to support you on your journey to wellness. These include personalized online counseling and therapy sessions, as well as a responsive helpline for immediate support. Our dedicated team is here to actively listen, offer guidance, and provide the assistance you need.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-4">
                            Innovative Technology
                        </h2>
                        <p className="text-lg text-center text-gray-500 mb-6">
                            In addition to our counseling services, <span className=" text-green-500">WEvolve</span> offers innovative sleep tracking technology. Our advanced sleep trackers are designed to monitor and analyze your sleep patterns, empowering you to make informed adjustments that promote better mental and physical health.
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                            {platformData.map((item) => (
                                <div key={item.id} className="space-y-3">
                                    <span className="inline-block p-3 text-green-500 bg-green-100 rounded-full">
                                        {item.icon}
                                    </span>

                                    <h1 className="text-xl font-semibold text-gray-700 capitalize">
                                        {item.title}
                                    </h1>

                                    <p className="text-gray-500">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                            <br />
                    <p className="text-lg text-center text-gray-500 mb-6">
                        At <span className=" text-green-500">WEvolve</span>, we are committed to evolving alongside you, equipping you with the tools and support necessary to thrive. Take the first step towards a healthier, happier you by joining us today.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default OurPlatform;
