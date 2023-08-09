import { IInputProps } from '../../types/propses';

export const TextField: React.FC<IInputProps> = (props): JSX.Element => {
	const { className, value, name, plaseholder, setValue, label, type } = props;

	return (
		<label>
			{label}
			<input
				type={type ?? undefined}
				placeholder={plaseholder}
				value={value}
				name={name}
				className={className}
				onChange={setValue}
			/>
		</label>
	);
};
