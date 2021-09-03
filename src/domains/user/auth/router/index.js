import promiseRouter from "express-promise-router";
import { validationRulesUserLogin, handleLogin } from "./routes/handle-login.js";
import { validationRulesCreateUser, handlePostUser } from "./routes/handle-post-user.js";
import { validationRulesFindUsername, handleFindUsername } from "./routes/handle-find-username.js";

import handleLogout from "./routes/handle-logout.js";

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
 * route serving the logout for an user
 */
 router.get("/logout", handleLogout);

 /**
 * route to find if a username already exist
 */
  router.get("/username/:username", validationRulesFindUsername, handleFindUsername);

export default router;
