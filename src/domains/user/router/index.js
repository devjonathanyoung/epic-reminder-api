import promiseRouter from "express-promise-router";

import { handleGetAllUsers } from "./routes/handle-get-all-users.js";

const router = promiseRouter();

//TODO: après avoir créé les routes
//const checkPermissions = require("dbl-config/permissions/check-permission");
//const userPermissions = checkPermissions("user");

/**
 * route serving all user
 */
router.get("/", handleGetAllUsers);


export default router;