import dbReminder from "../../../infrastructure/database/index.mjs";

const selectAllReminders = async () => {
    const reminders = await dbReminder("reminder").select("*");
    return reminders;
};

const selectOneReminder = async (reminderId) => {
    const reminder = await dbReminder("reminder").select("x").where('id', reminderId);
    return reminder;
};

const createOneReminder = async (newReminder) => {
    const reminder = await dbReminder("reminder").insert({date: newReminder.date, name : newReminder.name, type: newReminder.type});
    return reminder;
    //id par default ?
    //const {date, name, type} = newReminder;
    //const reminder = await dbReminder("reminder").insert({date, name, type});
}

const updateOneReminder = async (reminderId, updates) => {
    //const {date, name, type} = updates;
    const updatedReminder = await dbReminder("reminder").where('id', reminderId)
    .update({
      date: updates.date,
      name: updates.name,
      type: updates.type
    })
    return updatedReminder;
}

const deleteOneReminder = async (reminderId) => {
    const deletedRreminder = await dbReminder("reminder").where('id', reminderId).del();
    return deletedReminder;
    //return le reminder supprimé ? 
}

export default {
    selectAllReminders,
    selectOneReminder,
    createOneReminder,
    updateOneReminder,
    deleteOneReminder
}