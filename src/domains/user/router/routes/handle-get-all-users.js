import userServices from "../../service/index.js";

/**
 * route to get all users
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
const handleGetAllUsers = async (req, res) => {
	const users = await userServices.getAllUsers();
	res.send(users);
};

export { handleGetAllUsers }; 