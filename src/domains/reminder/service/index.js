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
    let checkData = [];
    if (newReminder.id && !validator.isUUID(newReminder.id)){
        checkData.push("UUID doesn't fit the correct format. ")
    }
    if (!validator.isIn(newReminder.type, ["movie", "book", "game"])){
        checkData.push("Type must be movie, book or game. ")
    }
    if (newReminder.date && !validator.isDate(newReminder.date.substring(0, 10), "YYYY-MM-DD")){
        checkData.push("Date doesn't fit the correct format.")
    }
    if (checkData.length > 0) {
        return checkData
    }
    const reminder = await reminderDataAccess.insertOneReminder(newReminder);
    return reminder;
};

const updateOneReminder = async (reminderId, update) => {
    //Check if user put an empty value on name or type
    let isEmpty = [];
    if ('type' in update && validator.isEmpty(update.type)){
        isEmpty.push("Type's field is empty. ")
    }
    if ('name' in update && validator.isEmpty(update.name)){
        isEmpty.push("Name's field is empty. ")
    }
    if (isEmpty.length > 0) {
        return isEmpty;
    }
    //Check format value
    let checkData = [];
    if (reminderId && !validator.isUUID(reminderId)){
        checkData.push("UUID doesn't fit the correct format. ")
    }
    if (update.type && !validator.isIn(update.type, ["movie", "book", "game"])){
        checkData.push("Type must be movie, book or game. ")
    }
    if (update.date && validator.isDate(update.date.substring(0, 10), "YYYY-MM-DD")){
        checkData.push("Date doesn't fit the correct format.")
    }
    if (checkData.length > 0) {
        return checkData
    }
    //Missing check on making doublon
    //If no empty mandatory value && no format mistake, reminder is updated
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
