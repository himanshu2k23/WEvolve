import React, { useState } from 'react';

const testimonials = [
    {
        text: "Dr. Riya helped me overcome my anxiety through practical coping strategies. Her expertise in stress management techniques has made a significant difference in my daily life. The sessions were always comfortable and productive.",
        name: "Dr. Riya Verma",
        position: "Therapist with 5 years of experience",
        image: "femalePfp.jpg"
    },
    {
        text: "Working with Dr. Gupta has been transformative for managing my bipolar disorder. His extensive knowledge and patient-centered approach helped me understand and manage my condition better. The multilingual support made communication effortless.",
        name: "Dr. Sanjay Gupta",
        position: "Psychiatrist with 7 years of experience",
        image: "malePfp.jpg"
    },
    {
        text: "Ms. Singh's approach to grief counseling is both professional and deeply empathetic. She helped me navigate through a difficult loss with understanding and practical coping strategies. Her expertise in addressing loneliness was particularly helpful.",
        name: "Kavita Singh",
        position: "Psychologist with 6 years of experience",
        image: "femalePfp.jpg"
    },
    {
        text: "Dr. Rao's expertise in trauma therapy has been invaluable. Her 9 years of experience really shows in how she handles complex cases. She created a safe space for healing and growth during our sessions.",
        name: "Dr. Anjali Rao",
        position: "Psychiatrist with 9 years of experience",
        image: "femalePfp.jpg"
    },
    {
        text: "Vivek's guidance in overcoming overthinking patterns was exceptional. His practical approach to self-improvement and deep understanding of cognitive patterns helped me develop better mental habits.",
        name: "Vivek Menon",
        position: "Psychologist with 7 years of experience",
        image: "malePfp.jpg"
    },
    {
        text: "Ms. Kapoor's expertise in handling academic concerns and life transitions was exactly what I needed. Her supportive approach and practical strategies helped me navigate through challenging times in my career.",
        name: "Shreya Kapoor",
        position: "Therapist with 6 years of experience",
        image: "femalePfp.jpg"
    },
    {
        text: "Dr. Joshi's decade of experience in trauma-related disorders is evident in his treatment approach. His expertise in adult autism has been particularly helpful for our family. The sessions were always structured and productive.",
        name: "Dr. Nitin Joshi",
        position: "Psychiatrist with 10 years of experience",
        image: "malePfp.jpg"
    },
    {
        text: "As a child specialist, Ms. Desai has been phenomenal in helping my daughter overcome her eating disorder. Her gentle approach and expert guidance made the therapy process comfortable for both parent and child.",
        name: "Anita Desai",
        position: "Psychologist with 8 years of experience",
        image: "femalePfp.jpg"
    },
    {
        text: "Dr. Malhotra's communication skills workshop transformed our team dynamics. His stress management techniques are practical and effective. The multilingual sessions made it accessible for our diverse team.",
        name: "Dr. Rajiv Malhotra",
        position: "Therapist with 7 years of experience",
        image: "malePfp.jpg"
    }
];

const IndexReviews = () => {
    const [startIndex, setStartIndex] = useState(0);

    const showNextTestimonials = () => {
        setStartIndex((prevIndex) =>
            (prevIndex + 3) >= testimonials.length ? 0 : prevIndex + 3
        );
    };

    const showPrevTestimonials = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, testimonials.length - 3) : Math.max(0, prevIndex - 3)
        );
    };

    const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3);

    return (
        <section className="bg-white">
            <div className="container px-6 py-10 mx-auto">
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl">
                            What our clients are saying
                        </h1>

                        <div className="flex mx-auto mt-6">
                            <span className="inline-block w-40 h-1 bg-lime-500 rounded-full"></span>
                            <span className="inline-block w-3 h-1 mx-1 bg-lime-500 rounded-full"></span>
                            <span className="inline-block w-1 h-1 bg-lime-500 rounded-full"></span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={showPrevTestimonials}
                            title="Previous reviews"
                            className="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full hover:bg-lime-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={showNextTestimonials}
                            title="Next reviews"
                            className="p-2 text-gray-800 transition-colors duration-300 border rounded-full hover:bg-lime-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-3">
                    {visibleTestimonials.map((testimonial, index) => (
                        <div
                            key={startIndex + index}
                            className={`p-8 border rounded-lg ${index === 1 ? 'bg-emerald-500 border-transparent' : ''}`}
                        >
                            <div>
                                <p className={`leading-loose ${index === 1 ? 'text-white' : 'text-gray-500'}`}>
                                    {testimonial.text}
                                </p>
                                <p className={`mt-2 text-sm italic ${index === 1 ? 'text-emerald-100' : 'text-gray-400'}`}>
                                    - review by an anonymous user
                                </p>
                            </div>

                            <div className="flex items-center mt-8 -mx-2">
                                <img
                                    className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                />
                                <div className="mx-2">
                                    <h1 className={`font-semibold ${index === 1 ? 'text-white' : 'text-gray-800'}`}>
                                        {testimonial.name}
                                    </h1>
                                    <span className={`text-sm ${index === 1 ? 'text-emerald-200' : 'text-gray-500'}`}>
                                        {testimonial.position}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                </section>
            </div>
        </section>
    );
};

export default IndexReviews;