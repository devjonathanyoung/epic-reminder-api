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

const deleteReminderFav = async (reminderFavId) => {
	const deletedReminderFav = await dbReminder("reminder_fav")
		.where("id", reminderFavId)
		.del()
		.returning("*");
	return deletedReminderFav;
};

export default {
	insertFav,
	selectAllRemindersByUser,
	deleteReminderFav
};
