export const getInitialTime = (timePlus: number): string => {
	const dateNow = new Date();
	const time = new Date(dateNow.setHours(dateNow.getHours() + timePlus));

	const prepare = (n: number) => {
		return n >= 10 ? n : '0' + n.toString();
	};

	return `${prepare(time.getHours())}:${prepare(time.getMinutes())}`;
};
