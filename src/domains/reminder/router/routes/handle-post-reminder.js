import reminderServices from "../../service/index.js";
import expressValidator from "express-validator";
const { body, validationResult, matchedData } = expressValidator;


export const validationRulesCreate = [
    body("type").isIn(["movie", "book", "game"]),
    body("date").optional().isISO8601(),
    body("name").exists(),
    body("comment").optional()
];

/**
 * route to post (create) a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */

 export const handlePostReminder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array()});
    }
    const validateDatas = matchedData(req);
    const resultCreation = await reminderServices.createOneReminder(validateDatas);
    res.send(resultCreation);
};