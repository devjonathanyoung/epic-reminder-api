import dbReminder from "../../../infrastructure/database/index.js";

const selectAllUsers = async () => dbReminder("user")
    .select("*")
    .returning("*");

  export default {
	selectAllUsers
};