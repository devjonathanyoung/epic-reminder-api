import reminderServices from "../service/index.js"
import promiseRouter from "express-promise-router";
import expressValidator from "express-validator";

const router = promiseRouter();
const { validationResult, matchedData, body } = expressValidator;

router.get("/", async (req, res) => {
    const reminders = await reminderServices.getAllReminders();
    if (reminders.length === 0) {
        return res.status(404).send({message: "There is no reminder yet."})
    }
    res.send(reminders);
});


router.get("/:id", async (req, res) => {
    const reminder = await reminderServices.getOneReminder(req.params.id);
    if (reminder.length === 0) {
        return res.status(404).send({message: "Id reminder not found."})
    }
    res.send(reminder);
});

const validationRulesCreate = [body("type").isIn(["movie", "book", "game"]),
body("date").optional().isISO8601(),
body("name").notEmpty(),
body("comment").optional()]

router.post("/",
validationRulesCreate
, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const validateDatas = matchedData(req);
    const resultCreation = await reminderServices.createOneReminder(validateDatas);
    res.send({
                resultCreation
            })
    })

    const validationRulesUpdate = [body("type").optional().isIn(["movie", "book", "game"]),
    body("date").optional().isISO8601(),
    body("name").optional().notEmpty(),
    body("comment").optional()]

router.put("/:id",
validationRulesUpdate
, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const validateDatas = matchedData(req);
    const updatedReminder = await reminderServices.updateOneReminder(req.params.id, validateDatas);
    res.send(updatedReminder)
})

router.delete("/:id", async (req, res) => {
    const deletedReminder = await reminderServices.deleteOneReminder(req.params.id);
    if (!deletedReminder) {
        return res.send({error : "Id reminder not found."})
    }
    res.send({message: "This reminder has been successfully deleted."})
});

export default router;
