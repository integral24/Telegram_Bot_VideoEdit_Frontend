import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IFormState } from '../types/propses';
import { ls } from '../utils/ls';
import { EForm } from '../types/propses';
import { getInitialDate } from '../utils/getInitialDate';
import { getInitialTime } from '../utils/getInitialTime';

const initialState: IFormState = {
	isUrgency: false,
	time: '',
	date: '',
	title: '',
	getCourse: '',
	video: '',
	extraVideo: [],
	present: '',
	extraPresent: [],
	description: '',
	loading: '',
	tags: '',
};

export const formSlice = createSlice({
	name: 'form',

	initialState,
	reducers: {
		setIsUrgencyPsiho(state, action: PayloadAction<boolean>) {
			state.isUrgency = action.payload;
		},
		setValuePsiho(
			state,
			action: PayloadAction<{ name: keyof IFormState; value: string }>
		) {
			const { name, value } = action.payload;
			switch (name) {
				case 'date':
					state.date = value;
					break;
				case 'time':
					state.time = value;
					break;
				case 'title':
					state.title = value;
					break;
				case 'video':
					state.video = value;
					break;
				case 'present':
					state.present = value;
					break;
				case 'getCourse':
					state.getCourse = value;
					break;
				case 'loading':
					state.loading = value;
					break;
				case 'description':
					state.description = value;
					break;
				case 'tags':
					state.tags = value;
					break;
			}
		},
		changeExtraPsiho(
			state,
			action: PayloadAction<{
				type: 'video' | 'present';
				value: string;
				idx: number;
			}>
		) {
			const { type, value, idx } = action.payload;
			if (type === 'video') state.extraVideo[idx] = value;
			if (type === 'present') state.extraPresent[idx] = value;
		},

		addExtraVideoPsiho(state) {
			state.extraVideo.push('');
		},
		addExtraPresentPsiho(state) {
			state.extraPresent.push('');
		},
		saveToLocalstoragePsiho(state) {
			const extraVideo = state.extraVideo.filter((el) => el !== '');
			const extraPresent = state.extraPresent.filter((el) => el !== '');
			ls(EForm.PSIHO).set({ ...state, extraPresent, extraVideo });
		},
		getFromLocalstoragePsiho(state) {
			const stateLs: IFormState = ls(EForm.PSIHO).get();
			if (stateLs) {
				Object.keys(stateLs).forEach((key) => {
					const name = key as keyof IFormState;
					if (stateLs[name]) {
						state[name] = stateLs[name] as string & string[] & boolean;
					}
				});
			} else {
				state.date = getInitialDate(5);
			}
		},
		setDatePsiho(state, action: PayloadAction<boolean>) {
			state.date = action.payload ? getInitialDate(5) : '';			
		},
		setTimePsiho(state, action: PayloadAction<boolean>) {
			state.time = action.payload ? getInitialTime(4) : '';			
		},
		clearStatePsiho(state) {
			Object.keys(state).forEach((key) => {
				const name = key as keyof IFormState;
				if (name === 'extraPresent') state.extraPresent = [];
				else if (name === 'extraVideo') state.extraVideo = [];
				else if (name === 'isUrgency') state.isUrgency = false;
				else {
					state[name] = '';
				}
			});
			ls(EForm.PSIHO).clear();
		},
	},
});

export const {
	addExtraVideoPsiho,
	addExtraPresentPsiho,
	changeExtraPsiho,
	setValuePsiho,
	setIsUrgencyPsiho,
	saveToLocalstoragePsiho,
	getFromLocalstoragePsiho,
	clearStatePsiho,
	setDatePsiho,
  setTimePsiho
} = formSlice.actions;

export default formSlice.reducer;

export const selectorCommon = createSelector(
	(state: RootState) => state.formSlicePsiho,
	(slice) => {
		const { description, loading, tags } = slice;
		return {
			description,
			loading,
			tags,
		};
	}
);
