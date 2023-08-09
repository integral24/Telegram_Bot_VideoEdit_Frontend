type Fn = () => any | void;
/**
 * @arguments delay & function
 * @param delay transmitted in the miliceconds type the delay: number
 * @callback function
 * @returns debounce function
 */
const useDebounce = (delay: number, fn: Fn): Fn => {
	let timeOutId: NodeJS.Timeout | null = null;

	return () => {
		clearTimeout(timeOutId ?? undefined);
		timeOutId = setTimeout(() => {
			console.log('run fn debounced');
			fn();
		}, delay);
	};
};

export default useDebounce;
