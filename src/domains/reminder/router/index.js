
import reminderServices from "../service/index.js"
import promiseRouter from "express-promise-router";
import expressValidator from "express-validator";

const router = promiseRouter();
const { body, validationResult } = expressValidator;

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

router.post("/", 
body("name").notEmpty(),
body("type").notEmpty(),
body("type").isIn(["movie", "book", "game"]),
body("date").optional().isISO8601() 
, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const doublon = await reminderServices.findDoublon(req.body);
    if (doublon.length > 0) {
        return res.send({error : "This reminder name and type already exists."})
    }
    const newReminder = await reminderServices.createOneReminder(req.body);
    res.send({
                message: "This reminder has been successfully created.",
                newReminder
            })
    })

router.put("/:id",
body("name").notEmpty(),
body("type").notEmpty(),
body("type").isIn(["movie", "book", "game"]),
body("date").optional().isISO8601() 
, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const updatedDatas = {...req.body}
    const updatedReminder = await reminderServices.updateOneReminder(req.params.id, updatedDatas);
    if (updatedReminder.length === 0) {
        return res.send({error : "Id reminder not found."})
    }
    if (typeof(updatedReminder[0]) === "string")
    {
        return res.send({
            message: "This reminder has not been updated.",
            alert: updatedReminder
        })
    }
    res.send({
        message: "This reminder has been successfully updated.", 
        updatedReminder
    })
})

router.delete("/:id", async (req, res) => {
    const deletedReminder = await reminderServices.deleteOneReminder(req.params.id);
    if (!deletedReminder) {
        return res.send({error : "Id reminder not found."})
    }
    res.send({message: "This reminder has been successfully deleted."})
});

export default router;
