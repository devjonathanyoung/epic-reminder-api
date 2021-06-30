
import reminderServices from "./service/index.mjs"
import promiseRouter from "express-promise-router";

const router = promiseRouter();

router.get("/", async (req, res) => {
    const reminders = await reminderServices.getAllReminders();
    res.send(reminders);
});


router.get("/:id", () => {
    
});

router.post("/", () => {

});

router.put("/", () => {

})

router.delete("/", () => {

});

export default router;