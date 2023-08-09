import { IFormState } from '../types/propses';

export const ls = {
	key: 'TG_WEBAPP_VALUE',

	get() {
		return JSON.parse(localStorage.getItem(this.key)!);
	},
	set(value: IFormState) {
		localStorage.setItem(this.key, JSON.stringify(value));
	},
	clear() {
		localStorage.removeItem(this.key);
	},
};
