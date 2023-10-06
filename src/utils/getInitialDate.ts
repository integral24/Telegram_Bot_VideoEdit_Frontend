export const getInitialDate = (daysPlus: number): string => {
	const dateNow = new Date();
	const date = new Date(dateNow.setDate(dateNow.getDate() + daysPlus));

	const prepare = (n: number) => {
		return n >= 10 ? n : '0' + n.toString();
	};

	return `${date.getFullYear()}-${prepare(date.getMonth() + 1)}-${prepare(
		date.getDate()
	)}`;
};


