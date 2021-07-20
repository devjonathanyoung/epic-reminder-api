import reminderDataAccess from "../data-access/index.js";
import validator from "validator";

const getAllReminders = async () => {
    const reminders = await reminderDataAccess.selectAllReminders();
    return reminders;
};

const getOneReminder = async (reminderId) => {
    if (!validator.isUUID(reminderId)){
        return [];
    }
    const reminder = await reminderDataAccess.selectOneReminder(reminderId);
    return reminder;
};

const createOneReminder = async (newReminder) => {
    const reminder = await reminderDataAccess.insertOneReminder(newReminder);
    return {
            message: "This reminder has been successfully created.",
            newReminder
                    };
};

const updateOneReminder = async (reminderId, update) => {
    // Does the id exist ?
    const existingReminder = await getOneReminder(reminderId);
    if (!existingReminder) {
        return {
            message: "Id not found."
        };
    }  
    // Update the body of the reminder with the new info
    const reminderModified = {...existingReminder, ...update};
    // Update for real the reminder in the DB
    const updatedReminder = await reminderDataAccess.updateOneReminder(reminderId, update);
    if (!updatedReminder) {
        return {
            message: "An error occured when processing update."
        };
    } else {
        return {
            message: "The reminder has been successfully updated.",
            updatedReminder
        };
    }
}

const deleteOneReminder = async (reminderId) => {
    if (!validator.isUUID(reminderId)){
        return;
    }
    const deletedReminder = await reminderDataAccess.deleteOneReminder(reminderId);
    return deletedReminder;
};

export default {
    getAllReminders,
    getOneReminder,
    createOneReminder,
    updateOneReminder,
    deleteOneReminder,
}
