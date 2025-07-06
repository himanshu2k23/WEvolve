import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUserMd,
  FaTransgender,
  FaBriefcase,
  FaLanguage,
  FaCheckCircle,
  FaCircle,
  FaMoneyBillWave,
  FaClock,
  FaTimes
} from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';
import { toast } from 'react-toastify';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, expert, selectedSlot }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-emerald-600">Confirm Booking</h2>

        <div className="space-y-4 mb-6">
          <div>
            <p className="font-semibold">Expert:</p>
            <p>{expert.name}</p>
          </div>
          <div>
            <p className="font-semibold">Date and Time:</p>
            <p>{selectedSlot.day}, {selectedSlot.startTime} - {selectedSlot.endTime}</p>
          </div>
          <div>
            <p className="font-semibold">Price:</p>
            <p>₹{expert.price}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const { data } = await axios.get(
          `https://wevolvebackend.onrender.com/api/doctors/${id}`
        );
        setExpert(data);
      } catch (err) {
        setError(err.message || "Error fetching expert");
      } finally {
        setLoading(false);
      }
    };
    fetchExpert();
  }, [id]);

  const handleBookSession = async () => {
    if (!selectedSlot) {
      toast.error("Please select an available time slot");
      return;
    }

    // Open confirmation modal instead of directly booking
    setIsConfirmModalOpen(true);
  };

  const confirmBooking = async () => {
    const token = localStorage.getItem('token');

    const bookingData = {
      doctorId: expert.id,
      date: new Date(
        `2025-08-07T${selectedSlot.startTime}:00Z`
      ).toISOString(),
      meetingLink: "https://meet.example.com/session123",
      notes: "First consultation"
    };

    try {
      setIsBooking(true);
      const response = await axios.post(
        "https://wevolvebackend.onrender.com/api/booking/add",
        bookingData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success("Booking successful!");
      setIsConfirmModalOpen(false);

      setTimeout(() => {
        navigate('/appointments');
      }, 1000);
    } catch (err) {
      console.error('Booking error:', err);
      toast.error(
        err.response?.data?.message ||
        "Failed to book the session. Please try again."
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-emerald-600">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Error: {error}
    </div>
  );

  if (!expert) return (
    <div className="min-h-screen flex items-center justify-center">
      No expert found.
    </div>
  );

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 p-10">
          <div className="space-y-8">
            <div className="flex items-center space-x-8">
              <img
                src={`/${expert.image}`}
                alt={expert.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-emerald-100 shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{expert.name}</h1>
                <p className="text-emerald-600 font-semibold text-xl capitalize">
                  {expert.category}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FaUserMd className="mr-3 text-emerald-600" />
                Expert Information
              </h2>
              <div className="space-y-3">
                <DetailItem
                  icon={<FaTransgender className="text-purple-600" />}
                  text={`${expert.gender.charAt(0).toUpperCase() + expert.gender.slice(1)}`}
                />
                <DetailItem
                  icon={<FaBriefcase className="text-blue-600" />}
                  text={`${expert.experience} years of experience`}
                />
                <DetailItem
                  icon={<FaLanguage className="text-green-600" />}
                  text={`Languages: ${expert.languages.join(", ")}`}
                />
                <DetailItem
                  icon={<FaMoneyBillWave className="text-green-600" />}
                  text={`₹${expert.price} per session`}
                />
                <DetailItem
                  icon={<FaClock className="text-indigo-600" />}
                  text={`Session Duration: ${expert.duration}`}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <MdHealthAndSafety className="mr-3 text-emerald-600" />
                Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {expert.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <FaMoneyBillWave className="mr-3 text-emerald-600" />
                Pricing
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Price per Session</span>
                  <span className="font-semibold text-emerald-600">₹{expert.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Session Duration</span>
                  <span className="font-semibold text-emerald-600">{expert.duration}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <FaCheckCircle className="mr-3 text-emerald-600" />
                Availability
              </h2>
              <div className="space-y-4">
                {expert.availability.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    className={`
                      border-2 p-5 rounded-lg cursor-pointer transition-all duration-300 flex justify-between items-center
                      ${selectedSlot === slot
                        ? 'border-emerald-500 bg-emerald-100'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'}
                    `}
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-700">{slot.day}</p>
                      <p className="text-gray-500 text-base">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    {selectedSlot === slot ? (
                      <FaCheckCircle className="text-emerald-500 text-2xl" />
                    ) : (
                      <FaCircle className="text-gray-300 text-2xl" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleBookSession}
              disabled={!selectedSlot || isBooking}
              className={`
                w-full py-4 rounded-lg text-white font-semibold text-lg transition-all duration-300
                ${selectedSlot && !isBooking
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-gray-400 cursor-not-allowed'}
              `}
            >
              {isBooking ? 'Booking...' : 'Book Session'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmBooking}
        expert={expert}
        selectedSlot={selectedSlot}
      />
    </div>
  );
};

const DetailItem = ({ icon, text }) => (
  <div className="flex items-center space-x-3">
    <div className="w-8">{icon}</div>
    <p className="text-gray-700">{text}</p>
  </div>
);

export default BookingPage;