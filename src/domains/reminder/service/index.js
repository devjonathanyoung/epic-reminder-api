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
    const isDoublon = await findDoublon(newReminder);
    if (isDoublon) {
        return "The reminder already exists."
    }
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
    // Check if the newly updated reminder is a doublon (return the id of the doublon in the DB)
    const isDoublon = await findDoublon(reminderModified);
    if (isDoublon && isDoublon.id !== reminderId) {
        return {
            message: "The reminder already exists.",
            existingReminder
        };
    }
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
