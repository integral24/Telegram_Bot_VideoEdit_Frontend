import { FC } from 'react';
// import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../state/hookRtk';
import {
	setValueVill,
	setIsUrgencyVill,
	setDateVill,
	setTimeVill,
} from '../../state/formSliceVill';
import { EForm, TCnEvent } from '../../types/propses';
import { TextField } from '../ui/TextField';

interface IProps {
	debounceSaveLs: () => void;
	typeForm: EForm;
}

export const VillUpFields: FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();

	const date = useAppSelector((state) => state.formSliceVill.date);
	const time = useAppSelector((state) => state.formSliceVill.time);
	const title = useAppSelector((state) => state.formSliceVill.title);
	const isUrgency = useAppSelector((state) => state.formSliceVill.isUrgency);

	const setUrgency = () => {
		dispatch(setIsUrgencyVill(!isUrgency));
		dispatch(setDateVill(isUrgency));
		dispatch(setTimeVill(!isUrgency));
		props.debounceSaveLs();
	};

	const inputHandler = (event: TCnEvent, name: 'title' | 'date' | 'time') => {
		const value = event.target.value;
		dispatch(
			setValueVill({
				name,
				value,
			})
		);
		props.debounceSaveLs();
	};

	return (
		<>
			<div className="fields-date">
				<div className="fields-date__checkbox">
					Срочный монтаж !!!
					<input type="checkbox" onChange={setUrgency} checked={isUrgency} />
				</div>
				<TextField
					type="time"
					name="time"
					className="field"
					plaseholder={''}
					value={time}
					setValue={(e) => inputHandler(e, 'time')}
				/>

				<div
				// className={cn({
				// 	'fields-date__wrapper': true,
				// 	hide: !isShowDate,
				// })}
				>
					<div className="fields-date__checkbox">
						Обычный монтаж
						<input type="checkbox" onChange={setUrgency} checked={!isUrgency} />
					</div>
					<TextField
						type="date"
						name="date"
						className="field"
						plaseholder={''}
						value={date}
						setValue={(e) => inputHandler(e, 'date')}
					/>
				</div>
			</div>
			Название урока:
			<TextField
				name="title"
				className="field"
				plaseholder="title"
				value={title}
				setValue={(e) => inputHandler(e, 'title')}
			/>
		</>
	);
};
