import jwt from "jsonwebtoken";
import authServices from "../../services/index.js";

const handleLogout = async (req, res) => {
	const token = req.cookies.jwt;
	const tokenDecrypt = authServices.decrypt(token);
    try {
        const loggedUser = jwt.verify(tokenDecrypt, process.env.JWT_SECRET_SIGN);
        
        if (!loggedUser) {
            return res.sendStatus(401);
        }
        return res.clearCookie("jwt").json({ message: "Loggout in successfully 🖐️" });

    } catch {
		return res.sendStatus(403);
    }
};

export default handleLogout;