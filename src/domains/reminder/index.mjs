
import reminderServices from "./service/index.mjs"
import promiseRouter from "express-promise-router";

const router = promiseRouter();

router.get("/", async (req, res) => {
    const reminders = await reminderServices.getAllReminders();
    res.send(reminders);
});


router.get("/:id", async (req, res) => {
    const reminder = await reminderServices.getOneReminder(req.params.id);
    res.send(reminder);
});

router.post("/", async (req, res) => {
    const newReminder = await reminderServices.createOneReminder({...req.body});
    res.send(newReminder);
});

router.put("/:id", async (req, res) => {
    const updatedReminder = await reminderServices.updateOneReminder(req.params.id, {...req.body});
    res.send(updatedReminder);
})

router.delete("/:id", async (req, res) => {
    const deletedReminder = await reminderServices.deleteOneReminder(req.params.id);
    res.send(deletedReminder);
    //res.redirect("/");
});

export default router;