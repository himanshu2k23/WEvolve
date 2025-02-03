import React, { useState } from 'react'
import FreeSessionHero from './IndexComponents/FreeSessionHero'
import ExpertSelection from './IndexComponents/ExpertSelection'
import ExpertListings from './IndexComponents/ExpertListing';
import experts from '../dummyData.js'
import IndexReviews from './IndexComponents/IndexReviews.jsx';

export default function Index() {
    const [selectedExpert, setSelectedExpert] = useState('therapist');
    return (
        <>
            <FreeSessionHero />
            <ExpertSelection selectedExpert={selectedExpert} setSelectedExpert={setSelectedExpert} />
            <ExpertListings experts={experts} selectedExpert={selectedExpert} />
            <IndexReviews />
        </>
    )
}
