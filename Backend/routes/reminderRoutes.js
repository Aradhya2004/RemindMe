import express from "express";
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} from "../controllers/ReminderController.js";

const router = express.Router();

router.post("/reminders", createReminder);
router.get("/reminders", getReminders);
router.put("/reminders/:id", updateReminder);
router.delete("/reminders/:id", deleteReminder);

export default router;
