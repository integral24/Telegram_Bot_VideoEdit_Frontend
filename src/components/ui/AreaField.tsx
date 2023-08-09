import { IAreaProps } from '../../types/propses';

export const AreaField: React.FC<IAreaProps> = (props): JSX.Element => {
	const { className, value, name, plaseholder, setValue, label } = props;

	return (
		<label>
			{label}
			<textarea
				placeholder={plaseholder}
				value={value}
				name={name}
				className={className}
				onChange={setValue}
			/>
		</label>
	);
};
