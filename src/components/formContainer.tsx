import { FC } from 'react';
import { PsiForm } from './forms/departmentForms/PsiForm';
import { CommonFields } from './forms/CommonFields';
import { DesignForm } from './forms/departmentForms/DesignForm';
import { TForm } from '../types/propses';
import { saveLocalstorage } from '../state/formSlice';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch } from '../state/hookRtk';

interface IProps {
	typeForm: TForm;
}

export const FormContainer: FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();
	const debounceSaveLs = useDebounce(500, () => dispatch(saveLocalstorage()));

	const { typeForm } = props;
	return (
		<>
			<CommonFields debounceSaveLs={debounceSaveLs} />

			{typeForm === 'psiho' && <PsiForm debounceSaveLs={debounceSaveLs} />}
			{typeForm === 'vill' && <DesignForm />}
		</>
	);
};
