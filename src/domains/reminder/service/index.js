import reminderDataAccess from "../data-access/index.js";

const getAllReminders = async () => {
    const reminders = await reminderDataAccess.selectAllReminders();
    return reminders;
};

export default {
    getAllReminders
}
