import reminderServices from "../../service/index.js"

/**
 * route to get all reminders
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
export const handleGetAllReminders = async (req, res) => {
    const reminders = await reminderServices.getAllReminders();
    res.send(reminders);
};
