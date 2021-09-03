import promiseRouter from "express-promise-router";

import { handleGetAllUsers } from "./routes/handle-get-all-users.js";
import handleGetCurrentUser from "./routes/handle-get-current-user.js";
import { validationRulesGetUserById, handleGetUserById } from "./routes/handle-get-user-by-id.js";

const router = promiseRouter();

/**
 * route serving all user
 */
router.get("/", handleGetAllUsers);

/**
 * route serving the current user
 */
router.get("/current", handleGetCurrentUser);

/**
 * route to get one user by its id
 */
router.get("/:id", validationRulesGetUserById, handleGetUserById);

export default router;
