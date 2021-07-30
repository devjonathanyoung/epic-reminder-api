import reminderServices from "../../service/index.js"

/**
 * route to get all reminders
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
export const handleGetAllReminders = async (req, res) => {
    const { sort, order, search, type } = req.query;
    const reminders = await reminderServices.getAllReminders(sort, order, search, type);
    res.send(reminders);
};

