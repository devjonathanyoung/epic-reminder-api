import dbReminder from "../../../infrastructure/database/index.js";

const selectAllReminders = async () => {
    const reminders = await dbReminder("reminder").select("*");
    return reminders;
};

export default {
    selectAllReminders
}
