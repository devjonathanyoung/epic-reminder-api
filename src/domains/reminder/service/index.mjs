import reminderDataAccess from "../data-access/index.mjs";

const getAllReminders = async () => {
    const reminders = await reminderDataAccess.selectAllReminders();
    return reminders;
};

const getOneReminder = async (reminderId) => {
    const reminder = await reminderDataAccess.selectOneReminder(reminderId);
    return reminder;
};

const createOneReminder = async (newReminder) => {
    const reminder = await reminderDataAccess.insertOneReminder(newReminder);
    return reminder;
    //const newReminder possible ? 
};

const updateOneReminder = async (reminderId, updates) => {
    const updatedReminder = await reminderDataAccess.updateOneReminder(reminderId, updates);
    return updatedReminder;
};

const deleteOneReminder = async (reminderId) => {
    const deletedReminder = await reminderDataAccess.deleteOneReminder(reminderId);
    return deletedReminder;
};

export default {
    getAllReminders,
    getOneReminder,
    createOneReminder,
    updateOneReminder,
    deleteOneReminder
}