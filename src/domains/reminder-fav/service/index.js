import { InternalServerError } from "../../../config/index.js";
import reminderFavDataAccess from "../data-access/index.js";

const addReminderFav = async (newFav) => {
	const favAdded = await reminderFavDataAccess.insertFav(newFav);

	if (!favAdded) {
		throw new InternalServerError("An error occured when processing add fav.");
	}
	return favAdded;
};

export default {
	addReminderFav
};
