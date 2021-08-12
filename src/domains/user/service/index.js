import userDataAccess from "../data-access/index.js";

const getAllUsers = async () => {
    const users = await userDataAccess.selectAllUsers();
    return users;
};

export default {
    getAllUsers
}