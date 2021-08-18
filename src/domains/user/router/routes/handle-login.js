import userServices from "../../service/index.js";
import expressValidator from "express-validator";
const { body, validationResult, matchedData } = expressValidator;

export const validationRulesUserLogin = [
    body("firstName").exists(),
    body("password").exists()
];

/**
 * route to get all users
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
 export const handleLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array()});
    }
    const validatedUser = matchedData(req);

    const userAuthorized = await userServices.checkUserForLogin(validatedUser);


    res.send(userAuthorized);
};


