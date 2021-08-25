import csrf from "csurf";

const maxAge = 60 * 60 * 24; // 24h

const envIsLocal = process.env.NODE_ENV && process.env.NODE_ENV === "local";
const secure = !envIsLocal;

/**
 * CSRF protection middleware
 * @type {(function(*=, *=, *): (*|undefined))}
 */
const csrfProtection = csrf({ cookie: { httpOnly: true, secure, maxAge, sameSite: "lax"  } });

export default csrfProtection;
