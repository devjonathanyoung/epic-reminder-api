import dbReminder from "../../../infrastructure/database/index.js";

const insertFav = async (newFav) => {
	const reminderFav = await dbReminder("reminder_fav")
		.insert(newFav)
		.returning("*");
	return reminderFav;
};

const selectAllRemindersByUser = async (userId) => {
	const allRemindersByUser = await dbReminder("reminder_fav")
		.select("*")
		.where("user_id", userId);
	return allRemindersByUser;
};

export default {
	insertFav,
	selectAllRemindersByUser
};
