import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const MultiStepSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: '',
        gender: '',

        primaryConcern: '',
        previousTherapy: '',
        stressLevel: '',
        sleepQuality: '',

        occupation: '',
        goalFromTherapy: '',
        availabilityPreference: '',
        communicationStyle: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        switch (currentStep) {
            case 1:
                if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
                if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
                if (!formData.email.trim()) newErrors.email = 'Email is required';
                if (!formData.password.trim()) newErrors.password = 'Password is required';
                if (!formData.age) newErrors.age = 'Age is required';
                if (!formData.gender) newErrors.gender = 'Gender is required';
                break;

            case 2:
                if (!formData.primaryConcern) newErrors.primaryConcern = 'Primary Concern is required';
                if (!formData.previousTherapy) newErrors.previousTherapy = 'Therapy Experience is required';
                if (!formData.stressLevel) newErrors.stressLevel = 'Stress Level is required';
                if (!formData.sleepQuality) newErrors.sleepQuality = 'Sleep Quality is required';
                break;

            case 3:
                if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
                if (!formData.goalFromTherapy.trim()) newErrors.goalFromTherapy = 'Goal from Therapy is required';
                if (!formData.availabilityPreference) newErrors.availabilityPreference = 'Availability Preference is required';
                if (!formData.communicationStyle) newErrors.communicationStyle = 'Communication Style is required';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateStep(step)) {
            setIsLoading(true);
            try {
                // Prepare the data in the exact format specified
                const registrationData = {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    age: parseInt(formData.age),
                    gender: formData.gender,
                    primaryConcern: formData.primaryConcern,
                    previousTherapy: formData.previousTherapy,
                    stressLevel: formData.stressLevel,
                    sleepQuality: formData.sleepQuality,
                    occupation: formData.occupation,
                    goalFromTherapy: formData.goalFromTherapy,
                    availabilityPreference: formData.availabilityPreference,
                    communicationStyle: formData.communicationStyle
                };

                const response = await axios.post(
                    'https://wevolvebackend.onrender.com/api/register/user',
                    registrationData
                );

                // Success notification
                toast.success('Registration Successful! Redirecting...', {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Navigate to login page
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } catch (error) {
                // Error handling
                const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
                toast.error(errorMsg, {
                    position: "top-right",
                    autoClose: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-emerald-700">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    required
                                    value={formData.age}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    required
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-Binary</option>
                                    <option value="prefer-not-to-say">Prefer Not to Say</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-emerald-700">Mental Health Profile</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Primary Mental Health Concern</label>
                            <select
                                name="primaryConcern"
                                required
                                value={formData.primaryConcern}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.primaryConcern ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select Primary Concern</option>
                                <option value="anxiety">Anxiety</option>
                                <option value="depression">Depression</option>
                                <option value="stress">Stress Management</option>
                                <option value="relationships">Relationship Issues</option>
                                <option value="trauma">Trauma</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.primaryConcern && <p className="text-red-500 text-xs mt-1">{errors.primaryConcern}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Previous Therapy Experience</label>
                            <select
                                name="previousTherapy"
                                required
                                value={formData.previousTherapy}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.previousTherapy ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="">Select Experience</option>
                                <option value="never">Never Been to Therapy</option>
                                <option value="current">Currently in Therapy</option>
                                <option value="past">Past Therapy Experience</option>
                            </select>
                            {errors.previousTherapy && <p className="text-red-500 text-xs mt-1">{errors.previousTherapy}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stress Level</label>
                                <select
                                    name="stressLevel"
                                    required
                                    value={formData.stressLevel}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.stressLevel ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Level</option>
                                    <option value="low">Low</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="high">High</option>
                                    <option value="severe">Severe</option>
                                </select>
                                {errors.stressLevel && <p className="text-red-500 text-xs mt-1">{errors.stressLevel}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sleep Quality</label>
                                <select
                                    name="sleepQuality"
                                    required
                                    value={formData.sleepQuality}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.sleepQuality ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Quality</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="poor">Poor</option>
                                    <option value="very-poor">Very Poor</option>
                                </select>
                                {errors.sleepQuality && <p className="text-red-500 text-xs mt-1">{errors.sleepQuality}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-emerald-700">Additional Context</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Occupation</label>
                            <input
                                type="text"
                                name="occupation"
                                required
                                value={formData.occupation}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.occupation ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Goal from Therapy</label>
                            <textarea
                                name="goalFromTherapy"
                                required
                                value={formData.goalFromTherapy}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.goalFromTherapy ? 'border-red-500' : 'border-gray-300'}`}
                                rows="3"
                            />
                            {errors.goalFromTherapy && <p className="text-red-500 text-xs mt-1">{errors.goalFromTherapy}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Availability Preference</label>
                                <select
                                    name="availabilityPreference"
                                    required
                                    value={formData.availabilityPreference}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.availabilityPreference ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Preference</option>
                                    <option value="weekdays">Weekdays</option>
                                    <option value="weekends">Weekends</option>
                                    <option value="evenings">Evenings</option>
                                    <option value="mornings">Mornings</option>
                                </select>
                                {errors.availabilityPreference && <p className="text-red-500 text-xs mt-1">{errors.availabilityPreference}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Communication Style</label>
                                <select
                                    name="communicationStyle"
                                    required
                                    value={formData.communicationStyle}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 ${errors.communicationStyle ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Style</option>
                                    <option value="direct">Direct</option>
                                    <option value="compassionate">Compassionate</option>
                                    <option value="analytical">Analytical</option>
                                    <option value="collaborative">Collaborative</option>
                                </select>
                                {errors.communicationStyle && <p className="text-red-500 text-xs mt-1">{errors.communicationStyle}</p>}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Submitting...' : 'Complete Signup'}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-emerald-800">Your Wellness Journey</h1>
                    <div className="flex justify-center mt-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className={`w-10 h-1.5 mx-1 rounded-full ${step >= item ? 'bg-emerald-500' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

                <form>
                    {renderStep()}
                </form>
            </div>
        </div>
    );
};

export default MultiStepSignup;