import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    FaCalendarAlt,
    FaClock,
    FaUserMd,
    FaLink,
    FaTimes
} from 'react-icons/fa';

// Confirmation Dialog Component
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);

    // Fetch Appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "https://wevolvebackend.onrender.com/api/booking/show",
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setAppointments(response.data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch appointments");
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Handle Appointment Cancellation
    const handleCancelAppointment = async () => {
        if (!appointmentToCancel) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(
                `https://wevolvebackend.onrender.com/api/booking/cancel/${appointmentToCancel}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Remove cancelled appointment from list
            setAppointments(prev =>
                prev.filter(appointment => appointment.id !== appointmentToCancel)
            );

            toast.success("Appointment cancelled successfully");
            setConfirmDialogOpen(false);
            setAppointmentToCancel(null);
        } catch (error) {
            toast.error("Failed to cancel appointment");
            setConfirmDialogOpen(false);
        }
    };

    // Open Confirmation Dialog
    const openCancelDialog = (appointmentId) => {
        setAppointmentToCancel(appointmentId);
        setConfirmDialogOpen(true);
    };

    // Format Date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-emerald-600">Loading Appointments...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Appointments</h1>

            {appointments.length === 0 ? (
                <div className="text-center text-gray-600">
                    No appointments found.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className={`
                bg-white rounded-lg shadow-md p-6 
                ${appointment.status === 'cancelled' ? 'opacity-50' : ''}
              `}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-emerald-600">
                                    {appointment.doctorName}
                                </h2>
                                <span
                                    className={`
                    px-3 py-1 rounded-full text-xs font-bold uppercase
                    ${appointment.status === 'booked'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-red-100 text-red-800'}
                  `}
                                >
                                    {appointment.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-gray-600">
                                    <FaCalendarAlt className="mr-2" />
                                    {formatDate(appointment.date)}
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaLink className="mr-2" />
                                    <a
                                        href={appointment.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Join Meeting
                                    </a>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <FaUserMd className="mr-2" />
                                    {appointment.notes}
                                </div>
                            </div>

                            {appointment.status !== 'cancelled' && (
                                <button
                                    onClick={() => openCancelDialog(appointment.id)}
                                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    Cancel Appointment
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <ConfirmationDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleCancelAppointment}
                message="Are you sure you want to cancel this appointment?"
            />
        </div>
    );
};

export default Appointments;