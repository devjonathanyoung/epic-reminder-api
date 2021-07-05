import reminderDataAccess from "../data-access/index.js";
import validator from "validator";



const getAllReminders = async () => {
    const reminders = await reminderDataAccess.selectAllReminders();
    return reminders;
};

const getOneReminder = async (reminderId) => {
    const reminder = await reminderDataAccess.selectOneReminder(reminderId);
    return reminder;
};

const createOneReminder = async (newReminder) => {

    let checkData = [];
    if (newReminder.id && !validator.isUUID(newReminder.id)){
        checkData.push("UUID doesn't fit the correct format. ")
    }
    if (!validator.isIn(newReminder.type, ["movie", "book", "game"])){
        checkData.push("Type must be movie, book or game. ")
    }
    if (!validator.isDate(newReminder.date.substring(0, 10), "YYYY-MM-DD")){
        checkData.push("Date doesn't fit the correct format.")
    }
    if (checkData.length > 0) {
        return checkData
    }
    const reminder = await reminderDataAccess.insertOneReminder(newReminder);
    return reminder;
};

const updateOneReminder = async (reminderId, updates) => {
    let checkData = [];
    if (!validator.isIn(updates.type, ["movie", "book", "game"])){
        checkData.push("Type must be movie, book or game. ")
    }
    if (!validator.isDate(updates.date.substring(0, 10), "YYYY-MM-DD")){
        checkData.push("Date doesn't fit the correct format.")
    }
    if (checkData.length > 0) {
        return checkData
    }
    const updatedReminder = await reminderDataAccess.updateOneReminder(reminderId, updates);
    return updatedReminder;
};

const deleteOneReminder = async (reminderId) => {
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
