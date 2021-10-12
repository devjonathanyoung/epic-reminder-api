import dbReminder from "../../../infrastructure/database/index.js";

const selectAllReminders = async (sort, order, search, type, userId) => {
	let reminders = dbReminder("reminder");
	let reminderId = dbReminder.ref("reminder.id");

	// TODO: créér cette sous requête de façon à ce qu'elle renvoie uniquement le champ is_favorite si le reminder.id se trouve dans 
	// la table "reminder_fav" (colonne reminder_id) ET que le user_id correspond bien au user connecté et donné en param de la requête
	let subqueryFav = dbReminder("reminder_fav")
	.whereRaw(`CASE WHEN reminder_fav.reminder_id = ${reminderId} THEN 'true' ELSE 'false' END AS "is_favorite"`)
	.andWhere("user_id","=", userId)
	.as("is_favorite")

	//TODO: tests autres subqueries: 
	//const subqueryFav = dbReminder.raw(`JOIN reminder_fav ON CASE WHEN reminder_fav.reminder_id = reminder.id AND user_id = ${userId} THEN 'true' ELSE 'false' END AS isFavorite`)
	//const subqueryFav = dbReminder.raw("CASE WHEN reminder_fav.reminder_id = reminder.id THEN 'true' ELSE 'false' END AS isFavorite")

	console.log("subqueryFav ========>", subqueryFav);

	//TODO: mettre en 2nd argument du select, la sous-requête obtenue à partir de subqueryFav (qui ne renverra en réponse que le champ is_favorite)
	reminders
		.select("*")
		.orderBy(`${sort}`, `${order}`)
		.where("name", "ILIKE", `%${search}%`);

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
