import userDataAccess from "../data-access/index.js";
import { APIError } from "../../../config/index.js";

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

const createUser = async (newUser) => {
    return await userDataAccess.insertUser(newUser);
};

export default {
    getAllUsers,
    getUserById,
    createUser
}