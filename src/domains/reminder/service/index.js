import reminderDataAccess from "../data-access/index.js";
import validator from "validator";
import { body } from "express-validator";



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

const validationRules =  [
        body("type").isIn(["movie", "book", "game"]),
        body("date").optional().isISO8601(),
        body("comment").optional()
    ]

const createOneReminder = async (newReminder) => {
    validationRules, 
    (req, res, next) => {
        const newReminder = matchedData(req, { includeOptionals: true});
        console.log("test matchData", newReminder);
    }
    const reminder = await reminderDataAccess.insertOneReminder(newReminder);
    return reminder;
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
