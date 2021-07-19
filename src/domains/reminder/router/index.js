import reminderServices from "../service/index.js"
import promiseRouter from "express-promise-router";
import expressValidator from "express-validator";

import { handleGetAllReminders } from "./routes/handle-get-all-reminders.js";
import { validationRulesGetOneReminder, handleGetOneReminder } from "./routes/handle-get-one-reminder.js";
import { validationRulesCreate, handlePostReminder } from "./routes/handle-post-reminder.js";
import { validationRulesUpdate, handleUpdateReminder } from "./routes/handle-update-reminder.js";

const router = promiseRouter();
const { validationResult, matchedData, body, param } = expressValidator;

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


const validationRulesDelete = [param("id").exists().isUUID()];

/**
 * route to delete a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
router.delete("/:id", validationRulesDelete, async (req, res) => {
    const deletedReminder = await reminderServices.deleteOneReminder(req.params.id);
    if (!deletedReminder) {
        return res.send({error : "Id reminder not found."})
    }
    res.send({message: "This reminder has been successfully deleted."})
});

export default router;
