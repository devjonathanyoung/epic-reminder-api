import argon2 from "argon2";

import { APIError } from "../../../config/index.js";
import userDataAccess from "../data-access/index.js";

const getAllUsers = async () => {
	const users = await userDataAccess.selectAllUsers();
	return users;
};

const getUserById = async (userId) => {
	const user = await userDataAccess.selectUserById(userId);
	if (!user) {
		throw new APIError(404, "Id not found");
	}
	return user;
};

const createUser = async (newUser) => await userDataAccess.insertUser(newUser);

const checkUserForLogin = async (user) => {
	const foundUser = await userDataAccess.selectUserByUsername(user);
	if (!foundUser) {
		throw new APIError(401, "Wrong credentials");
	}

	if (foundUser) {
		const check = await argon2.verify(foundUser.password, user.password);
		if (!check) {
			throw new APIError(401, "Wrong credentials");
		}
		return foundUser;
	}
	return null;
};

export default { getAllUsers, getUserById, createUser, checkUserForLogin };
