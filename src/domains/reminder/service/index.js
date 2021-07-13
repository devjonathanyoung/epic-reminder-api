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
    const doublon = await reminderDataAccess.findDoublon(newReminder);
    if (doublon.length > 0) {
        return {error : "This reminder name and type already exists."};
    }
    const reminder = await reminderDataAccess.insertOneReminder(newReminder);
    return {
            message: "This reminder has been successfully created.",
            newReminder
                    };
};

const updateOneReminder = async (reminderId, update) => {
    const updatedReminder = await reminderDataAccess.updateOneReminder(reminderId, update);
    return updatedReminder;
};

const deleteOneReminder = async (reminderId) => {
    if (!validator.isUUID(reminderId)){
        return;
    }
    const deletedReminder = await reminderDataAccess.deleteOneReminder(reminderId);
    return deletedReminder;
};

const findDoublon = async (newReminder) => {
    const doublon = await reminderDataAccess.findDoublon(newReminder);
    return doublon;
};

export default {
    getAllReminders,
    getOneReminder,
    createOneReminder,
    updateOneReminder,
    deleteOneReminder,
    findDoublon
}
