import dbReminder from "../../../infrastructure/database/index.js";

const selectAllReminders = async () => {
  const reminders = await dbReminder("reminder").select("*").orderBy("date", "asc");
  return reminders;
};

const selectOneReminder = async (reminderId) => {
  const reminder = await dbReminder("reminder")
    .first("*")
    .where("id", reminderId);
  return reminder;
};

const insertOneReminder = async (newReminder) => {
  const { date, name, type, comment } = newReminder;
  const reminder = await dbReminder("reminder")
    .insert({ date, name, type, comment })
    .returning("*");
  return reminder;
};

const updateOneReminder = async (reminderId, update) => {
  const reminder = await dbReminder("reminder")
    .select("*")
    .where("id", reminderId);
  if (reminder.length === 0) {
    return reminder;
  }
  const updatedReminder = await dbReminder("reminder")
    .where("id", reminderId)
    .update(update)
    .returning("*");
  return updatedReminder;
};

const deleteOneReminder = async (reminderId) => {
  const deletedReminder = await dbReminder("reminder")
    .where("id", reminderId)
    .del();
  return deletedReminder;
};

const findDoublon = async (newReminder) => {
  const doublon = await dbReminder("reminder")
    .where({
      name: newReminder.name,
      type: newReminder.type,
    })
    .first("id");
  return doublon;
};

export default {
  selectAllReminders,
  selectOneReminder,
  insertOneReminder,
  updateOneReminder,
  deleteOneReminder,
  findDoublon,
};
