import { ChangeEvent } from 'react';

export type TCnEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

export type keyCommon = keyof ICommon;

export type keyCommonVill = keyof ICommonVill;

export interface IFieldProps {
	type?: 'date' | 'time' | 'input';
	name: string;
	label?: string;
	value: string;
	className?: string;
	plaseholder?: string;
}

export interface IInputProps extends IFieldProps {
	setValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IAreaProps extends IFieldProps {
	setValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IFelds {
	getCourse: string;
	present: string;
	description: string;
	tags: string;
	loading: string;
}

export type TUrgency = {
	date: string;
	time: string;
};

export interface ICommon {
	loading: string;
	description: string;
	tags: string;
}

export type ICommonVill = Omit<ICommon, 'loading'>;

export interface IFormState {
  isUrgency: boolean;
	title: string;
	time: string;
	date: string;
	video: string;
	extraVideo: string[];
	present: string;
	extraPresent: string[];
	getCourse: string;
	loading: string;
	description: string;
	tags: string;
}

export type IFormStateVill = Omit<IFormState, 'loading'>;

export type IParamsHandler =
	| 'description'
	| 'loading'
	| 'getCourse'
	| 'tags'
	| 'present'
	| 'video'
	| 'extraVideo'
	| 'extraPresent';

export type IParamsHandlerVill =
	| 'description'
	| 'getCourse'
	| 'tags'
	| 'present'
	| 'video'
	| 'extraVideo'
	| 'extraPresent';

export type TForm = 'psiho' | 'vill';

export enum EForm {
	PSIHO = 'psiho',
	VILL = 'vill',
}
