import reminderDataAccess from "../data-access/index.js";
import { APIError, InternalServerError } from "../../../config/index.js";




const getAllReminders = async (sort, order, search, type) => {
    const reminders = await reminderDataAccess.selectAllReminders(sort, order, search, type);
    // console.log("service reminders", reminders);
    // if (reminders  && !reminders.length  && type === "all") {
    //     return "There is no reminder yet.";
    // } else if (reminders && !reminders.length  && type !== "all") {
    //     return `There is no reminder of type ${type} yet.`;
    // } else {
    //     return reminders;
    // }
    return reminders;
};

const getOneReminder = async (reminderId) => {
    const reminder = await reminderDataAccess.selectOneReminder(reminderId);
    if (!reminder) {
        throw new APIError(404, "Id not found");
    }
    return reminder;
};

const createOneReminder = async (newReminder) => {
    return await reminderDataAccess.insertOneReminder(newReminder);
};

const updateOneReminder = async (reminderId, update) => {
    // Does the id exist ?
    const existingReminder = await getOneReminder(reminderId);

    // Update for real the reminder in the DB
    const updatedReminder = await reminderDataAccess.updateOneReminder(existingReminder.id, update);
    if (!updatedReminder) {
        throw new InternalServerError("An error occured when processing update.");
    } else {
        return updatedReminder
    }
};

const deleteOneReminder = async (reminderId) => {
    const existingReminder = await getOneReminder(reminderId);
    return await reminderDataAccess.deleteOneReminder(existingReminder.id);
};

export default {
    getAllReminders,
    getOneReminder,
    createOneReminder,
    updateOneReminder,
    deleteOneReminder,
}
