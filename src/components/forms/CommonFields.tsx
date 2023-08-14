import { FC, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../state/hookRtk';
import { setValue } from '../../state/formSlice';
import { TCnEvent } from '../../types/propses';
import { TextField } from '../ui/TextField';

interface IProps {
	debounceSaveLs: () => void;
}

export const CommonFields: FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();
	const date = useAppSelector((state) => state.formSlice.date);
	const time = useAppSelector((state) => state.formSlice.time);
	const title = useAppSelector((state) => state.formSlice.title);

	const [isShowDate, setIsShowDate] = useState(!!date || !!time);

	const inputHandler = (event: TCnEvent, name: 'title' | 'date' | 'time') => {
		const value = event.target.value;
		dispatch(
			setValue({
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
					Срочность:
					<input
						type="checkbox"
						onChange={(e) => setIsShowDate(e.target.checked)}
						checked={isShowDate}
					/>
				</div>

				<div
					className={cn({
						'fields-date__wrapper': true,
						hide: !isShowDate,
					})}
				>
					<TextField
						type="date"
						name="date"
						className="field"
						plaseholder={''}
						value={date}
						setValue={(e) => inputHandler(e, 'date')}
					/>
					<TextField
						type="time"
						name="time"
						className="field"
						plaseholder={''}
						value={time}
						setValue={(e) => inputHandler(e, 'time')}
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
