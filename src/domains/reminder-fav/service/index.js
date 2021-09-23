import { InternalServerError } from "../../../config/index.js";
import reminderFavDataAccess from "../data-access/index.js";

const getAllRemindersFavByUser = async (userId) => {
	const allFavByUser = await reminderFavDataAccess.selectAllRemindersByUser(userId);
	
	if(!allFavByUser) {
		throw new InternalServerError("An error occured when selecting all reminders by user");
	}
	return allFavByUser;
};

const deleteReminderFav = async (reminderFavId) => {
	const removedReminderFav = await reminderFavDataAccess.deleteReminderFav(reminderFavId);
	if(!removedReminderFav) {
		throw new InternalServerError("An error occured when deleting the fav");
	}
	return removedReminderFav;
};

const addReminderFav = async (newFav) => {
	
	// retrieve the list of all reminders for a selected user
	const allFavByUser = await reminderFavDataAccess.selectAllRemindersByUser(newFav.user_id);

	if(!allFavByUser) {
		throw new InternalServerError("An error occured when selecting all reminders by user");
	}
	
	// send true or false if the newFav is already exist in the list
	const favAlreadyAdd = allFavByUser.find(fav => fav.reminder_id === newFav.reminder_id);

	if (favAlreadyAdd) {
		//delete the fav if already exists
		return deleteReminderFav(favAlreadyAdd.id);
	}

	const favAdded = await reminderFavDataAccess.insertFav(newFav);
	if (!favAdded) {
		throw new InternalServerError("An error occured when processing add fav.");
	}
	return favAdded;
};


export default {
	getAllRemindersFavByUser,
	addReminderFav,
	deleteReminderFav
};
