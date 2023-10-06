import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { EForm, IFormStateVill } from '../types/propses';
import { ls } from '../utils/ls';
import { getInitialDate } from '../utils/getInitialDate';
import { getInitialTime } from '../utils/getInitialTime';

const initialState: IFormStateVill = {
  isUrgency: false,
	title: '',
	time: '',
	date: '',
	video: '',
	extraVideo: [],
	present: '',
	extraPresent: [],
	getCourse: '',
	description: '',
	tags: '',
};

export const formSlice = createSlice({
	name: 'form',

	initialState,
	reducers: {
    setIsUrgencyVill(state, action: PayloadAction<boolean>) {
			state.isUrgency = action.payload;
		},
		setValueVill(
			state,
			action: PayloadAction<{ name: keyof IFormStateVill; value: string }>
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
				case 'description':
					state.description = value;
					break;
				case 'tags':
					state.tags = value;
					break;
			}
		},
		changeExtraVill(
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

		addExtraVideoVill(state) {
			state.extraVideo.push('');
		},
		addExtraPresentVill(state) {
			state.extraPresent.push('');
		},
		saveToLocalstorageVill(state) {
			const extraVideo = state.extraVideo.filter((el) => el !== '');
			const extraPresent = state.extraPresent.filter((el) => el !== '');
			ls(EForm.VILL).set({ ...state, extraPresent, extraVideo });
		},
		getFromLocalstorageVill(state) {
			const stateLs: IFormStateVill = ls(EForm.VILL).get();
			if (stateLs) {
				Object.keys(stateLs).forEach((key) => {
					const name = key as keyof IFormStateVill;
					if (stateLs[name]) {
						state[name] = stateLs[name] as string & string[] & boolean;
					}
				});
			} else {
        state.date = getInitialDate(5);
      }
		},
    setDateVill(state, action: PayloadAction<boolean>) {
			state.date = action.payload ? getInitialDate(7) : '';			
		},
		setTimeVill(state, action: PayloadAction<boolean>) {
			state.time = action.payload ? getInitialTime(7) : '';			
		},
		clearStateVill(state) {
			Object.keys(state).forEach((key) => {
				const name = key as keyof IFormStateVill;
				if (name === 'extraPresent') state.extraPresent = [];
				else if (name === 'extraVideo') state.extraVideo = [];
				else if (name === 'isUrgency') state.isUrgency = false;
				else {
					state[name] = '';
				}
			});
			ls(EForm.VILL).clear();
		},
	},
});

export const {
	addExtraVideoVill,
	addExtraPresentVill,
	changeExtraVill,
	setValueVill,
  setIsUrgencyVill,
	saveToLocalstorageVill,
	getFromLocalstorageVill,
	clearStateVill,
  setDateVill,
  setTimeVill
} = formSlice.actions;

export default formSlice.reducer;

export const selectorCommon = createSelector(
	(state: RootState) => state.formSliceVill,
	(slice) => {
		const { description, tags } = slice;
		return {
			description,
			tags
		};
	}
);


