import { FC } from 'react';
import { PsiForm } from './forms/departmentForms/PsiForm';
import { PsihoUpFields } from './forms/PsihoUpFields';
import { VillUpFields } from './forms/VillUpFields';
import { VillForm } from './forms/departmentForms/VillForm';
import { EForm } from '../types/propses';
import { saveToLocalstoragePsiho } from '../state/formSlicePsiho';
import { saveToLocalstorageVill } from '../state/formSliceVill';
import useDebounce from '../hooks/useDebounce';
import { useAppDispatch } from '../state/hookRtk';

interface IProps {
	typeForm: EForm;
}

export const FormContainer: FC<IProps> = (props): JSX.Element => {
	const dispatch = useAppDispatch();
	const debounceSaveLsPsiho = useDebounce(100, () =>
		dispatch(saveToLocalstoragePsiho())
	);
	const debounceSaveLsVill = useDebounce(100, () =>
		dispatch(saveToLocalstorageVill())
	);

	const { typeForm } = props;
	return (
		<>
			{typeForm === EForm.PSIHO && (
				<>
					<PsihoUpFields
						debounceSaveLs={debounceSaveLsPsiho}
						typeForm={typeForm}
					/>
					<PsiForm debounceSaveLs={debounceSaveLsPsiho} />
				</>
			)}
			{typeForm === EForm.VILL && (
				<>
					<VillUpFields
						debounceSaveLs={debounceSaveLsVill}
						typeForm={typeForm}
					/>
					<VillForm debounceSaveLs={debounceSaveLsVill} />
				</>
			)}
		</>
	);
};
