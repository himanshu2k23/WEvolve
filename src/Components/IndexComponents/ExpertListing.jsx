import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpertListing = ({ experts, selectedExpert }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    gender: [],
    languages: [],
    expertise: [],
    category: selectedExpert || ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // First filter experts by category
  const categoryFilteredExperts = experts.filter(expert =>
    !filters.category || expert.category === filters.category
  );

  // Then derive available options from category-filtered experts
  const allLanguages = [...new Set(categoryFilteredExperts.flatMap(expert => expert.languages))];
  const allExpertise = [...new Set(categoryFilteredExperts.flatMap(expert => expert.expertise))];
  const allGenders = ["male", "female"];

  const expertTitle = {
    therapist: "Therapists",
    psychologist: "Psychologists",
    psychiatrist: "Psychiatrists"
  }[selectedExpert] || "Experts";

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value]
      };
      return updatedFilters;
    });
  };

  // Apply remaining filters to category-filtered experts
  const filteredExperts = categoryFilteredExperts.filter(expert => {
    const matchesPrice = expert.price >= filters.priceRange.min &&
      expert.price <= filters.priceRange.max;
    const matchesGender = filters.gender.length === 0 ||
      filters.gender.includes(expert.gender);
    const matchesLanguage = filters.languages.length === 0 ||
      expert.languages.some(lang => filters.languages.includes(lang));
    const matchesExpertise = filters.expertise.length === 0 ||
      expert.expertise.some(exp => filters.expertise.includes(exp));

    return matchesPrice && matchesGender && matchesLanguage && matchesExpertise;
  });

  const clearFilters = () => {
    const resetFilters = {
      priceRange: { min: 0, max: 10000 },
      gender: [],
      languages: [],
      expertise: [],
      category: selectedExpert || ''
    };
    setFilters(resetFilters);
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: selectedExpert || ''
    }));
  }, [selectedExpert]);

  return (
    <div className="w-full bg-gray-50 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">All {expertTitle}</h2>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm hover:bg-gray-50"
          >
            <i className="bi bi-funnel text-lg"></i>
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 flex items-center gap-1 hover:text-gray-900"
              >
                <i className="bi bi-x-circle"></i>
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: Number(e.target.value) }
                  }))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  Up to ₹{filters.priceRange.max}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {allGenders.map(gender => (
                  <label key={gender} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(gender.toLowerCase())}
                      onChange={() => toggleFilter('gender', gender.toLowerCase())}
                      className="rounded text-green-600"
                    />
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </label>
                ))}
              </div>

              {/* Languages Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {allLanguages.map(language => (
                    <label key={language} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={filters.languages.includes(language)}
                        onChange={() => toggleFilter('languages', language)}
                        className="rounded text-green-600"
                      />
                      {language}
                    </label>
                  ))}
                </div>
              </div>

              {/* Expertise Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise
                </label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {allExpertise.map(exp => (
                    <label key={exp} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={filters.expertise.includes(exp)}
                        onChange={() => toggleFilter('expertise', exp)}
                        className="rounded text-green-600"
                      />
                      {exp}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredExperts.map((expert, index) => (
            <ExpertCard key={index} expert={expert} />
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No experts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();

  const handleBookSession = () => {
    navigate(`/book/${expert.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <img
            src={expert.image}
            alt={expert.name}
            className="rounded-xl object-cover h-32 w-28"
          />
        </div>
        <div className="flex flex-col justify-start space-y-1.5">
          <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
          <p className="text-sm text-gray-600">{expert.experience} years of experience</p>
          <p className="text-sm font-medium text-gray-900">
            Starts @ ₹{expert.price} <span className="text-gray-500">for {expert.duration}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1.5">Expertise</p>
          <div className="flex flex-wrap gap-1.5">
            {expert.expertise.map((item, index) => (
              <span
                key={index}
                className="text-sm bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Languages</p>
          <p className="text-sm text-gray-600">{expert.languages.join(", ")}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">Next available</p>
          <p className="text-sm font-medium text-red-600">{expert.nextSlot}</p>
        </div>
        <button
          onClick={handleBookSession}
          className="bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700 active:bg-green-800 transition-colors duration-200 shadow-sm"
        >
          Book Session
        </button>
      </div>
    </div>
  );
};

export default ExpertListing;