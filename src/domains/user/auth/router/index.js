import promiseRouter from "express-promise-router";

import authenticateToken from "../middleware/authenticate-token.js";
import csrfProtection from "../middleware/csrf-protection.js";
import handleGetCSRFToken from "./routes/handle-csrf.js";
import { validationRulesUserLogin, handleLogin } from "./routes/handle-login.js";
import { validationRulesCreateUser, handlePostUser } from "./routes/handle-post-user.js";

const router = promiseRouter();

/**
 * route serving the login for an user
 */
router.post("/login", validationRulesUserLogin, handleLogin);

/**
 * route serving the creation account for an user (sign up)
 */
router.post("/sign-up", validationRulesCreateUser, handlePostUser, handleLogin);

/**
 * csrf route
 */
//router.get("/csrf", authenticateToken, csrfProtection, handleGetCSRFToken);

export default router;
