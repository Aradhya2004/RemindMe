import Reminder from "../models/Reminder.js";

export const createReminder = async (req, res) => {
  try {
    const { task, date, time, message, remindBy } = req.body;
    const newReminder = new Reminder({ task, date, time, message, remindBy });
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ date: 1, time: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, date, time, message, remindBy } = req.body;
    const updated = await Reminder.findByIdAndUpdate(
      id,
      { task, date, time, message, remindBy },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Reminder not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update reminder" });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reminder.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Reminder not found" });
    res.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
};
