import userServices from "../../service/index.js"

/**
 * route serving current user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleGetCurrentUser = async (req, res) => {
	const userToken = req.user;
	const user = await userServices.getUserById(userToken.id);
	res.send(user);
};

export default handleGetCurrentUser;