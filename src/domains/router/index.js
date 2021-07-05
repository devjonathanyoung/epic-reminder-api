
import reminderServices from "../reminder/service/index.js"
import promiseRouter from "express-promise-router";

const router = promiseRouter();

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

router.post("/", async (req, res) => {
    const addReminder = {...req.body}
    if (!addReminder.name || !addReminder.type) {
        return res.send({error : "You must provide a name and a type for this reminder."})
    }
    const doublon = await reminderServices.findDoublon(addReminder);
    if (doublon.length > 0) {
        return res.send({error : "This reminder name and type already exists."})
    }
    const newReminder = await reminderServices.createOneReminder(addReminder);
    if (typeof(newReminder[0]) === "string")
    {
        return res.send({
            message: "This reminder has not been created.",
            alert: newReminder
        })
    }
    res.send({
        message: "This reminder has been successfully created.",
        newReminder
    })
});

router.put("/:id", async (req, res) => {
    const updatedDatas = {...req.body}
    if (!updatedDatas.name || !updatedDatas.type) {
        return res.send({error : "You must provide a name and a type for this reminder."})
    }
    const updatedReminder = await reminderServices.updateOneReminder(req.params.id, updatedDatas);
    if (updatedReminder.length === 0) {
        return res.send({error : "Id reminder not found."})
    }
    const doublon = await reminderServices.findDoublon(updatedDatas);
    if (doublon.length > 0) {
        return res.send({error : "This reminder name and type already exists."})
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
