import React from 'react';

// Define steps as JSON array of objects
const steps = [
  {
    name: 'Sign Up',
    description: 'Create an account on our website by providing basic information. This step allows you to access our services and personalize your treatment journey. You will need to provide your name, email address, and create a secure password to get started.',
  },
  {
    name: 'Enter Your Details',
    description: 'Fill out a brief form with your personal information and health history. This information helps us understand your specific needs and tailor our services accordingly. We prioritize your privacy and ensure that your information is securely stored and confidential.',
  },
  {
    name: 'Contact Us',
    description: 'Reach out to our team through our helpline or website to get started. Our friendly staff is available to assist you with any questions or concerns you may have about our services or the process of getting started. We aim to provide prompt and compassionate support to help you begin your journey to well-being.',
  },
  {
    name: 'Initial Assessment',
    description: 'Schedule an initial assessment session with one of our counselors. During this session, you will discuss your goals, concerns, and any challenges you may be facing. This assessment helps us understand your unique situation and develop a personalized treatment plan that meets your specific needs.',
  },
  {
    name: 'Personalized Plan',
    description: 'Receive a personalized treatment plan based on your assessment. Our experienced counselors will collaborate with you to create a comprehensive plan that includes therapy sessions, counseling techniques, and additional resources tailored to support your mental health journey.',
  },
  {
    name: 'Begin Counseling',
    description: 'Start your counseling or therapy sessions tailored to your needs. Our compassionate counselors provide a supportive environment where you can explore your thoughts and emotions, develop coping strategies, and work towards achieving your mental health goals.',
  },
  {
    name: 'Track Progress',
    description: 'Utilize our advanced sleep trackers and regular assessments to monitor your progress. Our innovative technology allows you to track your sleep patterns and identify trends that may affect your mental and physical well-being. This data helps us make informed adjustments to your treatment plan to ensure continued progress.',
  },
  {
    name: 'Continued Support',
    description: 'Benefit from ongoing support and adjustments to your treatment plan as needed. Mental health is a journey, and we are committed to supporting you every step of the way. Whether you need additional counseling sessions, access to resources, or guidance in managing challenges, our team is here to help you thrive.',
  },
];

const GettingStarted = () => (
  <div id='gettingStarted' className="max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
      Get <span className=" text-green-500">Started</span> Today!
    </h1>
    <p className="text-lg text-center text-gray-500 mb-6">

    </p>
    <ol className="relative text-gray-500 border-s border-gray-200">
      {steps.map((step, index) => (
        <li key={index} className="mb-10 ms-6">
          <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white bg-slate-200`}>
            {index + 1}
          </span>
          <h3 className="text-lg lg:text-xl font-bold leading-tight text-emerald-500">{step.name}</h3>
          <p className="text-sm">{step.description}</p>
        </li>
      ))}
    </ol>




  </div>
);

export default GettingStarted;

