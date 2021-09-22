import dbReminder from "../../../infrastructure/database/index.js";

const insertFav = async (newFav) => {
	const reminderFav = await dbReminder("reminder_fav")
		.insert(newFav)
		.returning("*");
	return reminderFav;
};

export default {
	insertFav
};
