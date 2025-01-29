import React, { useState } from 'react';

const expertTypes = [
    {
        id: 'therapist',
        icon: 'bi-chat-dots',
        label: 'Therapist',
        description: 'A therapist provides support and guidance to help individuals navigate emotional and mental health challenges. They focus on improving coping strategies and fostering personal growth to enhance overall well-being.',
    },
    {
        id: 'psychiatrist',
        icon: 'bi-clipboard2-pulse',
        label: 'Psychiatrist',
        description: 'A psychiatrist is a licensed medical doctor specializing in mental health. They diagnose, treat, and manage psychiatric disorders using a combination of therapy, medication, and other evidence-based approaches.',
    },
    {
        id: 'psychologist',
        icon: 'bi-people',
        label: 'Psychologists',
        description: 'Psychologists specialize in studying human behavior and emotions. They help individuals improve mental health through assessments, counseling, and tailored therapeutic techniques to address specific challenges.',
    },
];

const ExpertSelection = (props) => {
    const selectedExpert = props.selectedExpert;
    const setSelectedExpert = props.setSelectedExpert;
    const [hoveredExpert, setHoveredExpert] = useState(null);

    return (
        <div className="w-full bg-emerald-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-3xl text-center">
                <h2 className="text-lg md:text-xl font-medium text-emerald-900 mb-8">
                    Find an expert who understands your needs.
                </h2>
                <div className="flex items-center justify-center gap-4 relative">
                    {expertTypes.map((expert) => (
                        <div
                            key={expert.id}
                            className="group relative w-[200px]"
                            onMouseEnter={() => setHoveredExpert(expert.id)}
                            onMouseLeave={() => setHoveredExpert(null)}
                        >
                            <button
                                onClick={() => setSelectedExpert(expert.id)}
                                className={`
                                    w-full flex items-center justify-center gap-2 px-6 py-3 
                                    ${selectedExpert === expert.id
                                        ? 'bg-emerald-600 text-white shadow-md'
                                        : 'bg-white border-2 border-emerald-400 text-emerald-700'} 
                                    text-sm md:text-base font-medium rounded-full transition duration-300
                                    hover:bg-slate-100 hover:text-white hover:scale-105
                                `}
                            >
                                <i className={`bi ${expert.icon} text-lg`}></i> {expert.label}
                            </button>

                            {/* Enhanced Hover Card */}
                            <div
                                className={`
                                    absolute left-1/2 -translate-x-1/2 mt-4 z-10 
                                    transition-all duration-300 ease-in-out
                                    ${hoveredExpert === expert.id
                                        ? 'opacity-100 translate-y-0 visible'
                                        : 'opacity-0 -translate-y-4 invisible'}
                                    bg-white border-2 border-emerald-500 
                                    text-emerald-800 text-sm md:text-base 
                                    px-6 py-4 rounded-lg shadow-xl 
                                    w-64 min-h-[120px]
                                `}
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <i className={`bi ${expert.icon} text-2xl text-emerald-600 mr-3`}></i>
                                    <h3 className="text-lg font-semibold text-emerald-900">{expert.label}</h3>
                                </div>
                                <p className="text-emerald-700">{expert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpertSelection;