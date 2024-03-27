const addMonths = (date, months) => {
	date.setMonth(date.getMonth() + months);
	return date;
};

const addDays = (date, days) => {
	date.setDate(date.getDate() + days);
	return date;
};

export { addMonths, addDays };
