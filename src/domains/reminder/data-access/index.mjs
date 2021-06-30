import dbReminder from "../../../infrastructure/database/index.mjs";

const selectAllReminders = async () => {
    const reminders = await dbReminder("reminder").select("*");
    return reminders;
};

export default {
    selectAllReminders
}