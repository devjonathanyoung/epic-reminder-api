import promiseRouter from "express-promise-router";

import authenticateToken from "../middleware/authenticate-token.js";
import csrfProtection from "../middleware/csrf-protection.js";
import handleGetCSRFToken from "./routes/handle-csrf.js";
import { validationRulesUserLogin, handleLogin } from "./routes/handle-login.js";

const router = promiseRouter();

/**
 * route serving the login for an user
 */
router.post("/login", validationRulesUserLogin, handleLogin);

/**
 * csrf route
 */
router.get("/csrf", authenticateToken, csrfProtection, handleGetCSRFToken);

export default router;
