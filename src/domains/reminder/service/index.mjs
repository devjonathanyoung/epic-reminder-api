import reminderDataAccess from "../data-access/index.mjs";

const getAllReminders = async () => {
    const reminders = await reminderDataAccess.selectAllReminders();
    return reminders;
};

export default {
    getAllReminders
}