import dbReminder from "../../../infrastructure/database/index.js";

const selectAllUsers = async () => dbReminder("user")
	.select("*")
	.returning("*");

const selectUserById = async (userId) => {
	const user = await dbReminder("user")
		.first("*")
		.where("id", userId);
	return user;
};

const insertUser = async (newUser) => {
	const { firstName, lastName, password } = newUser;
	const user = await dbReminder("user")
		.insert({ firstname: firstName,
			lastname: lastName,
			password })
		.returning("*");
	return user;
};

const selectUserByUsername = async (newUser) => {
	const foundUser = await dbReminder("user")
		.first("*")
		.where({ firstname: newUser.firstName });
	return foundUser;
};

export default { selectAllUsers,
	selectUserById,
	insertUser,
	selectUserByUsername };
