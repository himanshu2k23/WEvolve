import React, { useState, useEffect } from 'react'
import FreeSessionHero from './IndexComponents/FreeSessionHero'
import ExpertSelection from './IndexComponents/ExpertSelection'
import ExpertListings from './IndexComponents/ExpertListing';
import IndexReviews from './IndexComponents/IndexReviews.jsx';
import axios from 'axios'; // Make sure to install axios: npm install axios

export default function Index() {
    const [selectedExpert, setSelectedExpert] = useState('therapist');
    const [experts, setExperts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://wevolvebackend.onrender.com/api/doctors');
                setExperts(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchExperts();
    }, []);

    // Loading and error states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <>
            <FreeSessionHero />
            <ExpertSelection
                selectedExpert={selectedExpert}
                setSelectedExpert={setSelectedExpert}
            />
            <ExpertListings
                experts={experts}
                selectedExpert={selectedExpert}
            />
            <IndexReviews />
        </>
    )
}