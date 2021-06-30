
import reminderServices from "./service/index.js"
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

router.put("/:id", () => {

})

router.delete("/:id", () => {

});

export default router;
