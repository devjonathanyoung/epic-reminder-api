import dbReminder from "../../../infrastructure/database/index.js";

const insertFav = async (newFav) => {
	const reminderFav = await dbReminder("reminder_fav")
		.insert(newFav)
		.returning("*");
	return reminderFav;
};

const selectAllRemindersFavByUser = async (userId) => {
	const allRemindersByUser = await dbReminder("reminder_fav")
		.join("reminder", "reminder_fav.reminder_id", "=", "reminder.id")
		.select("*", "reminder_fav.id")
		.where("user_id", userId);
	return allRemindersByUser;
};

const deleteReminderFav = async (reminderFavId) => {
	const deletedReminderFav = await dbReminder("reminder_fav")
		.where("id", reminderFavId)
		.del()
		.returning("id");
	return deletedReminderFav;
};

export default {
	insertFav,
	selectAllRemindersFavByUser,
	deleteReminderFav
};
