import { EForm, IFormState, IFormStateVill } from '../types/propses';

export const ls = (departament: EForm) => {
	const key = 'TG_WEBAPP_' + departament.toUpperCase();

	return {
		get() {
			return JSON.parse(localStorage.getItem(key)!);
		},
		set(value: IFormState | IFormStateVill) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		clear() {
			localStorage.removeItem(key);
		},
	};
};
