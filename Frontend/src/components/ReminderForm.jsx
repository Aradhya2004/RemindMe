import { useState } from "react";
import axios from "axios";

export default function ReminderForm() {
    const [form, setForm] = useState({
        task: "",
        date: "",
        time: "",
        message: "",
        remindBy: "email",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/reminders", form);
            console.log("Reminder saved:", response.data);
            alert("Reminder saved successfully!");

            // Clear the form
            setForm({
                task: "",
                date: "",
                time: "",
                message: "",
                remindBy: "email",
            });
        } catch (error) {
            console.error("Error saving reminder:", error);
            alert("Failed to save reminder. Please try again.");
        }
    };

    return (
        <div className="min-h-full flex items-center justify-center p-4 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Remind Me Later</h2>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        name="task"
                        value={form.task}
                        onChange={handleChange}
                        placeholder="Enter task name"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <div className="flex items-center justify-center gap-6">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="radio"
                            name="remindBy"
                            value="email"
                            checked={form.remindBy === "email"}
                            className="cursor-pointer"
                            onChange={handleChange}
                        />
                        Email
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="radio"
                            name="remindBy"
                            value="sms"
                            checked={form.remindBy === "sms"}
                            className="cursor-pointer"
                            onChange={handleChange}
                        />
                        SMS
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    Save Reminder
                </button>
            </form>
        </div>
    );
}
