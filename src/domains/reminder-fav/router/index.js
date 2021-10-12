import promiseRouter from "express-promise-router";

import { validationRulesAddFav, handlePostReminderFav } from "./routes/handle-post-reminder-fav.js";
import { validationRulesDeleteFav, handleDeleteReminderFav } from "./routes/handle-delete-reminder-fav.js";
import { validationRulesGetAllFavByUser, handleGetAllFavByUser } from "./routes/handle-get-all-fav-by-user.js";

const router = promiseRouter();

/**
 * route to get all fav by user
 */
router.get("/", validationRulesGetAllFavByUser, handleGetAllFavByUser);

/**
 * route to add a new favourite reminder
 */
router.post("/", validationRulesAddFav, handlePostReminderFav);

/**
 * route to delete a favourite reminder
 */
 router.delete("/:id", validationRulesDeleteFav, handleDeleteReminderFav);

export default router;