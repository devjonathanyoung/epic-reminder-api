import { APIError, InternalServerError } from "../../../config/index.js";
import reminderFavDataAccess from "../data-access/index.js";

const addReminderFav = async (newFav) => {
	
	// retrieve the list of all reminders for a selected user
	const allFavByUser = await reminderFavDataAccess.selectAllRemindersByUser(newFav.user_id);

	if(!allFavByUser) {
		throw new InternalServerError("An error occured when selecting all reminders by user");
	}
	
	// send true or false if the newFav is already exist in the list
	const favAlreadyAdd = allFavByUser.some(fav => fav.reminder_id === newFav.reminder_id);
	
	if (favAlreadyAdd) {
		throw new APIError(500, "This favourite already exists for this user");
	}

	const favAdded = await reminderFavDataAccess.insertFav(newFav);
	if (!favAdded) {
		throw new InternalServerError("An error occured when processing add fav.");
	}
	return favAdded;
};

export default {
	addReminderFav
};
