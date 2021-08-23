/**
 * get csrf token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleGetCSRFToken = async (req, res) => {
	const csrfToken = req.csrfToken();
	res.set("csrf-token", csrfToken);
	res.send({ success: true, csrfToken });
};

export default handleGetCSRFToken;
