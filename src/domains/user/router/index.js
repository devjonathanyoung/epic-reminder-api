import promiseRouter from "express-promise-router";

import { handleGetAllUsers } from "./routes/handle-get-all-users.js";
import handleGetCurrentUser from "./routes/handle-get-current-user.js";
import { validationRulesGetUserById, handleGetUserById } from "./routes/handle-get-user-by-id.js";
import { validationRulesCreateUser, handlePostUser } from "./routes/handle-post-user.js";

const router = promiseRouter();

// TODO: après avoir créé les routes
// const checkPermissions = require("dbl-config/permissions/check-permission");
// const userPermissions = checkPermissions("user");

/**
 * route serving all user
 */
router.get("/", handleGetAllUsers);

/**
 * route serving the current user
 */
router.get("/current", handleGetCurrentUser);

/**
 * route to get one user
 */
router.get("/:id", validationRulesGetUserById, handleGetUserById);

/**
 * route to create a user
 */
router.post("/", validationRulesCreateUser, handlePostUser);

export default router;
