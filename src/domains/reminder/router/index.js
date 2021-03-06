import promiseRouter from "express-promise-router";

import { validationRulesDelete, handleDeleteReminder } from "./routes/handle-delete-reminder.js";
import { handleGetAllReminders } from "./routes/handle-get-all-reminders.js";
import { validationRulesGetOneReminder, handleGetOneReminder } from "./routes/handle-get-one-reminder.js";
import { validationRulesCreate, handlePostReminder } from "./routes/handle-post-reminder.js";
import { validationRulesUpdate, handleUpdateReminder } from "./routes/handle-update-reminder.js";

const router = promiseRouter();

/**
 * route to get all reminders
 */
router.get("/", handleGetAllReminders);

/**
 * route to get one reminder
 */
router.get("/:id", validationRulesGetOneReminder, handleGetOneReminder);

/**
 * route to create a reminder
 */
router.post("/", validationRulesCreate, handlePostReminder);

/**
 * route to update a reminder
 */
router.put("/:id", validationRulesUpdate, handleUpdateReminder);

/**
 * route to delete a reminder
 */
router.delete("/:id", validationRulesDelete, handleDeleteReminder);

export default router;
