import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  task: { type: String, required: true },
  date: { type: String, required: true }, // e.g. "YYYY-MM-DD"
  time: { type: String, required: true }, // e.g. "HH:mm"
  message: { type: String, required: true },
  remindBy: { type: String, enum: ["email", "sms"], default: "email" },
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;

