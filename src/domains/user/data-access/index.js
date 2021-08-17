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
        .insert({ 
            firstname: firstName, 
            lastname: lastName, 
            password: password
        })
        .returning("*");
    return user;
};


export default {
	selectAllUsers,
    selectUserById,
    insertUser
};