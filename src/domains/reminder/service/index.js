import reminderDataAccess from "../data-access/index.js";

const getAllReminders = async () => {
    const reminders = await reminderDataAccess.selectAllReminders();
    return reminders;
};

const getOneReminder = async (reminderId) => {
    const reminder = await reminderDataAccess.selectOneReminder(reminderId);
    if (!reminder) {
        throw "Id not found";
    }
    return reminder;
};

const createOneReminder = async (newReminder) => {
    const reminderCreated = await reminderDataAccess.insertOneReminder(newReminder);
    return reminderCreated;
};

const updateOneReminder = async (reminderId, update) => {
    // Does the id exist ?
    const existingReminder = await getOneReminder(reminderId);
    
    // Update for real the reminder in the DB
    const updatedReminder = await reminderDataAccess.updateOneReminder(existingReminder.id, update);
    if (!updatedReminder) {
        throw "An error occured when processing update.";
    } else {
        return updatedReminder
    }
};

const deleteOneReminder = async (reminderId) => {
    const existingReminder = await getOneReminder(reminderId);
    const deletedReminder = await reminderDataAccess.deleteOneReminder(existingReminder.id);
    return deletedReminder;
};

export default {
    getAllReminders,
    getOneReminder,
    createOneReminder,
    updateOneReminder,
    deleteOneReminder,
}
