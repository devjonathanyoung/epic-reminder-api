import promiseRouter from "express-promise-router";

import { validationRulesAddFav, handlePostReminderFav } from "./routes/handle-post-reminder-fav.js";

const router = promiseRouter();

/**
 * route to add a new favourite reminder
 */
router.post("/", validationRulesAddFav, handlePostReminderFav);


export default router;
