import reminderServices from "../service/index.js"
import promiseRouter from "express-promise-router";
import expressValidator from "express-validator";

const router = promiseRouter();
const { validationResult, matchedData, body, param } = expressValidator;

/**
 * route to get all reminders
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
router.get("/", async (req, res) => {
    const reminders = await reminderServices.getAllReminders();
    if (reminders.length === 0) {
        return res.status(404).send({message: "There is no reminder yet."})
    }
    res.send(reminders);
});


const validationRulesGetOneReminder = [ param("id").exists().isUUID() ];

/**
 * route to get one reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
router.get("/:id", validationRulesGetOneReminder, async (req, res) => {
    const reminder = await reminderServices.getOneReminder(req.params.id);
    if (reminder.length === 0) {
        return res.status(404).send({message: "Id reminder not found."})
    }
    res.send(reminder);
});


const validationRulesCreate = [
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
router.post("/", validationRulesCreate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const validateDatas = matchedData(req);
    const resultCreation = await reminderServices.createOneReminder(validateDatas);
    res.send({ resultCreation})
    }
);


const validationRulesUpdate = [
    body("type").optional().isIn(["movie", "book", "game"]),
    body("date").optional().isISO8601(),
    body("name").optional().notEmpty(),
    body("comment").optional()
];

/**
 * route to update a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
router.put("/:id", validationRulesUpdate, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const validateDatas = matchedData(req);
    const updatedReminder = await reminderServices.updateOneReminder(req.params.id, validateDatas);
    if (updatedReminder.length === 0) {
        return res.send({error : "Id reminder not found."})
    }
    if (typeof(updatedReminder[0]) === "string") {
        return res.send({
            message: "This reminder has not been updated.",
            alert: updatedReminder
        });
    }
    res.send({
        message: "This reminder has been successfully updated.",
        updatedReminder
    })
});


const validationRulesDelete = [param("id").exists().isUUID()];

/**
 * route to delete a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
router.delete("/:id", validationRulesDelete, async (req, res) => {
    const deletedReminder = await reminderServices.deleteOneReminder(req.params.id);
    if (!deletedReminder) {
        return res.send({error : "Id reminder not found."})
    }
    res.send({message: "This reminder has been successfully deleted."})
});

export default router;
