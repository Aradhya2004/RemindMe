import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function ReminderList() {
    const [reminders, setReminders] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        task: "",
        date: "",
        time: "",
        message: "",
        remindBy: "email",
    });
    const navigate = useNavigate();

    // Fetch reminders on mount
    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/reminders`);
            setReminders(res.data);
        } catch (err) {
            console.error("Failed to fetch reminders:", err);
        }
    };

    // Delete reminder
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reminder?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/reminders/${id}`);
            setReminders(reminders.filter((r) => r._id !== id));
        } catch (err) {
            console.error("Failed to delete reminder:", err);
            alert("Failed to delete reminder");
        }
    };

    // Start editing a reminder
    const handleEditClick = (reminder) => {
        setEditingId(reminder._id);
        setEditForm({
            task: reminder.task,
            date: reminder.date.split("T")[0],
            time: reminder.time,
            message: reminder.message,
            remindBy: reminder.remindBy,
        });
    };

    // Handle changes in edit form inputs
    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    // Save edited reminder
    const handleSave = async (id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/reminders/${id}`, editForm);
            setReminders(reminders.map(r => (r._id === id ? res.data : r)));
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update reminder:", err);
            alert("Failed to update reminder");
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setEditingId(null);
    };

    const handleNavigateToHome = () => {
        navigate("/");
    };

    return (
        <div className="h-screen bg-gray-100 p-6 flex flex-col">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Reminders</h1>

            {reminders.length === 0 && (
                <p className="text-center text-gray-600 flex-grow">No reminders found.</p>
            )}

            {/* Scrollable reminders container */}
            <div className="flex-grow overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-4">
                    {reminders.map((reminder) => (
                        <div
                            key={reminder._id}
                            className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                            {editingId === reminder._id ? (
                                <>
                                    {/* edit inputs */}
                                    <input
                                        type="text"
                                        name="task"
                                        value={editForm.task}
                                        onChange={handleEditChange}
                                        className="border px-2 py-1 rounded w-full sm:w-1/5"
                                        placeholder="Task"
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={editForm.date}
                                        onChange={handleEditChange}
                                        className="border px-2 py-1 rounded w-full sm:w-1/5"
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={editForm.time}
                                        onChange={handleEditChange}
                                        className="border px-2 py-1 rounded w-full sm:w-1/5"
                                    />
                                    <input
                                        type="text"
                                        name="message"
                                        value={editForm.message}
                                        onChange={handleEditChange}
                                        className="border px-2 py-1 rounded w-full sm:w-1/5"
                                        placeholder="Message"
                                    />
                                    <select
                                        name="remindBy"
                                        value={editForm.remindBy}
                                        onChange={handleEditChange}
                                        className="border px-2 py-1 rounded w-full sm:w-1/6"
                                    >
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                    </select>

                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                        <button
                                            onClick={() => handleSave(reminder._id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                                        <span className="font-semibold w-1/5">{reminder.task}</span>
                                        <span className="w-1/5">{reminder.date.split("T")[0]}</span>
                                        <span className="w-1/5">{reminder.time}</span>
                                        <span className="w-1/5 truncate">{reminder.message}</span>
                                        <span className="w-1/6 capitalize">{reminder.remindBy}</span>
                                    </div>
                                    <div className="flex gap-2 mt-2 sm:mt-0">
                                        <button
                                            onClick={() => handleEditClick(reminder)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(reminder._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleNavigateToHome}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition duration-300 ease-in-out"
                title="Add Reminder"
            >
                <FaPlus size={20} />
            </button>
        </div>

    );
}
