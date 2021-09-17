import dbReminder from "../../../infrastructure/database/index.js";

const selectAllReminders = async (sort, order, search, type) => {
	let reminders = dbReminder("reminder");
	reminders.select("*").orderBy(`${sort}`, `${order}`).where("name", "ILIKE", `%${search}%`);
	if (type !== "all") {
		reminders = reminders.andWhere("type", `${type}`);
	}
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
		.del()
		.returning("id");
	return deletedReminder;
};

export default { selectAllReminders,
	selectOneReminder,
	insertOneReminder,
	updateOneReminder,
	deleteOneReminder };
